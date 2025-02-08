import { useState, useEffect } from "react";
import { Button, Form, Input, Select } from "antd";
const { Option } = Select;

const AddAposta = (props) => {
	console.log("inside AddAposta");
	const { ano, serie, equipes } = props;
	const [posicoesA, setPosicoesA] = useState([]);
	const [posicoesB, setPosicoesB] = useState([]);
	const [numerosA, setNumerosA] = useState([
		1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
	]);
	const [numerosB, setNumerosB] = useState([
		1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
	]);
	const [disabledA, setDisabledA] = useState(false);
	const [disabledB, setDisabledB] = useState(false);

	useEffect(() => {
		console.log("inside useEffect");
		if (equipes) {
			if (serie === "A") {
				if (posicoesA.length === 0) {
					console.log(
						"useEffect is finally doing some stuff - setting posicoes"
					);
					const state = equipes.map((e) => ({
						equipe: e,
						posicao: 0,
					}));
					setPosicoesA(state);
				} else
					console.log(
						"posicoes already has the positions, nothing to do in the useEffect"
					);
			} else if (serie === "B") {
				if (posicoesB.length === 0) {
					console.log(
						"useEffect is finally doing some stuff - setting posicoes"
					);
					const state = equipes.map((e) => ({
						equipe: e,
						posicao: 0,
					}));
					setPosicoesB(state);
				} else
					console.log(
						"posicoes already has the positions, nothing to do in the useEffect"
					);
			}
		} else console.log("no equipes yet, nothing to do in the useEffect");
	}, [equipes, posicoesA, posicoesB, serie]);

	const onPosicaoChange = (equipe, posicao) => {
		console.log("inside onPosicaoChange");

		let previousPosition;
		// gets previous position of this team
		if (serie === "A") {
			previousPosition = posicoesA
				.filter((p) => p.equipe === equipe)
				.map((p) => p.posicao)[0];
		} else if (serie === "B") {
			previousPosition = posicoesB
				.filter((p) => p.equipe === equipe)
				.map((p) => p.posicao)[0];
		}

		let numerosNew;
		// removes the new position from the array of available positions
		serie === "A"
			? (numerosNew = numerosA.filter((n) => n !== posicao))
			: (numerosNew = numerosB.filter((n) => n !== posicao));
		// and adds back the previous position (if it's not 0) -> then sorts it
		if (previousPosition !== 0) {
			numerosNew.push(previousPosition);
			numerosNew.sort((a, b) => a - b);
		}
		serie === "A" ? setNumerosA(numerosNew) : setNumerosB(numerosNew);

		// now updates Posicoes
		if (serie === "A") {
			const posicoesANew = posicoesA.map((p) =>
				p.equipe === equipe ? { equipe, posicao } : p
			);
			setPosicoesA(posicoesANew);
		} else if (serie === "B") {
			const posicoesBNew = posicoesB.map((p) =>
				p.equipe === equipe ? { equipe, posicao } : p
			);
			setPosicoesB(posicoesBNew);
		}
	};

	const onFinish = (values) => {
		const nome = values["nome"];
		const aposta = equipes.map((e) => values[e]);
		const obj = { ano, serie, nome, aposta };
		const axios = require("axios");
		serie === "A" ? setDisabledA(true) : setDisabledB(true);
		return axios
			.post(`${process.env.REACT_APP_API_URL}/sendAposta`, obj)
			.then((response) => {
				console.log({ response });
			})
			.catch((error) => console.log(error));
	};

	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};

	if (!equipes) {
		console.log("no props yet, will return null");
		return null; // no props yet
	}

	return (
		<div>
			<h2
				style={{
					fontWeight: "bold",
					margin: "0 0 10px 10px",
					textAlign: "center",
				}}
			>
				Adicionar Aposta
			</h2>

			<Form
				name="basic"
				labelCol={{ span: 2 }}
				wrapperCol={{ span: 3 }}
				initialValues={{ remember: true }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off"
			>
				<Form.Item
					label="Nome"
					name="nome"
					rules={[
						{
							required: true,
							message: "Escreva seu nome",
						},
					]}
				>
					<Input />
				</Form.Item>

				{equipes.map((e) => (
					<Form.Item
						name={e}
						label={e}
						key={e}
						rules={[{ required: true }]}
					>
						<Select
							placeholder="Posição"
							onChange={(event) => onPosicaoChange(e, event)}
							allowClear
						>
							{serie === "A"
								? numerosA.map((p) => (
										<Option value={p} key={p}>
											{p}
										</Option>
								  ))
								: numerosB.map((p) => (
										<Option value={p} key={p}>
											{p}
										</Option>
								  ))}
						</Select>
					</Form.Item>
				))}

				<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
					<Button
						type="primary"
						htmlType="submit"
						disabled={serie === "A" ? disabledA : disabledB}
					>
						{serie === "A"
							? disabledA
								? "Aposta enviada"
								: "Enviar"
							: disabledB
							? "Aposta enviada"
							: "Enviar"}
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};

export default AddAposta;
