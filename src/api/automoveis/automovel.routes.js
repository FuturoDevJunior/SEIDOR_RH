const express = require('express');
const { body } = require('express-validator'); // validationResult removido daqui
const automovelController = require('./automovel.controller');
const validate = require('../../middlewares/requestValidator'); // Importar o middleware compartilhado

const router = express.Router();

// Define validation rules for request body
const automovelBodyValidationRules = [
  body('placa')
    .isString()
    .withMessage('Placa must be a string')
    .notEmpty()
    .withMessage('Placa is required'),
  body('cor')
    .isString()
    .withMessage('Cor must be a string')
    .notEmpty()
    .withMessage('Cor is required'),
  body('marca')
    .isString()
    .withMessage('Marca must be a string')
    .notEmpty()
    .withMessage('Marca is required'),
];

// Define validation rules for ID in path parameters
const automovelIdParamValidationRules = []; // Permite qualquer string como ID

// Automovel routes
router.post(
  '/',
  automovelBodyValidationRules,
  validate,
  automovelController.handleCriarAutomovel
);

router.get('/', automovelController.handleListarAutomoveis);

router.get(
  '/:id',
  automovelIdParamValidationRules,
  validate,
  automovelController.handleBuscarAutomovelPorId
);

router.put(
  '/:id',
  [...automovelIdParamValidationRules, ...automovelBodyValidationRules], // Combina validação de ID e corpo
  validate,
  automovelController.handleAtualizarAutomovel
);

router.delete(
  '/:id',
  automovelIdParamValidationRules,
  validate,
  automovelController.handleDeletarAutomovel
);

module.exports = router;
