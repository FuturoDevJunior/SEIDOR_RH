const automovelService = require('./automovel.service');
// const AppError = require('../../utils/AppError'); // Not strictly needed here if service handles errors properly

/**
 * Manipulador para criar um novo automóvel.
 * @param {object} req - O objeto de requisição Express.
 * @param {object} req.body - O corpo da requisição contendo os dados do automóvel.
 * @param {string} req.body.placa - Placa do automóvel.
 * @param {string} req.body.cor - Cor do automóvel.
 * @param {string} req.body.marca - Marca do automóvel.
 * @param {object} res - O objeto de resposta Express.
 * @param {function} next - A próxima função de middleware Express.
 * @returns {Promise<void>}
 */
const handleCriarAutomovel = async (req, res, next) => {
  try {
    // Input validation will be handled by middleware defined in routes/validation step
    const automovel = await automovelService.cadastrarNovoAutomovel(req.body);
    res.status(201).json(automovel);
  } catch (err) {
    next(err); // Pass error to global error handler
  }
};

/**
 * Manipulador para listar todos os automóveis, com filtros opcionais.
 * @param {object} req - O objeto de requisição Express.
 * @param {object} req.query - Os parâmetros de query da requisição.
 * @param {string} [req.query.cor] - Filtro opcional por cor.
 * @param {string} [req.query.marca] - Filtro opcional por marca.
 * @param {object} res - O objeto de resposta Express.
 * @param {function} next - A próxima função de middleware Express.
 * @returns {Promise<void>}
 */
const handleListarAutomoveis = async (req, res, next) => {
  try {
    const { cor, marca } = req.query; // Extract filters from query params
    const automoveis = await automovelService.listarTodosAutomoveis({ cor, marca });
    res.status(200).json(automoveis);
  } catch (err) {
    next(err);
  }
};

/**
 * Manipulador para buscar um automóvel específico pelo seu ID.
 * @param {object} req - O objeto de requisição Express.
 * @param {object} req.params - Os parâmetros da rota da requisição.
 * @param {string} req.params.id - O ID do automóvel a ser buscado.
 * @param {object} res - O objeto de resposta Express.
 * @param {function} next - A próxima função de middleware Express.
 * @returns {Promise<void>}
 */
const handleBuscarAutomovelPorId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const automovel = await automovelService.buscarAutomovelPorIdentificador(id);
    res.status(200).json(automovel);
  } catch (err) {
    next(err);
  }
};

/**
 * Manipulador para atualizar um automóvel existente.
 * @param {object} req - O objeto de requisição Express.
 * @param {object} req.params - Os parâmetros da rota.
 * @param {string} req.params.id - O ID do automóvel a ser atualizado.
 * @param {object} req.body - O corpo da requisição com os dados para atualização.
 * @param {string} [req.body.placa] - Nova placa.
 * @param {string} [req.body.cor] - Nova cor.
 * @param {string} [req.body.marca] - Nova marca.
 * @param {object} res - O objeto de resposta Express.
 * @param {function} next - A próxima função de middleware Express.
 * @returns {Promise<void>}
 */
const handleAtualizarAutomovel = async (req, res, next) => {
  try {
    const { id } = req.params;
    const automovelAtualizado = await automovelService.atualizarDadosAutomovel(id, req.body);
    res.status(200).json(automovelAtualizado);
  } catch (err) {
    next(err);
  }
};

/**
 * Manipulador para deletar um automóvel.
 * @param {object} req - O objeto de requisição Express.
 * @param {object} req.params - Os parâmetros da rota.
 * @param {string} req.params.id - O ID do automóvel a ser deletado.
 * @param {object} res - O objeto de resposta Express.
 * @param {function} next - A próxima função de middleware Express.
 * @returns {Promise<void>}
 */
const handleDeletarAutomovel = async (req, res, next) => {
  try {
    const { id } = req.params;
    await automovelService.removerAutomovel(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  handleCriarAutomovel,
  handleListarAutomoveis,
  handleBuscarAutomovelPorId,
  handleAtualizarAutomovel,
  handleDeletarAutomovel,
};
