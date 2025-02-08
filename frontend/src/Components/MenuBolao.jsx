import { Menu } from "antd";

const MenuBolao = ({ component, setComponent }) => {
	const menuItems = [
		{
			key: "s2023",
			label: "2023",
			children: [
				{
					type: "group",
					label: "Série A",
					children: [
						{
							key: "21",
							label: "Classificação",
							onClick: () =>
								setComponent({
									ano: 2023,
									serie: "A",
									page: "classificacao",
								}),
						},
						{
							key: "20",
							label: "Apostas",
							onClick: () =>
								setComponent({
									ano: 2023,
									serie: "A",
									page: "apostas",
								}),
						},
						{
							key: "19",
							label: "Distância",
							onClick: () =>
								setComponent({
									ano: 2023,
									serie: "A",
									page: "distancia",
								}),
						},
					],
				},
				{
					type: "group",
					label: "Série B",
					children: [
						{
							key: "18",
							label: "Classificação",
							onClick: () =>
								setComponent({
									ano: 2023,
									serie: "B",
									page: "classificacao",
								}),
						},
						{
							key: "17",
							label: "Apostas",
							onClick: () =>
								setComponent({
									ano: 2023,
									serie: "B",
									page: "apostas",
								}),
						},
						{
							key: "16",
							label: "Distância",
							onClick: () =>
								setComponent({
									ano: 2023,
									serie: "B",
									page: "distancia",
								}),
						},
					],
				},
			],
		},
		{
			key: "s2022",
			label: "2022",
			children: [
				{
					type: "group",
					label: "Série A",
					children: [
						{
							key: "15",
							label: "Classificação",
							onClick: () =>
								setComponent({
									ano: 2022,
									serie: "A",
									page: "classificacao",
								}),
						},
						{
							key: "14",
							label: "Apostas",
							onClick: () =>
								setComponent({
									ano: 2022,
									serie: "A",
									page: "apostas",
								}),
						},
						{
							key: "13",
							label: "Distância",
							onClick: () =>
								setComponent({
									ano: 2022,
									serie: "A",
									page: "distancia",
								}),
						},
					],
				},
				{
					type: "group",
					label: "Série B",
					children: [
						{
							key: "12",
							label: "Classificação",
							onClick: () =>
								setComponent({
									ano: 2022,
									serie: "B",
									page: "classificacao",
								}),
						},
						{
							key: "11",
							label: "Apostas",
							onClick: () =>
								setComponent({
									ano: 2022,
									serie: "B",
									page: "apostas",
								}),
						},
						{
							key: "10",
							label: "Distância",
							onClick: () =>
								setComponent({
									ano: 2022,
									serie: "B",
									page: "distancia",
								}),
						},
					],
				},
			],
		},
		{
			key: "s2021",
			label: "2021",
			children: [
				{
					type: "group",
					label: "Série A",
					children: [
						{
							key: "9",
							label: "Classificação",
							onClick: () =>
								setComponent({
									ano: 2021,
									serie: "A",
									page: "classificacao",
								}),
						},
						{
							key: "8",
							label: "Apostas",
							onClick: () =>
								setComponent({
									ano: 2021,
									serie: "A",
									page: "apostas",
								}),
						},
						{
							key: "7",
							label: "Distância",
							onClick: () =>
								setComponent({
									ano: 2021,
									serie: "A",
									page: "distancia",
								}),
						},
					],
				},
				{
					type: "group",
					label: "Série B",
					children: [
						{
							key: "6",
							label: "Classificação",
							onClick: () =>
								setComponent({
									ano: 2021,
									serie: "B",
									page: "classificacao",
								}),
						},
						{
							key: "5",
							label: "Apostas",
							onClick: () =>
								setComponent({
									ano: 2021,
									serie: "B",
									page: "apostas",
								}),
						},
						{
							key: "4",
							label: "Distância",
							onClick: () =>
								setComponent({
									ano: 2021,
									serie: "B",
									page: "distancia",
								}),
						},
					],
				},
			],
		},
		{
			key: "s2020",
			label: "2020",
			children: [
				{
					type: "group",
					label: "Série A",
					children: [
						{
							key: "3",
							label: "Classificação",
							onClick: () =>
								setComponent({
									ano: 2020,
									serie: "A",
									page: "classificacao",
								}),
						},
						{
							key: "2",
							label: "Apostas",
							onClick: () =>
								setComponent({
									ano: 2020,
									serie: "A",
									page: "apostas",
								}),
						},
						{
							key: "1",
							label: "Distância",
							onClick: () =>
								setComponent({
									ano: 2020,
									serie: "A",
									page: "distancia",
								}),
						},
					],
				},
			],
		},
		// {
		// 	key: "s8",
		// 	label: "Ranking",
		// 	onClick: () => setComponent({ ...component, page: "ranking" }),
		// },
		{
			key: "s7",
			label: "Regras",
			onClick: () => setComponent({ ...component, page: "regras" }),
		},
	];

	return (
		<Menu
			theme="dark"
			mode="horizontal"
			defaultSelectedKeys={["s1"]}
			items={menuItems}
		/>
	);
};

export default MenuBolao;
