const currentYear = 2023;

export const getRanking = (dados) => {
	const apostadores = getApostadores(dados);
	console.log({ apostadores });

	const historico = getHistorico(dados);
	console.log({ historico });

	const ranking = getFinalRanking(apostadores, historico);

	const rankingData = getRankingData(ranking);
	const rankingColumns = getRankingColumns(ranking);

	console.log({ rankingData, rankingColumns });
	return { rankingData, rankingColumns };
};

const getApostadores = (dados) => {
	let allNames = [];
	for (let i = 0; i < dados.length; i++) {
		if (dados[i].ano !== currentYear) {
			const newNames = dados[i].classificacaoData.map((b) => b.nome);
			allNames = [...allNames, ...newNames];
		}
	}

	return Array.from([...new Set(allNames)]).sort();
};

const getHistorico = (dados) => {
	let historico = [];
	let newDados = dados
		.filter((d) => d.ano !== currentYear)
		.map((d) => d.classificacaoData);
	for (let i = 0; i < newDados.length; i++) {
		historico = [
			...historico,
			...newDados[i].map((b) => ({
				nome: b.nome,
				serie: dados[i].serie,
				pontuacao: b.pontuacao,
				posicao: b.posicao,
				posicaoProporcional: (b.posicao / newDados.length) * 10,
			})),
		];
	}
	return historico;
};

const getFinalRanking = (apoiadores, historico) => {
	const apoiadoresData = apoiadores.map((a) => ({
		nome: a,
		titulosA: null,
		titulosB: null,
		titulosTotal: null,
		campeonatosA: null,
		campeonatosB: null,
		campeonatosTotal: null,
		pontuacaoA: null,
		pontuacaoB: null,
		pontuacaoTotal: null,
		mediaPontuacaoA: null,
		mediaPontuacaoB: null,
		mediaPontuacaoTotal: null,
		posicaoA: null,
		posicaoB: null,
		posicaoTotal: null,
		mediaPosicaoA: null,
		mediaPosicaoB: null,
		mediaPosicaoTotal: null,
		posicaoProporcionalA: null,
		posicaoProporcionalB: null,
		posicaoProporcionalTotal: null,
		mediaPosicaoProporcionalA: null,
		mediaPosicaoProporcionalB: null,
		mediaPosicaoProporcionalTotal: null,
	}));
	console.log({ apoiadoresData });

	let historicoApostador = [];
	for (let i = 0; i < apoiadores.length; i++) {
		historicoApostador.push(
			historico.filter((h) => h.nome === apoiadores[i])
		);
	}
	console.log({ historicoApostador });

	for (let i = 0; i < apoiadoresData.length; i++) {
		apoiadoresData[i].titulosA = historicoApostador[i].filter(
			(h) => h.posicao === 1 && h.serie === "A"
		).length;

		apoiadoresData[i].titulosB = historicoApostador[i].filter(
			(h) => h.posicao === 1 && h.serie === "B"
		).length;

		apoiadoresData[i].titulosTotal =
			apoiadoresData[i].titulosA + apoiadoresData[i].titulosB;

		apoiadoresData[i].campeonatosA = historicoApostador[i].filter(
			(h) => h.serie === "A"
		).length;

		apoiadoresData[i].campeonatosB = historicoApostador[i].filter(
			(h) => h.serie === "B"
		).length;

		apoiadoresData[i].campeonatosTotal =
			apoiadoresData[i].campeonatosA + apoiadoresData[i].campeonatosB;

		apoiadoresData[i].pontuacaoA = historicoApostador[i]
			.filter((h) => h.serie === "A")
			.map((h) => h.pontuacao)
			.reduce((accumulator, item) => accumulator + item, 0);

		apoiadoresData[i].pontuacaoB = historicoApostador[i]
			.filter((h) => h.serie === "B")
			.map((h) => h.pontuacao)
			.reduce((accumulator, item) => accumulator + item, 0);

		apoiadoresData[i].pontuacaoTotal =
			apoiadoresData[i].pontuacaoA + apoiadoresData[i].pontuacaoB;

		if (apoiadoresData[i].campeonatosA) {
			apoiadoresData[i].mediaPontuacaoA = (
				apoiadoresData[i].pontuacaoA / apoiadoresData[i].campeonatosA
			).toFixed(0);
		} else apoiadoresData[i].mediaPontuacaoA = "";

		if (apoiadoresData[i].campeonatosB) {
			apoiadoresData[i].mediaPontuacaoB = (
				apoiadoresData[i].pontuacaoB / apoiadoresData[i].campeonatosB
			).toFixed(0);
		} else apoiadoresData[i].mediaPontuacaoB = "";

		apoiadoresData[i].mediaPontuacaoTotal = (
			apoiadoresData[i].pontuacaoTotal /
			apoiadoresData[i].campeonatosTotal
		).toFixed(0);

		apoiadoresData[i].posicaoA = historicoApostador[i]
			.filter((h) => h.serie === "A")
			.map((h) => h.posicao)
			.reduce((accumulator, item) => accumulator + item, 0);

		apoiadoresData[i].posicaoB = historicoApostador[i]
			.filter((h) => h.serie === "B")
			.map((h) => h.posicao)
			.reduce((accumulator, item) => accumulator + item, 0);

		apoiadoresData[i].posicaoTotal =
			apoiadoresData[i].posicaoA + apoiadoresData[i].posicaoB;

		if (apoiadoresData[i].campeonatosA) {
			apoiadoresData[i].mediaPosicaoA = (
				apoiadoresData[i].posicaoA / apoiadoresData[i].campeonatosA
			).toFixed(0);
		} else apoiadoresData[i].mediaPosicaoA = "";

		if (apoiadoresData[i].campeonatosB) {
			apoiadoresData[i].mediaPosicaoB = (
				apoiadoresData[i].posicaoB / apoiadoresData[i].campeonatosB
			).toFixed(0);
		} else apoiadoresData[i].mediaPosicaoB = "";

		apoiadoresData[i].mediaPosicaoTotal = (
			apoiadoresData[i].posicaoTotal / apoiadoresData[i].campeonatosTotal
		).toFixed(0);

		apoiadoresData[i].posicaoProporcionalA = historicoApostador[i]
			.filter((h) => h.serie === "A")
			.map((h) => h.posicaoProporcional)
			.reduce((accumulator, item) => accumulator + item, 0);

		apoiadoresData[i].posicaoProporcionalB = historicoApostador[i]
			.filter((h) => h.serie === "B")
			.map((h) => h.posicaoProporcional)
			.reduce((accumulator, item) => accumulator + item, 0);

		apoiadoresData[i].posicaoProporcionalTotal =
			apoiadoresData[i].posicaoProporcionalA +
			apoiadoresData[i].posicaoProporcionalB;

		if (apoiadoresData[i].campeonatosA) {
			apoiadoresData[i].mediaPosicaoProporcionalA = (
				apoiadoresData[i].posicaoProporcionalA /
				apoiadoresData[i].campeonatosA
			).toFixed(0);
		} else apoiadoresData[i].mediaPosicaoProporcionalA = "";

		if (apoiadoresData[i].campeonatosB) {
			apoiadoresData[i].mediaPosicaoProporcionalB = (
				apoiadoresData[i].posicaoProporcionalB /
				apoiadoresData[i].campeonatosB
			).toFixed(0);
		} else apoiadoresData[i].mediaPosicaoProporcionalB = "";

		apoiadoresData[i].mediaPosicaoProporcionalTotal = (
			apoiadoresData[i].posicaoProporcionalTotal /
			apoiadoresData[i].campeonatosTotal
		).toFixed(0);
	}
	console.log({ apoiadoresData });
	return apoiadoresData;
};

const getRankingData = (ranking) => {
	return ranking;
};

const getRankingColumns = () => {
	return [
		{
			title: "Nome",
			ellipsis: true,
			key: "nome",
			dataIndex: "nome",
			align: "center",
			width: "10%",
			defaultSortOrder: "ascend",
			sorter: (a, b) => (a.nome < b.nome ? -1 : 1),
		},
		{
			title: "TA",
			ellipsis: true,
			key: "titulosA",
			dataIndex: "titulosA",
			align: "center",
			defaultSortOrder: "descend",
			sorter: (a, b) => a.titulosA - b.titulosA,
		},
		{
			title: "TB",
			ellipsis: true,
			key: "titulosB",
			dataIndex: "titulosB",
			align: "center",
			defaultSortOrder: "descend",
			sorter: (a, b) => a.titulosB - b.titulosB,
		},
		{
			title: "TT",
			ellipsis: true,
			key: "titulosTotal",
			dataIndex: "titulosTotal",
			align: "center",
			defaultSortOrder: "descend",
			sorter: (a, b) => a.titulosTotal - b.titulosTotal,
		},
		{
			title: "CA",
			ellipsis: true,
			key: "campeonatosA",
			dataIndex: "campeonatosA",
			align: "center",
			defaultSortOrder: "descend",
			sorter: (a, b) => a.campeonatosA - b.campeonatosA,
		},
		{
			title: "CB",
			ellipsis: true,
			key: "campeonatosB",
			dataIndex: "campeonatosB",
			align: "center",
			defaultSortOrder: "descend",
			sorter: (a, b) => a.campeonatosB - b.campeonatosB,
		},
		{
			title: "CT",
			ellipsis: true,
			key: "campeonatosTotal",
			dataIndex: "campeonatosTotal",
			align: "center",
			defaultSortOrder: "descend",
			sorter: (a, b) => a.campeonatosTotal - b.campeonatosTotal,
		},
		// {
		// 	title: "Pontuação A",
		// 	ellipsis: true,
		// 	key: "pontuacaoA",
		// 	dataIndex: "pontuacaoA",
		// 	align: "center",
		// 	defaultSortOrder: "descend",
		// 	sorter: (a, b) => a.pontuacaoA - b.pontuacaoA,
		// },
		// {
		// 	title: "Pontuação B",
		// 	ellipsis: true,
		// 	key: "pontuacaoB",
		// 	dataIndex: "pontuacaoB",
		// 	align: "center",
		// 	defaultSortOrder: "descend",
		// 	sorter: (a, b) => a.pontuacaoB - b.pontuacaoB,
		// },
		// {
		// 	title: "Pontuação Total",
		// 	ellipsis: true,
		// 	key: "pontuacaoTotal",
		// 	dataIndex: "pontuacaoTotal",
		// 	align: "center",
		// 	defaultSortOrder: "descend",
		// 	sorter: (a, b) => a.pontuacaoTotal - b.pontuacaoTotal,
		// },
		{
			title: "MPonA",
			ellipsis: true,
			key: "mediaPontuacaoA",
			dataIndex: "mediaPontuacaoA",
			align: "center",
			defaultSortOrder: "descend",
			sorter: (a, b) => a.mediaPontuacaoA - b.mediaPontuacaoA,
		},
		{
			title: "MPonB",
			ellipsis: true,
			key: "mediaPontuacaoB",
			dataIndex: "mediaPontuacaoB",
			align: "center",
			defaultSortOrder: "descend",
			sorter: (a, b) => a.mediaPontuacaoB - b.mediaPontuacaoB,
		},
		{
			title: "MPonT",
			ellipsis: true,
			key: "mediaPontuacaoTotal",
			dataIndex: "mediaPontuacaoTotal",
			align: "center",
			defaultSortOrder: "descend",
			sorter: (a, b) => a.mediaPontuacaoTotal - b.mediaPontuacaoTotal,
		},
		// {
		// 	title: "Posição A",
		// 	ellipsis: true,
		// 	key: "posicaoA",
		// 	dataIndex: "posicaoA",
		// 	align: "center",
		// 	defaultSortOrder: "descend",
		// 	sorter: (a, b) => a.posicaoA - b.posicaoA,
		// },
		// {
		// 	title: "Posição B",
		// 	ellipsis: true,
		// 	key: "posicaoB",
		// 	dataIndex: "posicaoB",
		// 	align: "center",
		// 	defaultSortOrder: "descend",
		// 	sorter: (a, b) => a.posicaoB - b.posicaoB,
		// },
		// {
		// 	title: "Posição Total",
		// 	ellipsis: true,
		// 	key: "posicaoTotal",
		// 	dataIndex: "posicaoTotal",
		// 	align: "center",
		// 	defaultSortOrder: "descend",
		// 	sorter: (a, b) => a.posicaoTotal - b.posicaoTotal,
		// },
		{
			title: "MPosA",
			ellipsis: true,
			key: "mediaPosicaoA",
			dataIndex: "mediaPosicaoA",
			align: "center",
			defaultSortOrder: "descend",
			sorter: (a, b) => a.mediaPosicaoA - b.mediaPosicaoA,
		},
		{
			title: "MPosB",
			ellipsis: true,
			key: "mediaPosicaoB",
			dataIndex: "mediaPosicaoB",
			align: "center",
			defaultSortOrder: "descend",
			sorter: (a, b) => a.mediaPosicaoB - b.mediaPosicaoB,
		},
		{
			title: "MPosT",
			ellipsis: true,
			key: "mediaPosicaoTotal",
			dataIndex: "mediaPosicaoTotal",
			align: "center",
			defaultSortOrder: "descend",
			sorter: (a, b) => a.mediaPosicaoTotal - b.mediaPosicaoTotal,
		},
		// {
		// 	title: "Posição Proporcional A",
		// 	ellipsis: true,
		// 	key: "posicaoProporcionalA",
		// 	dataIndex: "posicaoProporcionalA",
		// 	align: "center",
		// 	defaultSortOrder: "descend",
		// 	sorter: (a, b) => a.posicaoProporcionalA - b.posicaoProporcionalA,
		// },
		// {
		// 	title: "Posição Proporcional B",
		// 	ellipsis: true,
		// 	key: "posicaoProporcionalB",
		// 	dataIndex: "posicaoProporcionalB",
		// 	align: "center",
		// 	defaultSortOrder: "descend",
		// 	sorter: (a, b) => a.posicaoProporcionalB - b.posicaoProporcionalB,
		// },
		// {
		// 	title: "Posição Proporcional Total",
		// 	ellipsis: true,
		// 	key: "posicaoProporcionalTotal",
		// 	dataIndex: "posicaoProporcionalTotal",
		// 	align: "center",
		// 	defaultSortOrder: "descend",
		// 	sorter: (a, b) =>
		// 		a.posicaoProporcionalTotal - b.posicaoProporcionalTotal,
		// },
		{
			title: "MPosPropA",
			tooltip: "Média Posição Proporcional A",
			ellipsis: true,
			key: "mediaPosicaoProporcionalA",
			dataIndex: "mediaPosicaoProporcionalA",
			align: "center",
			defaultSortOrder: "descend",
			sorter: (a, b) =>
				a.mediaPosicaoProporcionalA - b.mediaPosicaoProporcionalA,
		},
		{
			title: "MPosPropB",
			ellipsis: true,
			key: "mediaPosicaoProporcionalB",
			dataIndex: "mediaPosicaoProporcionalB",
			align: "center",
			defaultSortOrder: "descend",
			sorter: (a, b) =>
				a.mediaPosicaoProporcionalB - b.mediaPosicaoProporcionalB,
		},
		{
			title: "MPosPropT",
			ellipsis: true,
			key: "mediaPosicaoProporcionalTotal",
			dataIndex: "mediaPosicaoProporcionalTotal",
			align: "center",
			defaultSortOrder: "descend",
			sorter: (a, b) =>
				a.mediaPosicaoProporcionalTotal -
				b.mediaPosicaoProporcionalTotal,
		},
	];
};
