import mongoose from "mongoose";

const { Schema } = mongoose;

const tabelaSchema = new Schema({
	ano: Number,
	serie: String,
	equipes: [String],
	posicoes: [Number],
});

export const Tabela = mongoose.model("Tabela", tabelaSchema);
