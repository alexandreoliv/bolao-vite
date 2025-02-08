const scrapeB = async () => {
	const browser = await launchBrowser();
	const page = await openPage(browser);
	const tabela = await scrapeTabela(page);
	const formattedTabela = formatTabela(tabela);
	exportTabelaAsJSON(formattedTabela);
	await browser.close();
};

const launchBrowser = () => {
	const puppeteer = require("puppeteer");
	const browser = puppeteer.launch({
		defaultViewport: {
			width: 1920,
			height: 1080,
		},
		headless: true,
	});
	return browser;
};

const openPage = async (browser) => {
	const page = await browser.newPage();
	await page.goto(
		"https://pt.wikipedia.org/wiki/Campeonato_Brasileiro_de_Futebol_de_2023_-_S%C3%A9rie_B#Classifica%C3%A7%C3%A3o",
		{
			waitUntil: "networkidle2",
		}
	);
	return page;
};

const scrapeTabela = async (page) => {
	let tabela = [];
	for (let pos = 2; pos <= 21; pos++) {
		tabela.push({
			time: {
				nome_popular: await page.$eval(
					`.wikitable:nth-child(26) tr:nth-child(${pos})> td:nth-child(2)`,
					(el) => el.innerText.trim()
				),
			},
			posicao: await page.$eval(
				`.wikitable:nth-child(26) tr:nth-child(${pos}) > th`,
				(el) => Number(el.innerText)
			),
		});
	}
	return tabela;
};

const formatTabela = (tabela) => {
	let newTabela = JSON.parse(JSON.stringify(tabela));
	newTabela.sort((a, b) =>
		a.time.nome_popular.localeCompare(b.time.nome_popular)
	);
	const equipes = newTabela.map((t) => t.time.nome_popular);
	const posicoes = newTabela.map((t) => t.posicao);
	newTabela = { ano: 2023, serie: "B", equipes, posicoes };
	return newTabela;
};

const exportTabelaAsJSON = (tabela) => {
	const fs = require("fs");
	fs.writeFile(
		"../data/tabela2023B.json",
		JSON.stringify(tabela),
		function (err) {
			if (err) throw err;
			console.log("tabela2023B.json complete");
		}
	);
};

scrapeB();
