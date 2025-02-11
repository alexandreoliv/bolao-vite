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

	return await axios
		.get(
			`${
				import.meta.env.VITE_API_URL
			}/getTabelas?ano=${ano}&serie=${serie}`
		)
		.then((response) => response.data.tabelas[0])
		.catch((error) => console.log(error));
};
