const { checkRequiredFieldsBody, checkRequiredFieldsParams } = require("../utils/required-fields");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const KEY_ID = "email";
const NAME_ENTITY = "Usuário";

module.exports = {
  async listUsers(req, res) {
    try {
      const { profile } = req.params;

      const whereCondition = profile ? { profile } : {};

      const response = await User.findAll({
        where: whereCondition,
        attributes: {
          exclude: ["password"],
        },
      });

      if (!response || response.length == 0) {
        res.status(404).json({ message: `Não existe ${NAME_ENTITY}s cadastrados` });
      }
      res.status(200).json({ response, message: `${NAME_ENTITY}s encontrado` });
    } catch (error) {
      res.status(500).json({ error, message: "Internal Server Error" });
    }
  },

  async findUser(req, res) {
    const { id } = req.params;

    const requiredFields = ["id"];

    if (!checkRequiredFieldsParams(req, res, requiredFields)) {
      return;
    }

    const response = await User.findOne({
      where: { id },
      attributes: {
        exclude: ["password"],
      },
    });
    if (!response) {
      res.status(404).json({ message: `${NAME_ENTITY} não encontrado` });
    } else {
      res.status(200).json({ response, message: `${NAME_ENTITY} encontrado` });
    }
  },

  async createUser(req, res) {
    try {
      const {name, email, document, phone, manager_name, date_of_birth, profile, password } = req.body;

      const requiredFields = ["name", "email", "document", "phone", "manager_name", "date_of_birth", "profile", "password"];

      if (!checkRequiredFieldsBody(req, res, requiredFields)) {
        return;
      }

      const passwordHash = await generateHash(password);
      const responseEmail = await User.findOne({ where: { email } });
      const responseDocument = await User.findOne({ where: { document } });

      if (responseDocument) {
        res.status(404).json({ message: `Já existe um ${NAME_ENTITY} com este documento` });
      } else if (responseEmail) {
        res.status(404).json({ message: `Já existe um ${NAME_ENTITY} com este email` });
      } else {
        const response = await User.create({ name, email, document, phone, manager_name, date_of_birth, profile, password: passwordHash });
        response.password = undefined;
        res.status(200).json({ response, message: `${NAME_ENTITY} cadastrado` });
      }
    } catch (error) {
      res.status(500).json({ error, message: "Internal Server Error" });
    }
  },

  async changePassword(req, res) {
    try {
      const { id } = req.params;
      const { new_password } = req.body;

      const requiredFieldsParams = ["id"];
      const requiredFieldsBody = ["new_password"];

      if (!checkRequiredFieldsParams(req, res, requiredFieldsParams)) {
        return;
      }

      if (!checkRequiredFieldsBody(req, res, requiredFieldsBody)) {
        return;
      }

      const response = await User.findOne({ where: { id } });

      if (response) {
        const passwordHash = await generateHash(new_password);

        await User.update({ password: passwordHash }, { where: { id } });

        res.status(200).json({ response, message: `Senha foi alterada!` });
      } else {
        res.status(404).json({ response, message: `Usuário não encontrado` });
      }
    } catch (error) {
      res.status(500).json({ error, message: "Internal Server Error" });
    }
  },

  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { name, email, document, phone, manager_name, date_of_birth, profile } = req.body;

      const requiredFieldsParams = ["id"];
      const requiredFieldsBody = ["name", "email", "document", "phone", "manager_name", "date_of_birth"];

      if (!checkRequiredFieldsParams(req, res, requiredFieldsParams)) {
        return;
      }

      if (!checkRequiredFieldsBody(req, res, requiredFieldsBody)) {
        return;
      }

      const response = await User.findOne({ where: { id } });
      if (!response) {
        res.status(404).json({ message: `${NAME_ENTITY} não encontrado` });
      } else {
        await User.update({ name, email, document, phone, manager_name, date_of_birth, profile }, { where: { id } });
        const response = { id, name, email, document, phone, manager_name, date_of_birth, profile };
        res.status(200).json({ response, message: `${NAME_ENTITY} atualizado` });
      }
    } catch (error) {
      res.status(500).json({ error, message: "Internal Server Error" });
    }
  },

  async deleteUser(req, res) {
    const { id } = req.params;

    const requiredFields = ["id"];

    if (!checkRequiredFieldsParams(req, res, requiredFields)) {
      return;
    }

    const response = await User.findOne({ where: { id } });
    if (!response) {
      res.status(404).json({ message: `${NAME_ENTITY} não encontrado` });
    } else {
      await User.destroy({ where: { id } });
      res.status(200).json({ message: `${NAME_ENTITY} deletado` });
    }
  },
};

function generateHash(password) {
  return bcrypt.hash(password, bcrypt.genSaltSync(8));
}
