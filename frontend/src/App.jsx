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
	});

	console.log({ dados });

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

	const { rankingData, rankingColumns } = dados ? getRanking(dados) : {};

	console.log("dados now", dados);

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
								apostasColumns={
									dados
										.filter(
											(d) =>
												d.ano === component.ano &&
												d.serie === component.serie
										)
										.map((d) => d.apostasColumns)[0]
								}
								apostasData={
									dados
										.filter(
											(d) =>
												d.ano === component.ano &&
												d.serie === component.serie
										)
										.map((d) => d.apostasData)[0]
								}
							/>
						) : component.page === "classificacao" ? (
							<Classificacao
								ano={component.ano}
								serie={component.serie}
								classificacaoColumns={
									dados
										.filter(
											(d) =>
												d.ano === component.ano &&
												d.serie === component.serie
										)
										.map((d) => d.classificacaoColumns)[0]
								}
								classificacaoData={
									dados
										.filter(
											(d) =>
												d.ano === component.ano &&
												d.serie === component.serie
										)
										.map((d) => d.classificacaoData)[0]
								}
							/>
						) : component.page === "distancia" ? (
							<Distancia
								ano={component.ano}
								serie={component.serie}
								distanciaColumns={
									dados
										.filter(
											(d) =>
												d.ano === component.ano &&
												d.serie === component.serie
										)
										.map((d) => d.distanciaColumns)[0]
								}
								distanciaData={
									dados
										.filter(
											(d) =>
												d.ano === component.ano &&
												d.serie === component.serie
										)
										.map((d) => d.distanciaData)[0]
								}
							/>
						) : component.page === "addAposta" ? (
							<AddAposta
								ano={component.ano}
								serie={component.serie}
								equipes={
									dados
										.filter(
											(d) =>
												d.ano === component.ano &&
												d.serie === component.serie
										)
										.map((d) => d.tabela.equipes)[0]
								}
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
