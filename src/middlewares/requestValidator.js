// src/middlewares/requestValidator.js
const { validationResult } = require('express-validator');

/**
 * Middleware para checar e lidar com erros de validação do express-validator.
 * Retorna apenas o primeiro erro de cada campo (path), para evitar duplicidade.
 * Garante compatibilidade com testes que esperam 'param' ao invés de 'path'.
 * @param {import('express').Request} req - O objeto de requisição.
 * @param {import('express').Response} res - O objeto de resposta.
 * @param {import('express').NextFunction} next - A próxima função de middleware.
 * @returns {void}
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Prioriza erros 'is required' para cada campo
    const seen = new Set();
    const uniqueErrors = errors
      .array()
      .sort((a, b) => {
        // 'is required' vem antes de 'must be a string'
        if (a.msg.includes('is required') && !b.msg.includes('is required')) return -1;
        if (!a.msg.includes('is required') && b.msg.includes('is required')) return 1;
        return 0;
      })
      .filter((err) => {
        const key = err.path || err.param;
        if (!seen.has(key)) {
          seen.add(key);
          return true;
        }
        return false;
      })
      .map((err) => ({ ...err, param: err.path || err.param }));
    return res.status(400).json({ errors: uniqueErrors });
  }
  return next();
};

module.exports = validate;
