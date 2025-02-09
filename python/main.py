import os
import requests
from bs4 import BeautifulSoup
import pandas as pd
import re
import json
from io import StringIO
from pymongo import MongoClient
from dotenv import load_dotenv

# MongoDB Connection
load_dotenv()  # Load environment variables from .env file
MONGO_URI = os.getenv("MONGODB_URI")
client = MongoClient(MONGO_URI)
db = client["bolao"]
collection = db["tabelas"]

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
os.makedirs('data', exist_ok=True)

def scrape_classificacao_table(url):
    response = requests.get(url)
    response.raise_for_status()
    
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

# List of URLs to scrape
urls = [
    "https://pt.wikipedia.org/wiki/Campeonato_Brasileiro_de_Futebol_de_2025_-_S%C3%A9rie_A",
    "https://pt.wikipedia.org/wiki/Campeonato_Brasileiro_de_Futebol_de_2025_-_S%C3%A9rie_B"
]

for url in urls:
    print(f"Scraping {url}...")
    
    # Extract the year (ano) and series (serie) from the URL
    match = re.search(r"de_(\d{4})_-_S%C3%A9rie_(\w)", url)
    if not match:
        print(f"Could not extract ano and serie from {url}.")
        continue
    
    ano = int(match.group(1))
    serie = match.group(2)

    df = scrape_classificacao_table(url)
    
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
        file_name = f"data/tabela{ano}{serie.upper()}.json"
        with open(file_name, "w", encoding='utf-8') as json_file:
            json.dump(tabela_data, json_file, ensure_ascii=False, indent=4)

        # Insert into MongoDB (update if exists)
        collection.update_one(
            {"ano": ano, "serie": serie},
            {"$set": tabela_data},
            upsert=True
        )

        print(f"Saved data for {ano} {serie} in JSON and MongoDB.")

    else:
        print(f"Could not find the classification table for {url}.")