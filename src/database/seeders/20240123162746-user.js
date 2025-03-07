"use strict";
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const { USER_PROFILE_ENUM } = require("../../enums");

async function generateHash(password) {
  return String(await bcrypt.hash(password, bcrypt.genSaltSync(8)));
}

module.exports = {
  async up(queryInterface, Sequelize) {
    const password = await generateHash("1234");
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
          password,
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
