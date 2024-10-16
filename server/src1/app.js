import express from "express";

const app = express();
app.use(express.json());

const cadastros = [{
    id:1,
    login:"jorge",
    senha:"123"
},
{
    id:2,
    login:"clovis",
    senha:"321"
}
]

function pegausuario(id){
    return cadastros.findIndex(cadastros=>{ return cadastros.id === Number(id);})
}

app.get ("/", (req, res) =>{
    res.status(200).send("curso de Node.js");
});
app.get ("/cadastro", (req, res) =>{
    res.status(200).send("cadastro.js");
});

app.get("/users", (req, res) =>{
    res.status(200).json(cadastros)
}
)

app.get("/users/:id",(req, res) => {
    const index = pegausuario(req.params.id);
    res.status(200).json(cadastros[index])
})

app.post("/users", (req, res) => {
    cadastros.push(req.body);
    res.status(201).send("cadastrado com sucesso")
})

app.put("/users/:id",(req, res) => {
    const index = pegausuario(req.params.id);
    cadastros[index].login = req.body.login;
    res.status(200).json(cadastros);
})

export default app;