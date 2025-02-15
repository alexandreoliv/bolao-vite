import { useState, useEffect, useCallback } from "react";
import { Button, Form, Input, Select } from "antd";
import axios from "axios";
const { Option } = Select;

const AddAposta = (props) => {
	const { ano, serie, equipes } = props;
	const [form] = Form.useForm();
	const [formData, setFormData] = useState({});
	const [disabled, setDisabled] = useState(true);

	const checkFormCompletion = useCallback(() => {
		const allValues = form.getFieldsValue();
		const allFieldsFilled = equipes.every((e) => allValues[e]);
		const nomeFilled = allValues["nome"] && allValues["nome"].trim() !== "";
		setDisabled(!(allFieldsFilled && nomeFilled));
	}, [form, equipes]);

	useEffect(() => {
		if (!equipes) return;

		// initialize form data for the current série if it doesn't exist
		if (!formData[serie]) {
			const initialState = {
				nome: "",
				posicoes: equipes.map((e) => ({ equipe: e, posicao: 0 })),
				numerosDisponiveis: Array.from({ length: 20 }, (_, i) => i + 1),
				sent: false,
			};
			setFormData((prev) => ({
				...prev,
				[serie]: initialState,
			}));
		}

		// set form fields based on the current série's data
		const currentData = formData[serie] || {
			nome: "",
			posicoes: equipes.map((e) => ({ equipe: e, posicao: 0 })),
			numerosDisponiveis: Array.from({ length: 20 }, (_, i) => i + 1),
			sent: false,
		};
		form.setFieldsValue({
			nome: currentData.nome,
			...currentData.posicoes.reduce((acc, { equipe, posicao }) => {
				acc[equipe] = posicao;
				return acc;
			}, {}),
		});

		checkFormCompletion();
	}, [serie, equipes, form, formData, checkFormCompletion]);

	const onPosicaoChange = (equipe, posicao) => {
		const currentData = formData[serie] || {
			nome: "",
			posicoes: equipes.map((e) => ({ equipe: e, posicao: 0 })),
			numerosDisponiveis: Array.from({ length: 20 }, (_, i) => i + 1),
		};

		// prevents posicao from being undefined in case the user deletes it
		const newPosicao = posicao === undefined ? 0 : posicao;

		// gets previous position of this team
		const previousPosition = currentData.posicoes
			.filter((p) => p.equipe === equipe)
			.map((p) => p.posicao)[0];

		// removes the new position from the array of available positions
		const numerosNew = currentData.numerosDisponiveis.filter(
			(n) => n !== newPosicao
		);
		// and adds back the previous position (if it's not 0) -> then sorts it
		if (previousPosition !== 0) {
			numerosNew.push(previousPosition);
			numerosNew.sort((a, b) => a - b);
		}

		// now updates Posicoes
		const posicoesNew = currentData.posicoes.map((p) =>
			p.equipe === equipe ? { equipe, posicao: newPosicao } : p
		);

		// update form data for the current série
		setFormData((prev) => ({
			...prev,
			[serie]: {
				...prev[serie],
				posicoes: posicoesNew,
				numerosDisponiveis: numerosNew,
			},
		}));

		// update form field
		form.setFieldsValue({ [equipe]: newPosicao });
	};

	const onNomeChange = (e) => {
		const newNome = e.target.value;

		// save form data per `série`
		setFormData((prev) => ({
			...prev,
			[serie]: {
				...prev[serie],
				nome: newNome,
			},
		}));
		form.setFieldsValue({ nome: newNome });
	};

	const onFinish = async (values) => {
		const nome = values["nome"];
		const aposta = equipes.map((e) => values[e]);
		const obj = { ano, serie, nome, aposta };

		// update sent status for the current série
		setFormData((prev) => ({
			...prev,
			[serie]: {
				...prev[serie],
				sent: true,
			},
		}));

		try {
			const response = await axios.post(
				`${import.meta.env.VITE_API_URL}/sendAposta`,
				obj
			);
			console.log({ response });
		} catch (error) {
			console.error("Error sending aposta:", error);
		}
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
				form={form}
				name={`form-${serie}`}
				labelCol={{ span: 6 }}
				wrapperCol={{ span: 6 }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				onValuesChange={checkFormCompletion}
				autoComplete="off"
				disabled={formData[serie]?.sent}
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
					<Input maxLength={15} onChange={onNomeChange} />
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
							{formData[serie]?.numerosDisponiveis.map((p) => (
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
						disabled={disabled || formData[serie]?.sent}
					>
						{formData[serie]?.sent ? "Aposta enviada" : "Enviar"}
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};

export default AddAposta;
