const motoristaService = require('./motorista.service');

/**
 * Manipulador para criar um novo motorista.
 * @param {object} req - O objeto de requisição Express.
 * @param {object} req.body - O corpo da requisição contendo os dados do motorista.
 * @param {string} req.body.nome - Nome do motorista.
 * @param {object} res - O objeto de resposta Express.
 * @param {function} next - A próxima função de middleware Express.
 * @returns {Promise<void>}
 */
const handleCriarMotorista = async (req, res, next) => {
  try {
    // Input validation will be handled by middleware (defined in routes/validation step)
    const motorista = await motoristaService.cadastrarNovoMotorista(req.body);
    res.status(201).json(motorista);
  } catch (err) {
    next(err); // Pass error to global error handler
  }
};

/**
 * Manipulador para listar todos os motoristas, com filtro opcional por nome.
 * @param {object} req - O objeto de requisição Express.
 * @param {object} req.query - Os parâmetros de query da requisição.
 * @param {string} [req.query.nome] - Filtro opcional por nome (parcial, case-insensitive).
 * @param {object} res - O objeto de resposta Express.
 * @param {function} next - A próxima função de middleware Express.
 * @returns {Promise<void>}
 */
const handleListarMotoristas = async (req, res, next) => {
  try {
    const { nome } = req.query; // Extract filter from query params
    const motoristas = await motoristaService.listarTodosMotoristas({ nome });
    res.status(200).json(motoristas);
  } catch (err) {
    next(err);
  }
};

/**
 * Manipulador para buscar um motorista específico pelo seu ID.
 * @param {object} req - O objeto de requisição Express.
 * @param {object} req.params - Os parâmetros da rota da requisição.
 * @param {string} req.params.id - O ID do motorista a ser buscado.
 * @param {object} res - O objeto de resposta Express.
 * @param {function} next - A próxima função de middleware Express.
 * @returns {Promise<void>}
 */
const handleBuscarMotoristaPorId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const motorista = await motoristaService.buscarMotoristaPorIdentificador(id);
    res.status(200).json(motorista);
  } catch (err) {
    next(err);
  }
};

/**
 * Manipulador para atualizar um motorista existente.
 * @param {object} req - O objeto de requisição Express.
 * @param {object} req.params - Os parâmetros da rota.
 * @param {string} req.params.id - O ID do motorista a ser atualizado.
 * @param {object} req.body - O corpo da requisição com os dados para atualização.
 * @param {string} [req.body.nome] - Novo nome do motorista.
 * @param {object} res - O objeto de resposta Express.
 * @param {function} next - A próxima função de middleware Express.
 * @returns {Promise<void>}
 */
const handleAtualizarMotorista = async (req, res, next) => {
  try {
    const { id } = req.params;
    const motoristaAtualizado = await motoristaService.atualizarDadosMotorista(id, req.body);
    res.status(200).json(motoristaAtualizado);
  } catch (err) {
    next(err);
  }
};

/**
 * Manipulador para deletar um motorista.
 * @param {object} req - O objeto de requisição Express.
 * @param {object} req.params - Os parâmetros da rota.
 * @param {string} req.params.id - O ID do motorista a ser deletado.
 * @param {object} res - O objeto de resposta Express.
 * @param {function} next - A próxima função de middleware Express.
 * @returns {Promise<void>}
 */
const handleDeletarMotorista = async (req, res, next) => {
  try {
    const { id } = req.params;
    await motoristaService.removerMotorista(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  handleCriarMotorista,
  handleListarMotoristas,
  handleBuscarMotoristaPorId,
  handleAtualizarMotorista,
  handleDeletarMotorista,
};
