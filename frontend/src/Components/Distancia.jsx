import { Table } from "antd";

const Distancia = (props) => {
	const { ano, serie, distanciaColumns, distanciaData } = props;

	if (!props.distanciaColumns) return null; // no props yet

	return (
		<div>
			<h2
				style={{
					fontWeight: "bold",
					margin: "0 0 10px 10px",
					textAlign: "center",
				}}
			>
				Distância Para o Acerto Série {serie} {ano}
			</h2>
			<Table
				className="big-table"
				columns={distanciaColumns}
				dataSource={distanciaData}
				pagination={false}
				size={"small"}
			/>
		</div>
	);
};

export default Distancia;
