import axios from "axios";
import * as cheerio from "cheerio";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI;
const client = new MongoClient(MONGO_URI);

const teamRename = {
	"Atlético Mineiro": "Atlético-MG",
	"Red Bull Bragantino": "Bragantino",
	"Vasco da Gama": "Vasco",
	"América Mineiro": "América-MG",
	Athletic: "Athletic-MG",
	"Athletico Paranaense": "Athletico-PR",
	"Atlético Goianiense": "Atlético-GO",
};

const cleanTeamName = (name) => {
	return name.replace(" (C)", "");
};

const scrapeClassificacaoTable = async (url) => {
	try {
		const response = await axios.get(url);
		const $ = cheerio.load(response.data);

		const tables = $("table.wikitable");
		const table = tables.eq(3); // Selects the 4th table (index 3)
		const rows = table.find("tr").slice(1);
		const data = [];

		rows.each((index, row) => {
			const headers = $(row).find("th");
			const cols = $(row).find("td");
			const pos = $(headers[0]).text().trim();
			const equipe = $(cols[0]).text().trim();
			data.push({ equipe, pos });
		});

		return data;
	} catch (error) {
		console.error(`Error fetching URL ${url}: ${error}`);
		return null;
	}
};

const main = async (ano, serie) => {
	const url = `https://pt.wikipedia.org/wiki/Campeonato_Brasileiro_de_Futebol_de_${ano}_-_S%C3%A9rie_${serie.toUpperCase()}`;

	try {
		await client.connect();
		const db = client.db("bolao");
		const collection = db.collection("tabelas");

		let existingRecord;
		try {
			existingRecord = await collection.findOne({ ano, serie });
		} catch (error) {
			console.error(`Error querying MongoDB: ${error}`);
			return;
		}

		if (existingRecord) {
			const objectIdTimestamp = existingRecord._id.getTimestamp();
			const currentTime = new Date();
			const timeDiff = currentTime - objectIdTimestamp;

			if (timeDiff < 5 * 60 * 1000) {
				console.log(
					`Data for ${ano} ${serie} is already recent (less than 5 minutes old). Skipping update.`
				);
				return;
			} else {
				try {
					console.log(
						`Data for ${ano} ${serie} is older than 5 minutes. Deleting the record...`
					);
					await collection.deleteOne({ ano, serie });
				} catch (error) {
					console.error(
						`Error deleting record from MongoDB: ${error}`
					);
					return;
				}
			}
		}

		const classificacao = await scrapeClassificacaoTable(url);
		if (!classificacao) {
			console.log(`Could not find the classification table for ${url}.`);
			return;
		}

		classificacao.forEach((item) => {
			if (teamRename[item.equipe]) {
				item.equipe = teamRename[item.equipe];
			}
			item.equipe = cleanTeamName(item.equipe);
		});

		const equipesSorted = classificacao.map((item) => item.equipe).sort();
		const posicoesSorted = classificacao
			.sort((a, b) => a.equipe.localeCompare(b.equipe))
			.map((item) => item.pos);

		const tabelaData = {
			ano,
			serie,
			equipes: equipesSorted,
			posicoes: posicoesSorted,
		};

		try {
			await collection.insertOne(tabelaData);
			console.log(`Saved data for ${ano} ${serie} in MongoDB.`);
		} catch (error) {
			console.error(`Error inserting record into MongoDB: ${error}`);
		}
	} catch (error) {
		console.error(`Error during scraping: ${error}`);
	} finally {
		await client.close();
	}
};

const [ano, serie] = process.argv.slice(2);
if (!ano || !serie) {
	console.log("Please provide ano and serie as arguments.");
	process.exit(1);
}

main(parseInt(ano), serie);
