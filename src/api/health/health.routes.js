/**
 * @fileoverview Rotas para o health check.
 */
const express = require('express');
const healthController = require('./health.controller');

const router = express.Router();

router.get('/', healthController.handleHealthCheck);

module.exports = router;
