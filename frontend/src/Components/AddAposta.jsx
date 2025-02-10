import { useState, useEffect } from "react";
import { Button, Form, Input, Select } from "antd";
import axios from "axios";
const { Option } = Select;

const AddAposta = (props) => {
	const { ano, serie, equipes } = props;
	const [formData, setFormData] = useState({}); // Stores form data per série
	const [posicoes, setPosicoes] = useState([]);
	const [numeros, setNumeros] = useState([
		1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
	]);
	const [disabled, setDisabled] = useState(false);

	useEffect(() => {
		if (!equipes) return;

		// If there is stored data for this série, use it
		if (formData[serie]) {
			setPosicoes(formData[serie].posicoes);
			setNumeros(formData[serie].numeros);
		} else {
			const state = equipes.map((e) => ({
				equipe: e,
				posicao: 0,
			}));
			setPosicoes(state);
			setNumeros([
				1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
				19, 20,
			]);
		}
	}, [equipes, serie]);

	const onPosicaoChange = (equipe, posicao) => {
		// gets previous position of this team
		const previousPosition = posicoes
			.filter((p) => p.equipe === equipe)
			.map((p) => p.posicao)[0];

		// removes the new position from the array of available positions
		const numerosNew = numeros.filter((n) => n !== posicao);
		// and adds back the previous position (if it's not 0) -> then sorts it
		if (previousPosition !== 0) {
			numerosNew.push(previousPosition);
			numerosNew.sort((a, b) => a - b);
		}
		setNumeros(numerosNew);

		// now updates Posicoes
		const posicoesNew = posicoes.map((p) =>
			p.equipe === equipe ? { equipe, posicao } : p
		);
		setPosicoes(posicoesNew);

		// Save form data per `serie`
		setFormData((prev) => ({
			...prev,
			[serie]: { posicoes: posicoesNew, numeros: numerosNew },
		}));
	};

	const onFinish = async (values) => {
		setDisabled(true);
		const nome = values["nome"];
		const aposta = equipes.map((e) => values[e]);
		const obj = { ano, serie, nome, aposta };

		return axios
			.post(`${import.meta.env.VITE_API_URL}/sendAposta`, obj)
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
				Adicionar Aposta {serie} {ano}
			</h2>
			<Form
				name="basic"
				labelCol={{ span: 6 }}
				wrapperCol={{ span: 6 }}
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
					<Input maxLength={15} />
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
							{numeros.map((p) => (
								<Option value={p} key={`posicao-${p}`}>
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
						disabled={disabled}
					>
						{disabled ? "Aposta enviada" : "Enviar"}
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};

export default AddAposta;
