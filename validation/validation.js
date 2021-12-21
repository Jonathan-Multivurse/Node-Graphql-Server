const { CustomError } = require("../error/error");

const SchemaValidation = (Schema, Args) => {
  const SchemaValidate = Schema.validate(Args);
  if (SchemaValidate.error) {
    throw new CustomError(
      "BAD_INPUT",
      "SCHEMA_INVALID",
      SchemaValidate.error.details[0].message
    );
  }
};

module.exports = { SchemaValidation };
