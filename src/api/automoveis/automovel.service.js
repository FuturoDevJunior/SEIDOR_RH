const automovelRepository = require('./automovel.repository');
const AppError = require('../../utils/AppError');

/**
 * Cadastra um novo automóvel.
 * @async // Marcado como async para alinhamento com futuras implementações de banco de dados.
 * @param {object} dadosAutomovel - Dados do automóvel a ser cadastrado.
 * @param {string} dadosAutomovel.placa - Placa do automóvel.
 * @param {string} dadosAutomovel.cor - Cor do automóvel.
 * @param {string} dadosAutomovel.marca - Marca do automóvel.
 * @returns {Promise<object>} O automóvel recém-cadastrado.
 */
const cadastrarNovoAutomovel = async (dadosAutomovel) => {
  // Optional: Add any business logic or validation here if needed
  // For example, check for duplicate license plates if that were a rule.
  return automovelRepository.criarAutomovel(dadosAutomovel);
};

/**
 * Lista todos os automóveis, aplicando filtros opcionais.
 * @async // Marcado como async para alinhamento com futuras implementações de banco de dados.
 * @param {object} [filtros] - Filtros para a listagem (e.g., cor, marca).
 * @param {string} [filtros.cor] - Cor para filtrar.
 * @param {string} [filtros.marca] - Marca para filtrar.
 * @returns {Promise<Array<object>>} Uma lista de automóveis.
 */
const listarTodosAutomoveis = async (filtros) => {
  return automovelRepository.listarAutomoveis(filtros);
};

/**
 * Busca um automóvel por seu identificador único.
 * Lança um erro se o automóvel não for encontrado.
 * @async // Marcado como async para alinhamento com futuras implementações de banco de dados.
 * @param {string} id - O ID do automóvel.
 * @returns {Promise<object>} O objeto do automóvel encontrado.
 * @throws {AppError} Se o automóvel não for encontrado (status 404).
 */
const buscarAutomovelPorIdentificador = async (id) => {
  const automovel = await automovelRepository.buscarAutomovelPorId(id);
  if (!automovel) {
    throw new AppError('Automóvel não encontrado', 404);
  }
  return automovel;
};

/**
 * Atualiza os dados de um automóvel existente.
 * Lança um erro se o automóvel a ser atualizado não for encontrado.
 * @async // Marcado como async para alinhamento com futuras implementações de banco de dados.
 * @param {string} id - O ID do automóvel a ser atualizado.
 * @param {object} dadosAutomovel - Dados a serem atualizados.
 * @param {string} [dadosAutomovel.placa] - Nova placa.
 * @param {string} [dadosAutomovel.cor] - Nova cor.
 * @param {string} [dadosAutomovel.marca] - Nova marca.
 * @returns {Promise<object>} O automóvel atualizado.
 * @throws {AppError} Se o automóvel não for encontrado para atualização (status 404) ou se a atualização falhar (status 500).
 */
const atualizarDadosAutomovel = async (id, dadosAutomovel) => {
  // First, check if the automovel exists
  const automovelExistente = await automovelRepository.buscarAutomovelPorId(id);
  if (!automovelExistente) {
    throw new AppError('Automóvel não encontrado para atualização', 404);
  }

  const automovelAtualizado = await automovelRepository.atualizarAutomovel(id, dadosAutomovel);
  // The repository's update logic already handles non-existent ID,
  // but checking first in service allows for a more specific error or pre-update logic.
  // If for some reason it still returned null (e.g., race condition if not in-memory),
  // this would be an additional safeguard, though less likely with current setup.
  if (!automovelAtualizado) {
    // This case should ideally not be reached if automovelExistente check passed
    throw new AppError('Falha ao atualizar automóvel', 500);
  }
  return automovelAtualizado;
};

/**
 * Remove um automóvel do sistema.
 * Lança um erro se o automóvel a ser removido não for encontrado.
 * @async // Marcado como async para alinhamento com futuras implementações de banco de dados.
 * @param {string} id - O ID do automóvel a ser removido.
 * @returns {Promise<boolean>} True se a remoção for bem-sucedida.
 * @throws {AppError} Se o automóvel não for encontrado para remoção (status 404) ou se a remoção falhar (status 500).
 */
const removerAutomovel = async (id) => {
  const automovelExistente = await automovelRepository.buscarAutomovelPorId(id);
  if (!automovelExistente) {
    throw new AppError('Automóvel não encontrado para remoção', 404);
  }

  const deletado = await automovelRepository.deletarAutomovel(id);
  if (!deletado) {
    // This case should ideally not be reached if automovelExistente check passed
    throw new AppError('Falha ao remover automóvel', 500);
  }
  // No content is usually returned by controller, so service might not return anything or just true
  return true;
};

module.exports = {
  cadastrarNovoAutomovel,
  listarTodosAutomoveis,
  buscarAutomovelPorIdentificador,
  atualizarDadosAutomovel,
  removerAutomovel,
};
