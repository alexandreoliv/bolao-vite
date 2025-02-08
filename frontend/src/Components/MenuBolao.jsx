import { Menu } from "antd";

const MenuBolao = (props) => {
	const { component, setComponent } = props;
	return (
		<Menu theme="dark" mode="horizontal" defaultSelectedKeys={["s1"]}>
			{/* <Menu.Item
				key="22"
				onClick={() =>
					setComponent({
						ano: 2023,
						serie: "A",
						page: "addAposta",
					})
				}
			>
				Adicionar Aposta A
			</Menu.Item>
			<Menu.Item
				key="23"
				onClick={() =>
					setComponent({
						ano: 2023,
						serie: "B",
						page: "addAposta",
					})
				}
			>
				Adicionar Aposta B
			</Menu.Item> */}

			<Menu.SubMenu key="s1" title="2023">
				<Menu.ItemGroup title="Série A">
					<Menu.Item
						key="1"
						onClick={() =>
							setComponent({
								ano: 2023,
								serie: "A",
								page: "classificacao",
							})
						}
					>
						Classificação
					</Menu.Item>
					<Menu.Item
						key="2"
						onClick={() =>
							setComponent({
								ano: 2023,
								serie: "A",
								page: "apostas",
							})
						}
					>
						Apostas
					</Menu.Item>
					<Menu.Item
						key="3"
						onClick={() =>
							setComponent({
								ano: 2023,
								serie: "A",
								page: "distancia",
							})
						}
					>
						Distância
					</Menu.Item>
				</Menu.ItemGroup>
				<Menu.ItemGroup title="Série B">
					<Menu.Item
						key="4"
						onClick={() =>
							setComponent({
								ano: 2023,
								serie: "B",
								page: "classificacao",
							})
						}
					>
						Classificação
					</Menu.Item>
					<Menu.Item
						key="5"
						onClick={() =>
							setComponent({
								ano: 2023,
								serie: "B",
								page: "apostas",
							})
						}
					>
						Apostas
					</Menu.Item>
					<Menu.Item
						key="6"
						onClick={() =>
							setComponent({
								ano: 2023,
								serie: "B",
								page: "distancia",
							})
						}
					>
						Distância
					</Menu.Item>
				</Menu.ItemGroup>
			</Menu.SubMenu>

			<Menu.SubMenu key="s2" title="2022">
				<Menu.ItemGroup title="Série A">
					<Menu.Item
						key="7"
						onClick={() =>
							setComponent({
								ano: 2022,
								serie: "A",
								page: "classificacao",
							})
						}
					>
						Classificação
					</Menu.Item>
					<Menu.Item
						key="8"
						onClick={() =>
							setComponent({
								ano: 2022,
								serie: "A",
								page: "apostas",
							})
						}
					>
						Apostas
					</Menu.Item>
					<Menu.Item
						key="9"
						onClick={() =>
							setComponent({
								ano: 2022,
								serie: "A",
								page: "distancia",
							})
						}
					>
						Distância
					</Menu.Item>
				</Menu.ItemGroup>
				<Menu.ItemGroup title="Série B">
					<Menu.Item
						key="10"
						onClick={() =>
							setComponent({
								ano: 2022,
								serie: "B",
								page: "classificacao",
							})
						}
					>
						Classificação
					</Menu.Item>
					<Menu.Item
						key="11"
						onClick={() =>
							setComponent({
								ano: 2022,
								serie: "B",
								page: "apostas",
							})
						}
					>
						Apostas
					</Menu.Item>
					<Menu.Item
						key="12"
						onClick={() =>
							setComponent({
								ano: 2022,
								serie: "B",
								page: "distancia",
							})
						}
					>
						Distância
					</Menu.Item>
				</Menu.ItemGroup>
			</Menu.SubMenu>

			<Menu.SubMenu key="s3" title="2021">
				<Menu.ItemGroup title="Série A">
					<Menu.Item
						key="13"
						onClick={() =>
							setComponent({
								ano: 2021,
								serie: "A",
								page: "classificacao",
							})
						}
					>
						Classificação
					</Menu.Item>
					<Menu.Item
						key="14"
						onClick={() =>
							setComponent({
								ano: 2021,
								serie: "A",
								page: "apostas",
							})
						}
					>
						Apostas
					</Menu.Item>
					<Menu.Item
						key="15"
						onClick={() =>
							setComponent({
								ano: 2021,
								serie: "A",
								page: "distancia",
							})
						}
					>
						Distância
					</Menu.Item>
				</Menu.ItemGroup>
				<Menu.ItemGroup title="Série B">
					<Menu.Item
						key="16"
						onClick={() =>
							setComponent({
								ano: 2021,
								serie: "B",
								page: "classificacao",
							})
						}
					>
						Classificação
					</Menu.Item>
					<Menu.Item
						key="17"
						onClick={() =>
							setComponent({
								ano: 2021,
								serie: "B",
								page: "apostas",
							})
						}
					>
						Apostas
					</Menu.Item>
					<Menu.Item
						key="18"
						onClick={() =>
							setComponent({
								ano: 2021,
								serie: "B",
								page: "distancia",
							})
						}
					>
						Distância
					</Menu.Item>
				</Menu.ItemGroup>
			</Menu.SubMenu>

			<Menu.SubMenu key="s4" title="2020">
				<Menu.ItemGroup title="Série A">
					<Menu.Item
						key="19"
						onClick={() =>
							setComponent({
								ano: 2020,
								serie: "A",
								page: "classificacao",
							})
						}
					>
						Classificação
					</Menu.Item>
					<Menu.Item
						key="20"
						onClick={() =>
							setComponent({
								ano: 2020,
								serie: "A",
								page: "apostas",
							})
						}
					>
						Apostas
					</Menu.Item>
					<Menu.Item
						key="21"
						onClick={() =>
							setComponent({
								ano: 2020,
								serie: "A",
								page: "distancia",
							})
						}
					>
						Distância
					</Menu.Item>
				</Menu.ItemGroup>
			</Menu.SubMenu>

			{/* <Menu.Item
				key="24"
				onClick={() =>
					setComponent({
						...component,
						page: "ranking",
					})
				}
			>
				Ranking
			</Menu.Item> */}

			<Menu.Item
				key="25"
				onClick={() =>
					setComponent({
						...component,
						page: "regras",
					})
				}
			>
				Regras
			</Menu.Item>
		</Menu>
	);
};

export default MenuBolao;
