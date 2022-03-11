const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (error) {
    const [status, message] = error.message.split('|');

    return res.status(status).json({ message });
  }

  next();
};

module.exports = validate;
