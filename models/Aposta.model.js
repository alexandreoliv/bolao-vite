const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const apostaSchema = new Schema({
	ano: Number,
	serie: String,
	nome: String,
	aposta: [Number],
});

const Aposta = mongoose.model("Aposta", apostaSchema);

module.exports = Aposta;
