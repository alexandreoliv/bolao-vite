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
const { Header, Content, Footer } = Layout;

export const App = () => {
	const [component, setComponent] = useState({
		ano: 2022,
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
		dados.push(await getData(2020, "A"));
		dados.push(await getData(2021, "A"));
		dados.push(await getData(2021, "B"));
		dados.push(await getData(2022, "A"));
		dados.push(await getData(2022, "B"));
		// dados.push(await getData(2023, "A"));
		// dados.push(await getData(2023, "B"));
		setDados(dados);
	};

	const filterData = (ano, serie, key) => {
		return dados
			.filter((d) => d.ano === ano && d.serie === serie)
			.map((d) => d[key])[0];
	};

	const { rankingData, rankingColumns } = dados ? getRanking(dados) : {};

	return (
		<Layout className="layout">
			<Header>
				<div className="logo" />
				<MenuBolao component={component} setComponent={setComponent} />
			</Header>
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
								apostasColumns={filterData(component.ano, component.serie, "apostasColumns")}
								apostasData={filterData(component.ano, component.serie, "apostasData")}
							/>
						) : component.page === "classificacao" ? (
							<Classificacao
								ano={component.ano}
								serie={component.serie}
								classificacaoColumns={filterData(component.ano, component.serie, "classificacaoColumns")}
								classificacaoData={filterData(component.ano, component.serie, "classificacaoData")}
							/>
						) : component.page === "distancia" ? (
							<Distancia
								ano={component.ano}
								serie={component.serie}
								distanciaColumns={filterData(component.ano, component.serie, "distanciaColumns")}
								distanciaData={filterData(component.ano, component.serie, "distanciaData")}
							/>
						) : component.page === "addAposta" ? (
							<AddAposta
								ano={component.ano}
								serie={component.serie}
								equipes={filterData(component.ano, component.serie, "tabela.equipes")}
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
			<Footer style={{ textAlign: "center" }}></Footer>
		</Layout>
	);
};
