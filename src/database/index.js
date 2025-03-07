const Sequelize = require("sequelize");
const configDatabase = require("../config/database");

// DOC: Add your models here
const User = require("../models/user");

const connection = new Sequelize(configDatabase);

// DOC: AQUI É ONDE ACONTECE A CONEXÃO COM O BANCO DE DADOS, ADICIONE AQUI OS MODELS QUE VOCÊ CRIAR
User.init(connection);

module.exports = connection;
