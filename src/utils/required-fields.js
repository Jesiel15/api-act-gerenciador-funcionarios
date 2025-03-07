function checkRequiredFieldsBody(req, res, requiredFields) {
  const missingFields = [];

  requiredFields.forEach((field) => {
    if (!req.body[field] && typeof req.body[field] !== 'boolean') {
      missingFields.push(field);
    }
  });

  if (missingFields.length > 0) {
    const errorMessage = `Campos BODY faltando: ${missingFields.join(", ")}`;
    res.status(404).json({ response: [], message: errorMessage });
    return false;
  }

  return true;
}

function checkRequiredFieldsParams(req, res, requiredFields) {
  const missingFields = [];

  requiredFields.forEach((field) => {
    if (!req.params[field]) {
      missingFields.push(field);
    }
  });

  if (missingFields.length > 0) {
    const errorMessage = `Campos PARAMS faltando: ${missingFields.join(", ")}`;
    res.status(404).json({ response: [], message: errorMessage });
    return false;
  }

  return true;
}

module.exports = { checkRequiredFieldsBody, checkRequiredFieldsParams };
