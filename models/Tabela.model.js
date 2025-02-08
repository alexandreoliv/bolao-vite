const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tabelaSchema = new Schema({
	ano: Number,
	serie: String,
	equipes: [String],
	posicoes: [Number],
});

const Tabela = mongoose.model("Tabela", tabelaSchema);

module.exports = Tabela;
