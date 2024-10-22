import mongoose from "mongoose";

const pratoSchema = new mongoose.Schema({
    id:{type: mongoose.Schema.Types.ObjectId},
    nome_do_prato:{type:String, required:true},
    igredientes:{type:Array, required:true},
},{versionKey: false});

const Registro = mongoose.model("Registro", cadastroSchema);

export default Registro