import { getTabela } from "./getTabela";
import { getApostas } from "./getApostas";
import { getClassificacao } from "./getClassificacao";
import { getDistancia } from "./getDistancia";

export const getData = async (ano, serie) => {
	const tabela = await getTabela(ano, serie);

	const { apostasColumns, apostasData, keys } = await getApostas(
		ano,
		serie,
		tabela
	);

	const { classificacaoColumns, classificacaoData } = getClassificacao(
		keys,
		apostasData
	);

	const { distanciaColumns, distanciaData } = getDistancia(keys, apostasData);

	return {
		ano,
		serie,
		apostasColumns,
		apostasData,
		classificacaoColumns,
		classificacaoData,
		distanciaColumns,
		distanciaData,
		keys,
		tabela,
	};
};
