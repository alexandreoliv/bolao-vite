export const getClassificacao = (keys, apostasData) => {
	const filteredKeys = keys.filter((k) => k !== "Equipe" && k !== "Atual");
	const pontuacaoDetalhada = getPontuacaoDetalhada(filteredKeys, apostasData);
	const pontuacaoFinal = getPontuacaoFinal(pontuacaoDetalhada);
	const classificacaoData = getClassificacaoData(
		filteredKeys,
		pontuacaoFinal
	);
	const classificacaoColumns = getClassificacaoColumns();

	return {
		classificacaoColumns,
		classificacaoData,
	};
};

const getPontuacaoDetalhada = (filteredKeys, apostasData) => {
	return filteredKeys.map((k) =>
		apostasData.map((e) => calculaPontuacao(e[k] - e["Atual"]))
	);
};

const calculaPontuacao = (distancia) => {
	if (distancia === 0) return 5;
	if (Math.abs(distancia) === 1) return 3;
	if (Math.abs(distancia) === 2) return 1;
	if (Math.abs(distancia) === 3) return 0;
	if (Math.abs(distancia) === 4) return -1;
	if (Math.abs(distancia) === 5) return -3;
	if (Math.abs(distancia) >= 6) return -5;
};

const getPontuacaoFinal = (pontuacaoDetalhada) => {
	return pontuacaoDetalhada.map((p) =>
		p.reduce((prev, cur) => prev + cur, 0)
	);
};

const getClassificacaoData = (filteredKeys, pontuacaoFinal) => {
	let classificacaoData = [];
	for (let i = 0; i < filteredKeys.length; i++) {
		classificacaoData[i] = {};
		classificacaoData[i]["nome"] = filteredKeys[i];
		classificacaoData[i]["pontuacao"] = pontuacaoFinal[i];
		classificacaoData[i]["key"] = filteredKeys[i];
	}
	classificacaoData.sort((a, b) => b.pontuacao - a.pontuacao);
	return addPosicaoApostador(classificacaoData);
};

const addPosicaoApostador = (classificacaoData) => {
	let clone = JSON.parse(JSON.stringify(classificacaoData));
	clone[0].posicao = 1;
	for (let i = 1; i < clone.length; i++) {
		if (clone[i].pontuacao === clone[i - 1].pontuacao)
			clone[i].posicao = clone[i - 1].posicao;
		else clone[i].posicao = i + 1;
	}
	return clone;
};

const getClassificacaoColumns = () => {
	return [
		{
			title: "Posição",
			ellipsis: true,
			key: "posicao",
			dataIndex: "posicao",
			align: "center",
			width: "15%",
		},
		{
			title: "Nome",
			ellipsis: true,
			key: "nome",
			dataIndex: "nome",
			align: "center",
			width: "30%",
		},
		{
			title: "Pontuação",
			ellipsis: true,
			key: "pontuacao",
			dataIndex: "pontuacao",
			align: "center",
			width: "15%",
		},
	];
};
