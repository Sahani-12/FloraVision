export const validate = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params
    });
    next();
  } catch (error) {
    const errorMessages = error.errors
      ? error.errors.map((err) => `${err.path.join('.')}: ${err.message}`).join(', ')
      : error.message;

    return res.status(400).json({
      success: false,
      message: `Validation Error: ${errorMessages}`
    });
  }
};
