import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const antIcon = (
	<LoadingOutlined
		style={{
			fontSize: 24,
		}}
		spin
	/>
);

const Loading = () => {
	return (
		<div>
			<h2
				style={{
					fontWeight: "bold",
					margin: "0 0 10px 10px",
					textAlign: "center",
				}}
			>
				<Spin indicator={antIcon} />
			</h2>
		</div>
	);
};

export default Loading;
