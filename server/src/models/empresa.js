import mongoose from "mongoose";

const empresaSchema = new mongoose.Schema({
    id:{type: mongoose.Schema.Types.ObjectId},
    email:{type:String, required:true},
    senha:{type:String, required:true},
    nome_da_empresa:{type:String, required:true},
    Cnpj:{type:String, required:true},
    cep:{type:String, required:true},
    numero:{type:String, required:true}
},{versionKey: false});

const empresa = mongoose.model("Registro", empresaSchema);

export default empresa