const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    const firstError = result.error.issues[0];

    return res.status(400).json({
      error: firstError.message,
    });
  }

  req.validatedBody = result.data;
  return next();
};
const validateParams = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.params);

  if (!result.success) {
    const firstError = result.error.issues[0];

    return res.status(400).json({
      error: firstError.message,
    });
  }

  req.validatedParams = result.data;
  return next();
};

const validateQuery = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.query);

  if (!result.success) {
    const firstError = result.error.issues[0];

    return res.status(400).json({
      error: firstError.message,
    });
  }

  req.validatedQuery = result.data;
  return next();
};

module.exports = { validate, validateParams, validateQuery };
