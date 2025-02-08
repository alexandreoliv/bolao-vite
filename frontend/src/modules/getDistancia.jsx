export const getDistancia = (keys, apostasData) => {
	const distanciaData = getDistanciaData(apostasData, keys);
	const distanciaColumns = getDistanciaColumns(keys);

	return {
		distanciaColumns,
		distanciaData,
	};
};

const getDistanciaData = (apostasData, keys) => {
	const distanciaData = [];
	for (let i = 0; i < apostasData.length; i++) {
		distanciaData[i] = JSON.parse(JSON.stringify(apostasData[i]));
		for (let j = 2; j < keys.length; j++) {
			// ignoring "Equipe" and "Atual"
			distanciaData[i][keys[j]] =
				apostasData[i][keys[j]] - apostasData[i].Atual;
		}
	}
	distanciaData.sort((a, b) => a.Atual - b.Atual);
	return distanciaData;
};

const getDistanciaColumns = (keys) => {
	const colours = [
		"#5cbd8c",
		"#76c79f",
		"#91d2b2",
		"#addec5",
		"#c8e9d9",
		"#e3f3eb",
		"#ffffff",
		"#fef6f6",
		"#fcecec",
		"#f9e2e3",
		"#f7d9d9",
		"#f6d0ce",
		"#f4c5c4",
		"#f2bcbb",
		"#f0b2b1",
		"#eda8a8",
		"#ec9f9d",
		"#ea9595",
		"#e88b8a",
		"#e68181",
	];

	const distanciaColumns = keys.map((k, index) => ({
		title: k,
		ellipsis: true,
		key: k,
		dataIndex: k,
		width: index === 0 ? "10%" : "",
		render: (text, record) => ({
			props: {
				style: {
					background:
						k !== "Atual" ? colours[Math.abs(text)] : "white",
				},
			},
			children: <div>{text}</div>,
		}),
		align: "center",
	}));

	return distanciaColumns;
};
