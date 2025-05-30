const AppError = require('../utils/AppError');

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // Log to console for dev
  // eslint-disable-next-line no-console
  console.error('ERROR 💥', err);

  // Se for AppError com status 404, garantir status 404
  if (err.isOperational && err.statusCode === 404) {
    return res.status(404).json({
      status: err.status,
      message: err.message,
    });
  }

  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  // Programming or other unknown error: don't leak error details
  // 1) Log error
  // eslint-disable-next-line no-console
  console.error('ERROR 💥 (Non-operational):', err);

  // 2) Send generic message
  return res.status(500).json({
    status: 'error',
    message: 'Something went very wrong!',
  });
};

module.exports = errorHandler;
