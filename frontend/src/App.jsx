import "./App.css";
import { Layout } from "antd";
import { useState, useEffect } from "react";
import Apostas from "./Components/Apostas";
import Classificacao from "./Components/Classificacao";
import Distancia from "./Components/Distancia";
import Regras from "./Components/Regras";
import AddAposta from "./Components/AddAposta";
import MenuBolao from "./Components/MenuBolao";
import Loading from "./Components/Loading";
import Ranking from "./Components/Ranking";
import { getData } from "./modules/getData";
import { getRanking } from "./modules/getRanking";

const { Content, Sider } = Layout;

export const App = () => {
	const startYear = 2020;
	const endYear = 2025;

	const [component, setComponent] = useState({
		ano: endYear,
		serie: "A",
		page: "classificacao",
	});

	const [dados, setDados] = useState("");

	useEffect(() => {
		if (!dados) {
			getAllData();
		}
	}, [dados]);

	const getAllData = async () => {
		let dados = [];

		// Fetch data dynamically for each year between startYear and endYear
		for (let ano = startYear; ano <= endYear; ano++) {
			if (ano === 2020) {
				// Only fetch Série A for 2020
				dados.push(await getData(ano, "A"));
			} else {
				// Fetch both Série A and Série B for other years
				dados.push(await getData(ano, "A"));
				dados.push(await getData(ano, "B"));
			}
		}

		setDados(dados);
	};

	const filterData = (ano, serie, key) => {
		return dados
			.filter((d) => d.ano === ano && d.serie === serie)
			.map((d) => d[key])[0];
	};

	const { rankingData, rankingColumns } = dados ? getRanking(dados) : {};

	// Extract the equipes array to be passed on to AddAposta
	const { tabela: { equipes } = {} } = Array.isArray(dados)
		? dados.find(
				(d) => d.ano === component.ano && d.serie === component.serie
		  ) || {}
		: {};

	return (
		<Layout className="layout">
			<Sider
				width={250}
				theme="light"
				className="site-layout-background"
				breakpoint="md" // Automatically collapses on smaller screens
				collapsedWidth="0"
			>
				<MenuBolao
					setComponent={setComponent}
					startYear={startYear}
					endYear={endYear}
				/>
			</Sider>
			<Layout>
				<Content style={{ padding: "0 50px" }}>
					<h1
						style={{
							textAlign: "center",
							fontWeight: "bold",
							margin: "10px 0",
						}}
					>
						Bolão Brasileiro
					</h1>
					<div
						className="site-layout-content"
						style={{ padding: "10px 0 0 0 " }}
					>
						{!dados && <Loading />}
						{dados ? (
							component.page === "apostas" ? (
								<Apostas
									ano={component.ano}
									serie={component.serie}
									apostasColumns={filterData(
										component.ano,
										component.serie,
										"apostasColumns"
									)}
									apostasData={filterData(
										component.ano,
										component.serie,
										"apostasData"
									)}
								/>
							) : component.page === "classificacao" ? (
								<Classificacao
									ano={component.ano}
									serie={component.serie}
									classificacaoColumns={filterData(
										component.ano,
										component.serie,
										"classificacaoColumns"
									)}
									classificacaoData={filterData(
										component.ano,
										component.serie,
										"classificacaoData"
									)}
								/>
							) : component.page === "distancia" ? (
								<Distancia
									ano={component.ano}
									serie={component.serie}
									distanciaColumns={filterData(
										component.ano,
										component.serie,
										"distanciaColumns"
									)}
									distanciaData={filterData(
										component.ano,
										component.serie,
										"distanciaData"
									)}
								/>
							) : component.page === "addAposta" ? (
								<AddAposta
									ano={component.ano}
									serie={component.serie}
									equipes={equipes}
								/>
							) : component.page === "ranking" ? (
								<Ranking
									rankingColumns={rankingColumns}
									rankingData={rankingData}
								/>
							) : component.page === "regras" ? (
								<Regras />
							) : null
						) : null}
					</div>
				</Content>
			</Layout>
		</Layout>
	);
};
