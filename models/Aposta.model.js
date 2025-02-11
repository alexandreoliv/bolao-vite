import mongoose from "mongoose";

const { Schema } = mongoose;

const apostaSchema = new Schema({
	ano: Number,
	serie: String,
	nome: String,
	aposta: [Number],
});

export const Aposta = mongoose.model("Aposta", apostaSchema);
