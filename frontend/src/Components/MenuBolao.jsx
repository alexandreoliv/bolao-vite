import { Menu } from "antd";
import { useState } from "react";

const generateMenuItems = (startYear, endYear, setComponent) => {
	const menuItems = [];
	const opcoes = [
		{ label: "Classificação", page: "classificacao" },
		{ label: "Apostas", page: "apostas" },
		{ label: "Distância", page: "distancia" },
	];
	let keyCounter = 1;

	for (let year = endYear; year >= startYear; year--) {
		const yearMenu = {
			key: `s${year}`,
			label: `${year}`,
			children: [],
		};

		// Generate Série A menu items
		const seriesA = opcoes.map((item) => ({
			key: `s${year}-A-${keyCounter++}`,
			label: item.label,
			onClick: () =>
				setComponent({ ano: year, serie: "A", page: item.page }),
		}));

		yearMenu.children.push({
			type: "group",
			label: "Série A",
			children: seriesA,
		});

		// Generate Série B menu items (skip for 2020)
		if (year !== 2020) {
			const seriesB = opcoes.map((item) => ({
				key: `s${year}-B-${keyCounter++}`,
				label: item.label,
				onClick: () =>
					setComponent({ ano: year, serie: "B", page: item.page }),
			}));

			yearMenu.children.push({
				type: "group",
				label: "Série B",
				children: seriesB,
			});
		}

		menuItems.push(yearMenu);
	}

	menuItems.push({
		key: `s-ranking`,
		label: "Rankings",
		children: [
			{
				key: "s-ranking-A",
				label: "Série A",
				onClick: () => setComponent({ page: "ranking", serie: "A" }),
			},
			{
				key: "s-ranking-B",
				label: "Série B",
				onClick: () => setComponent({ page: "ranking", serie: "B" }),
			},
			{
				key: "s-ranking-geral",
				label: "Geral",
				onClick: () =>
					setComponent({ page: "ranking", serie: "Geral" }),
			},
		],
	});

	menuItems.push({
		key: "s-adicionar-aposta",
		label: "Adicionar Aposta 2025",
		children: [
			{
				key: "s-adicionar-aposta-A",
				label: "Série A",
				onClick: () =>
					setComponent({
						ano: endYear,
						serie: "A",
						page: "addAposta",
					}),
			},
			{
				key: "s-adicionar-aposta-B",
				label: "Série B",
				onClick: () =>
					setComponent({
						ano: endYear,
						serie: "B",
						page: "addAposta",
					}),
			},
		],
	});

	menuItems.push({
		key: `s-regras`,
		label: "Regras",
		onClick: () => setComponent((prev) => ({ ...prev, page: "regras" })),
	});

	return menuItems;
};

const MenuBolao = ({ setComponent, startYear, endYear }) => {
	const [openKeys, setOpenKeys] = useState([`s${endYear}`]);

	const handleOpenChange = (keys) => {
		// Only keep the last clicked year key, closing the other years' submenus
		setOpenKeys(keys.length === 1 ? keys : [keys[keys.length - 1]]);
	};

	const menuItems = generateMenuItems(startYear, endYear, setComponent);

	return (
		<Menu
			theme="light"
			mode="inline"
			defaultSelectedKeys={[`s${endYear}`]}
			items={menuItems}
			openKeys={openKeys}
			onOpenChange={handleOpenChange}
		/>
	);
};

export default MenuBolao;
