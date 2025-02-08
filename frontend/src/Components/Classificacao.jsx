import { Table } from "antd";

const Classificacao = (props) => {
	const { ano, serie, classificacaoColumns, classificacaoData } = props;

	if (!props.classificacaoColumns) return null; // no props yet

	return (
		<div>
			<h2
				style={{
					fontWeight: "bold",
					margin: "0 0 10px 10px",
					textAlign: "center",
				}}
			>
				Classificação Série {serie} {ano}
			</h2>
			<Table
				className="small-table"
				columns={classificacaoColumns}
				dataSource={classificacaoData}
				pagination={false}
				size={"small"}
			/>
		</div>
	);
};

export default Classificacao;
