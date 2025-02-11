import os
import sys
import requests
from bs4 import BeautifulSoup
import pandas as pd
import re
import json
from io import StringIO
from pymongo import MongoClient, errors
from dotenv import load_dotenv
from datetime import datetime, timezone, timedelta

# MongoDB Connection
load_dotenv()  # Load environment variables from .env file
MONGO_URI = os.getenv("MONGODB_URI")

try:
    client = MongoClient(MONGO_URI)
    db = client["bolao"]
    collection = db["tabelas"]
except errors.ConnectionError as e:
    print(f"Error connecting to MongoDB: {e}")
    sys.exit(1)

# Unify team names based on their previous names for consistency across years
team_rename = {
    "Atlético Mineiro": "Atlético-MG",
    "Red Bull Bragantino": "Bragantino",
    "Vasco da Gama": "Vasco",
    "América Mineiro": "América-MG",
    "Athletic": "Athletic-MG",
    "Athletico Paranaense": "Athletico-PR",
    "Atlético Goianiense": "Atlético-GO"
}

def clean_team_name(name):
    # Remove "(C)" from the team name if it exists
    return name.replace(" (C)", "")

# Create the /data directory if it doesn't exist
os.makedirs('python/data', exist_ok=True)

def scrape_classificacao_table(url):
    try:
        response = requests.get(url)
        response.raise_for_status()
    except requests.RequestException as e:
        print(f"Error fetching URL {url}: {e}")
        return None
    
    soup = BeautifulSoup(response.text, "html.parser")
    
    # Find the <h2> heading with the ID "Classificação"
    classificacao_heading = soup.find("h2", id="Classificação")
    
    if not classificacao_heading:
        print(f"Heading not found for {url}!")
        return None

    # Find the next table after this heading
    table = classificacao_heading.find_next("table", class_="wikitable")

    if not table:
        print(f"Table not found for {url}!")
        return None

    # Convert the table to a Pandas DataFrame
    table_html = str(table)
    df = pd.read_html(StringIO(table_html))[0]

    return df

# Get ano and serie from command-line arguments
if len(sys.argv) < 3:
    print("Please provide ano and serie as arguments.")
    sys.exit(1)

ano = int(sys.argv[1])
serie = sys.argv[2]

# Generate URL based on ano and serie
url = f"https://pt.wikipedia.org/wiki/Campeonato_Brasileiro_de_Futebol_de_{ano}_-_S%C3%A9rie_{serie.upper()}"

# Check if the data already exists and if the document is less than 5 minutes old
try:
    existing_record = collection.find_one({"ano": ano, "serie": serie})
except errors.PyMongoError as e:
    print(f"Error querying MongoDB: {e}")
    sys.exit(1)

if existing_record:
    object_id_timestamp = existing_record["_id"].generation_time  # Get the timestamp from _id
    print(f"Existing record timestamp: {object_id_timestamp}")
    current_time = datetime.now(timezone.utc)
    print(f"Current time: {current_time}")
    time_diff = current_time - object_id_timestamp
    print(f"Time difference: {time_diff}")
    
    if time_diff < timedelta(minutes=5):
        print(f"Data for {ano} {serie} is already recent (less than 5 minutes old). Skipping update.")
        sys.exit(0)  # Exit if the data is recent, skip scraping
    else:
        try:
            print(f"Data for {ano} {serie} is older than 5 minutes. Deleting the record...")
            collection.delete_one({"ano": ano, "serie": serie})
        except errors.PyMongoError as e:
            print(f"Error deleting record from MongoDB: {e}")
            sys.exit(1)

df = scrape_classificacao_table(url)
print(f"Scraping {url}...")

if df is not None:
    classificacao = [
        {"equipe": row["Equipevde"], "pos": row["Pos"]} for index, row in df.iterrows()
    ]
    
    # Apply renaming and clean team names
    for item in classificacao:
        equipe = item["equipe"]
        if equipe in team_rename:
            item["equipe"] = team_rename[equipe]
        item["equipe"] = clean_team_name(item["equipe"])
    
    # Sort the teams alphabetically and get positions
    equipes_sorted = sorted([item["equipe"] for item in classificacao])
    posicoes_sorted = [item["pos"] for item in sorted(classificacao, key=lambda x: x["equipe"])]

    tabela_data = {
        "ano": ano,
        "serie": serie,
        "equipes": equipes_sorted,
        "posicoes": posicoes_sorted
    }

    # Save the classification data to a JSON file
    file_name = f"python/data/tabela{ano}{serie.upper()}.json"
    try:
        with open(file_name, "w", encoding='utf-8') as json_file:
            json.dump(tabela_data, json_file, ensure_ascii=False, indent=4)
    except IOError as e:
        print(f"Error writing to file {file_name}: {e}")
        sys.exit(1)

    # Insert the new record into MongoDB
    try:
        collection.insert_one(tabela_data)
    except errors.PyMongoError as e:
        print(f"Error inserting record into MongoDB: {e}")
        sys.exit(1)

    print(f"Saved data for {ano} {serie} in JSON and MongoDB.")
else:
    print(f"Could not find the classification table for {url}.")
