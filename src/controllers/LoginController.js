const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const NAME_ENTITY = "Usuário";
const secretKeyToken = process.env.SECRET_KEY_TOKEN;

function generateToken(user) {
  return jwt.sign({ user }, secretKeyToken, { expiresIn: "1h" });
}

module.exports = {
  async login(req, res) {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        res.status(401).json({ login: false, message: `${NAME_ENTITY} e senha inválidos.` });
      } else {
        const passwordValid = await bcrypt.compare(password, user.password);
        if (passwordValid) {
          const token = generateToken(user);
          const profile = user.profile;
          res.status(200).json({ login: true, profile, token, message: `${NAME_ENTITY} encontrado` });
        } else {
          res.status(401).json({ login: false, message: `${NAME_ENTITY} e senha inválidos.` });
        }
      }
    } catch (error) {
      res.status(400).json({ error, login: false, message: "Erro na requisição" });
    }
  },

  async logout(req, res) {
    res.status(200).json({ login: false, message: "Você saiu do sistema" });
  },
};
