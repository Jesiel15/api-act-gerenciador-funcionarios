"use strict";
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const { USER_PROFILE_ENUM } = require("../../enums");

async function generateHash(password) {
  return String(await bcrypt.hash(password, bcrypt.genSaltSync(8)));
}

module.exports = {
  async up(queryInterface, Sequelize) {
    const password = await generateHash("*Test123");
    await queryInterface.bulkInsert(
      "User",
      [
        {
          id: uuidv4(),
          name: "User Admin",
          email: "admin@mail.com",
          document: "12345678900",
          phone: "12345678900",
          manager_name: "User Admin",
          date_of_birth: "1990-01-01",
          profile: USER_PROFILE_ENUM.MANAGER,
          password: password,
        },
        {
          id: uuidv4(),
          name: "José Silva",
          email: "jose.silva@gmail.com",
          document: "52998224725",
          phone: "61981898269",
          manager_name: "User Admin",
          date_of_birth: "1992-03-15",
          profile: USER_PROFILE_ENUM.EMPLOYEE,
          password: password,
        },
        {
          id: uuidv4(),
          name: "Carlos Almeida",
          email: "carlos.almeida@mail.com",
          document: "12345678909",
          phone: "11987651234",
          manager_name: "User Admin",
          date_of_birth: "1988-07-22",
          profile: USER_PROFILE_ENUM.EMPLOYEE,
          password: password,
        },
        {
          id: uuidv4(),
          name: "Mariana Costa",
          email: "mariana.costa@mail.com",
          document: "98765432100",
          phone: "62991237890",
          manager_name: "User Admin",
          date_of_birth: "1995-11-08",
          profile: USER_PROFILE_ENUM.EMPLOYEE,
          password: password,
        },
        {
          id: uuidv4(),
          name: "Roberto Lima",
          email: "roberto.lima@mail.com",
          document: "	01234567890",
          phone: "11984563219",
          manager_name: "User Admin",
          date_of_birth: "1985-05-30",
          profile: USER_PROFILE_ENUM.EMPLOYEE,
          password: password,
        },
        {
          id: uuidv4(),
          name: "Fernanda Souza",
          email: "fernanda.souza@mail.com",
          document: "	93748306040",
          phone: "61995274163",
          manager_name: "User Admin",
          date_of_birth: "1993-09-12",
          profile: USER_PROFILE_ENUM.EMPLOYEE,
          password: password,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
