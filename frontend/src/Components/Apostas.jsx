import { Table } from "antd";

const Apostas = (props) => {
	const { ano, serie, apostasColumns, apostasData } = props;

	if (!props.apostasColumns) return null; // no props yet

	return (
		<div>
			<h2
				style={{
					fontWeight: "bold",
					margin: "0 0 10px 10px",
					textAlign: "center",
				}}
			>
				Apostas Série {serie} {ano}
			</h2>
			<Table
				className="big-table"
				columns={apostasColumns}
				dataSource={apostasData}
				pagination={false}
				size={"small"}
			/>
		</div>
	);
};

export default Apostas;
