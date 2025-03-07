const { v4: uuidv4 } = require("uuid");

const beforeSaveHook = async (data) => {
  data.id = uuidv4();
  return data;
};

module.exports = beforeSaveHook;
