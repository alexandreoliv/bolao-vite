import requests
from bs4 import BeautifulSoup
import pandas as pd
import re
from io import StringIO

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
    table_html = str(table)  # Convert the table to a string
    df = pd.read_html(StringIO(table_html))[0]  # Wrap it in StringIO

    return df

# List of URLs to scrape
urls = [
    "https://pt.wikipedia.org/wiki/Campeonato_Brasileiro_de_Futebol_de_2024_-_S%C3%A9rie_A",
    "https://pt.wikipedia.org/wiki/Campeonato_Brasileiro_de_Futebol_de_2024_-_S%C3%A9rie_B"
]

# General list to store all classification data
general_classificacao = []

# Loop through each URL and scrape the classification table
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
        # Store the classificacao in the general array
        classificacao = [
            {"equipe": row["Equipevde"], "pos": row["Pos"]} for index, row in df.iterrows()
        ]
        
        # Add this classification to the general list
        general_classificacao.append({
            "ano": ano,
            "serie": serie,
            "classificacao": classificacao
        })
        
        # Save the DataFrame to a CSV file
        file_name = url.split("/")[-1].replace("_", "-") + "_classificacao.csv"
        df.to_csv(file_name, index=False)
    else:
        print(f"Could not find the classification table for {url}.")

# Print the general classificacao array
# print("General Classificação:", general_classificacao)

# Loop through the general_classificacao list and print each object individually
for item in general_classificacao:
    print("Ano:", item["ano"])
    print("Série:", item["serie"])
    print("Classificação:", item["classificacao"])
    print()  # Adding a blank line between each classification