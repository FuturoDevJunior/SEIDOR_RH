/**
 * @fileoverview Controller para o endpoint de health check.
 */

/**
 * Lida com a requisição de health check.
 * @param {import('express').Request} req - O objeto de requisição do Express.
 * @param {import('express').Response} res - O objeto de resposta do Express.
 * @param {import('express').NextFunction} next - A próxima função de middleware.
 */
const handleHealthCheck = (req, res, next) => {
  try {
    res.status(200).json({
      status: 'UP',
      timestamp: new Date().toISOString(),
      message: 'Aplicação está operacional.',
    });
  } catch (error) {
    // Embora improvável para este handler simples, é uma boa prática.
    next(error); 
  }
};

module.exports = {
  handleHealthCheck,
};
