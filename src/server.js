const express = require("express");
const path = require("path");
require('dotenv').config();
const cors = require("cors");
const { OpenAI } = require("openai");

const app = express();

app.use(express.json());
app.use(cors());

const openai = new OpenAI({ key: process.env.OPENAI_API_KEY });

// Configurar middleware para servir arquivos estáticos do React
app.use(express.static(path.join(__dirname, "build")));

// Rota para a página inicial
// Rota para a página inicial
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Rota para a API de chat
app.post("/chat", async (req, res) => {
  try {
    const { mensagemUsuario } = req.body;
    const response = await openai.complete({
      engine: "text-davinci-003",
      prompt: mensagemUsuario,
      max_tokens: 2048,
    });

    res.send(response.choices[0].text);
  } catch (error) {
    console.error("Erro durante a solicitação para a API OpenAI:", error.message);
    res.status(500).send("Erro interno do servidor");
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor em execução na porta ${port}`);
});
