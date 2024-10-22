import empresa from "../models/empresa.js"

class empresacontroller{
    static async listarempresa (req,res){
        try{
        const listarempresa = await empresa.find({});
        res.status(200).json(listarempresa);
        }catch (erro){
            res.status(500).json({message: `${erro.message} - Falha na requisição`})
        };
    };
    static async listarempresaPorId (req,res){
        try{
        const id = req.params.id
        const empresaencontrado = await empresa.findById(id);
        res.status(200).json(empresaencontrado );
        }catch (erro){
            res.status(500).json({message: `${erro.message} - Falha na requisição`})
        };
    };

    static async cadastrar(req,res){
        try{ 
        const novoempresa = await empresa.create(req.body);
        res.status(201).json({message: "Criado com sucesso", empresa: novoempresa});
        }catch(erro){
            res.status(500).json({message: `${erro.message} - falha ao cadastrar`});
        }
    }

    static async atualizarempresa (req,res){
        try{
        const id = req.params.id
        await empresa.findByIdAndUpdate(id, req.body);
        res.status(200).json({message: "cadaastro atualizado"} );
        }catch (erro){
            res.status(500).json({message: `${erro.message} - Falha ao atualizar`})
        };
    };
    static async excluirempresa (req,res){
        try{
        const id = req.params.id
        await empresa.findByIdAndDelete(id);
        res.status(200).json({message: "excluido com sucesso"} );
        }catch (erro){
            res.status(500).json({message: `${erro.message} - Falha ao excluir`})
        };
    };

}

export default empresacontroller