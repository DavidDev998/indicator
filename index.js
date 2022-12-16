const express = require("express");
const app = express();
const port = 3000;

const bp = require("body-parser");

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

const empresaController = require("./src/controller/empresa");
const indicacoesController = require("./src/controller/indicacao");

app.get("/", async (req, res) => {
	const empresas = await empresaController.returnAll();
	const indicacoes = await indicacoesController.returnAll();
	res.render("mapa", { empresas: empresas, indicacoes: indicacoes });
});

app.get("/empresa", empresaController.getAll);

app.get("/empresa/:id", empresaController.getOne);

app.post("/empresa", empresaController.create);

app.put("/empresa/:id", empresaController.update);

app.delete("/empresa/:id", empresaController.delete);

app.listen(port, () => {
	console.log(`App rodando na porta ${port}`);
});
