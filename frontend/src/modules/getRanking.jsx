const removeNames = new Set([
	"18ª Rodada",
	"19ª Rodada",
	"Chance de Gol",
	"ESPN/Fox",
	"FiveThirtyEight",
	"GE/SporTV",
	"Globo Esporte",
	"O Lance",
	"PVC",
	"Random",
	"Ranking CBF",
	"Ranking Pontos Corridos",
	"Super",
	"Transfermarkt",
]);

export const getRanking = (classificacaoData) => {
	const finalRanking = {};
	let previousPosition = Infinity; // start with a large number to detect the first year

	classificacaoData.forEach((entry) => {
		const { nome, pontuacao, posicao } = entry;

		if (removeNames.has(nome)) return;

		if (!finalRanking[nome]) {
			finalRanking[nome] = {
				totalPoints: 0,
				participations: 0,
				titles: 0,
			};
		}

		finalRanking[nome].totalPoints += pontuacao;
		finalRanking[nome].participations += 1;

		// check if a new year has started
		if (posicao < previousPosition) {
			// assign title to the current entry
			finalRanking[nome].titles += 1;
		}

		previousPosition = posicao;
	});

	const rankingColumns = [
		{
			title: "Posição",
			key: "position",
			dataIndex: "position",
			align: "center",
		},
		{ title: "Nome", key: "name", dataIndex: "name", align: "center" },
		{
			title: "Títulos",
			key: "titles",
			dataIndex: "titles",
			align: "center",
		},
		{
			title: "Média de Pontos",
			key: "average",
			dataIndex: "average",
			align: "center",
		},
		{
			title: "Participações",
			key: "participations",
			dataIndex: "participations",
			align: "center",
		},
		{
			title: "Pontuação Total",
			key: "totalPoints",
			dataIndex: "totalPoints",
			align: "center",
		},
	];

	const rankingData = Object.entries(finalRanking)
		.map(([name, data], index) => ({
			key: index,
			name,
			totalPoints: data.totalPoints,
			participations: data.participations,
			average: (data.totalPoints / data.participations).toFixed(2),
			titles: data.titles,
		}))
		.sort((a, b) => {
			if (b.titles !== a.titles) return b.titles - a.titles;
			if (b.average !== a.average) return b.average - a.average;
			if (b.participations !== a.participations)
				return b.participations - a.participations;
			return a.name.localeCompare(b.name);
		})
		.map((entry, index, array) => {
			if (
				index > 0 &&
				entry.titles === array[index - 1].titles &&
				entry.average === array[index - 1].average &&
				entry.participations === array[index - 1].participations
			) {
				entry.position = array[index - 1].position;
			} else {
				entry.position = index + 1;
			}
			return entry;
		})
		.sort((a, b) => {
			if (a.position !== b.position) return a.position - b.position;
			return a.name.localeCompare(b.name);
		});

	return { rankingColumns, rankingData };
};
