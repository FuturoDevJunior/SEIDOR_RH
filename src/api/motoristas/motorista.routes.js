const express = require('express');
const { body } = require('express-validator'); // validationResult removido daqui
const motoristaController = require('./motorista.controller');
const validate = require('../../middlewares/requestValidator'); // Importar o middleware compartilhado

const router = express.Router();

// Define validation rules for request body
const motoristaBodyValidationRules = [
  body('nome')
    .isString()
    .withMessage('Nome must be a string')
    .notEmpty()
    .withMessage('Nome is required'),
];

// Define validation rules for ID in path parameters
const motoristaIdParamValidationRules = []; // Permite qualquer string como ID

// Motorista routes
router.post(
  '/',
  motoristaBodyValidationRules,
  validate,
  motoristaController.handleCriarMotorista
);

router.get('/', motoristaController.handleListarMotoristas);

router.get(
  '/:id',
  motoristaIdParamValidationRules,
  validate,
  motoristaController.handleBuscarMotoristaPorId
);

router.put(
  '/:id',
  [...motoristaIdParamValidationRules, ...motoristaBodyValidationRules], // Combina validação de ID e corpo
  validate,
  motoristaController.handleAtualizarMotorista
);

router.delete(
  '/:id',
  motoristaIdParamValidationRules,
  validate,
  motoristaController.handleDeletarMotorista
);

module.exports = router;
