const { Model, DataTypes } = require("sequelize");
const beforeSaveHook = require("../utils/model-hook");
const { USER_PROFILE_ENUM } = require("../enums");

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        document: DataTypes.STRING,
        phone: DataTypes.STRING,
        manager_name: DataTypes.STRING,
        date_of_birth: DataTypes.STRING,
        profile: DataTypes.ENUM(...Object.values(USER_PROFILE_ENUM)),
        password: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: User.name,
      }
    );

    this.addHook("beforeSave", beforeSaveHook);
  }
}

module.exports = User;
