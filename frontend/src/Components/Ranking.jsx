import { Table } from "antd";

const Ranking = (props) => {
	const { serie, rankingColumns, rankingData } = props;

	if (!props.rankingColumns) return null; // no props yet

	return (
		<div>
			<h2
				style={{
					fontWeight: "bold",
					margin: "0 0 10px 10px",
					textAlign: "center",
				}}
			>
				{serie === "Geral"
					? `Ranking ${serie}`
					: `Ranking Série ${serie}`}
			</h2>
			<Table
				className="big-table"
				columns={rankingColumns}
				dataSource={rankingData}
				pagination={false}
				size={"small"}
			/>
		</div>
	);
};

export default Ranking;
