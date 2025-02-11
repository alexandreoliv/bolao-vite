import axios from "axios";

export const getTabela = async (ano, serie) => {
	if (ano === 2025) {
		try {
			await axios.get(
				`${
					import.meta.env.VITE_API_URL
				}/scrapeTabela?ano=${ano}&serie=${serie}`
			);
		} catch (error) {
			console.error("Error running Python script:", error);
		}
	}

	try {
		const response = await axios.get(
			`${
				import.meta.env.VITE_API_URL
			}/getTabelas?ano=${ano}&serie=${serie}`
		);
		return response.data.tabelas[0];
	} catch (error) {
		console.error("Error fetching tabelas:", error);
		return null;
	}
};
