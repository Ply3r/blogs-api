const error = (err, _req, res, _next) => {
  const status = err.status || 500;

  return res.status(status).json({ message: err.message });
};

module.exports = error;
