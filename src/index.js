const express = require("express");
const path = require("path");
const cors = require("cors");

require("dotenv").config();

const routes = require("./routes");

const app = express();

const port = process.env.PORT || 3030;

require("./database");
require("./enums");

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Configurar a pasta 'uploads' como pública para servir arquivos estáticos
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Use as rotas definidas
app.use(routes);

app.listen(port, () => {
  console.info(`A aplicação rodando na porta: ${port}`);
});