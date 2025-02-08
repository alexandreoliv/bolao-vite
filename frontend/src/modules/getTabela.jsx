import axios from 'axios';

export const getTabela = async (ano, serie) => {
	// API method:
	// if (ano === 2023 && serie === "A") {
	// 		// offline way:
	// 		let tabela = require("../data/tabela2023A.json");

	// 	// // online way:
	// 	// let tabela = await axios
	// 	// 	.get("https://api.api-futebol.com.br/v1/campeonatos/10/tabela/", {
	// 	// 		headers: {
	// 	// 			Authorization: `Bearer ${API_KEY}`,
	// 	// 		},
	// 	// 	})
	// 	// 	.then((response) => response.data)
	// 	// 	.catch((error) => console.log(error));

	// 	// for both ways:
	// 	tabela.sort((a, b) =>
	// 		a.time.nome_popular.localeCompare(b.time.nome_popular)
	// 	);
	// 	const equipes = tabela.map((t) => t.time.nome_popular);
	// 	const posicoes = tabela.map((t) => t.posicao);
	// 	tabela = { ano, serie, equipes, posicoes };
	// 	return tabela;
	// }

	return await axios
		.get(
			`${import.meta.env.VITE_API_URL}/getTabelas?ano=${ano}&serie=${serie}`
		)
		.then((response) => response.data.tabelas[0])
		.catch((error) => console.log(error));
};
