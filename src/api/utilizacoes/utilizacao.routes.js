const express = require('express');
const { body, param } = require('express-validator'); // validationResult removido daqui
const utilizacaoController = require('./utilizacao.controller');
const validate = require('../../middlewares/requestValidator'); // Importar o middleware compartilhado

const router = express.Router();

// Define validation rules for starting a utilizacao (request body)
const iniciarUtilizacaoBodyValidationRules = [
  body('motoristaId')
    .isString().withMessage('motoristaId must be a string')
    .notEmpty().withMessage('motoristaId is required')
    .isUUID().withMessage('motoristaId deve ser um UUID válido'),
  body('automovelId')
    .isString().withMessage('automovelId must be a string')
    .notEmpty().withMessage('automovelId is required')
    .isUUID().withMessage('automovelId deve ser um UUID válido'),
  body('motivoUtilizacao')
    .isString().withMessage('motivoUtilizacao must be a string')
    .notEmpty().withMessage('motivoUtilizacao is required'),
];

// Define validation rules for ID in path parameters for finalizacao
const utilizacaoIdParamValidationRules = [
  param('id').isUUID().withMessage('ID da utilização deve ser um UUID válido'),
];

// Utilizacao routes
router.post(
  '/',
  iniciarUtilizacaoBodyValidationRules,
  validate,
  utilizacaoController.handleIniciarUtilizacao
);

router.get('/', utilizacaoController.handleListarUtilizacoes); // Não há validação de query params aqui por enquanto

router.patch(
  '/:id/finalizar',
  utilizacaoIdParamValidationRules,
  validate,
  utilizacaoController.handleFinalizarUtilizacao
);

module.exports = router;
