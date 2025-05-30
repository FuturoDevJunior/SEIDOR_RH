const utilizacaoService = require('./utilizacao.service');

/**
 * Manipulador para iniciar uma nova utilização de automóvel.
 * @param {object} req - O objeto de requisição Express.
 * @param {object} req.body - O corpo da requisição.
 * @param {string} req.body.motoristaId - ID do motorista.
 * @param {string} req.body.automovelId - ID do automóvel.
 * @param {string} req.body.motivoUtilizacao - Motivo da utilização.
 * @param {object} res - O objeto de resposta Express.
 * @param {function} next - A próxima função de middleware Express.
 * @returns {Promise<void>}
 */
const handleIniciarUtilizacao = async (req, res, next) => {
  try {
    // Input validation will be handled by middleware (defined in routes/validation step)
    const { motoristaId, automovelId, motivoUtilizacao } = req.body;
    const utilizacao = await utilizacaoService.iniciarUtilizacaoAutomovel({
      motoristaId,
      automovelId,
      motivoUtilizacao,
    });
    res.status(201).json(utilizacao);
  } catch (err) {
    next(err); // Pass error to global error handler
  }
};

/**
 * Manipulador para finalizar uma utilização de automóvel existente.
 * @param {object} req - O objeto de requisição Express.
 * @param {object} req.params - Os parâmetros da rota.
 * @param {string} req.params.id - O ID do registro de utilização a ser finalizado.
 * @param {object} res - O objeto de resposta Express.
 * @param {function} next - A próxima função de middleware Express.
 * @returns {Promise<void>}
 */
const handleFinalizarUtilizacao = async (req, res, next) => {
  try {
    const { id } = req.params; // This 'id' is the utilizacaoId
    const utilizacao = await utilizacaoService.finalizarUtilizacaoAutomovel(id);
    res.status(200).json(utilizacao);
  } catch (err) {
    next(err);
  }
};

/**
 * Lida com a requisição para listar todos os registros de utilização, com suporte a paginação.
 * @param {import('express').Request} req - O objeto de requisição do Express. Query params opcionais: page, limit.
 * @param {import('express').Response} res - O objeto de resposta do Express.
 * @param {import('express').NextFunction} next - A próxima função de middleware.
 */
const handleListarUtilizacoes = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const paginatedResult = await utilizacaoService.listarRegistrosDeUtilizacao({ page, limit });
    res.status(200).json(paginatedResult);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  handleIniciarUtilizacao,
  handleFinalizarUtilizacao,
  handleListarUtilizacoes,
};
