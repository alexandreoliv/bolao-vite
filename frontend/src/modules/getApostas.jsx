import axios from 'axios';

export const getApostas = async (serie, ano, tabela) => {
	const apostas = await getFile(serie, ano);
	const apostasColumns = getColumns(apostas);
	const keys = getKeys(apostasColumns);
	const apostasData = getData(apostas, apostasColumns, keys, tabela);
	return { apostasColumns, apostasData, keys };
};

const getFile = (ano, serie) => {
	return axios
		.get(
			`${process.env.REACT_APP_API_URL}/getApostas?ano=${ano}&serie=${serie}`
		)
		.then((response) => response.data.apostas)
		.catch((error) => console.log(error));
};

const getColumns = (apostas) => {
	let sortedApostas = apostas.sort((a, b) => (a.nome < b.nome ? -1 : 1)); // sort names alphabetically
	const columns = sortedApostas.map((a) => ({
		title: a.nome,
		ellipsis: true,
		key: a.nome,
		dataIndex: a.nome,
		align: "center",
	}));
	columns.unshift({
		title: "Atual",
		ellipsis: true,
		key: "Atual",
		dataIndex: "Atual",
		align: "center",
	});
	columns.unshift({
		title: "Equipe",
		ellipsis: true,
		key: "Equipe",
		dataIndex: "Equipe",
		align: "center",
		width: "10%",
	});
	return columns;
};

const getKeys = (apostasColumns) => {
	return apostasColumns.map((c) => c.title);
};

const getData = (apostas, apostasColumns, keys, tabela) => {
	const { equipes, posicoes } = tabela;

	const palpites = apostas.map((a) => a.aposta);
	palpites.unshift(posicoes);
	palpites.unshift(equipes);

	const obj = keys.reduce((accumulator, value) => {
		return { ...accumulator, [value]: "" };
	}, {});

	const apostasData = [];
	for (let j = 0; j < equipes.length; j++) {
		apostasData[j] = JSON.parse(JSON.stringify(obj));
		for (let i = 0; i < apostasColumns.length; i++) {
			apostasData[j][keys[i]] = palpites[i][j];
			apostasData[j].key = j;
		}
	}

	// sorts the teams according to their standings
	apostasData.sort((a, b) => (a.Atual < b.Atual ? -1 : 1));

	return apostasData;
};
