const motoristaRepository = require('./motorista.repository');
const AppError = require('../../utils/AppError');

/**
 * Cadastra um novo motorista.
 * @async // Marcado como async para alinhamento com futuras implementações de banco de dados.
 * @param {object} dadosMotorista - Dados do motorista a ser cadastrado.
 * @param {string} dadosMotorista.nome - Nome do motorista.
 * @returns {Promise<object>} O motorista recém-cadastrado.
 */
const cadastrarNovoMotorista = async (dadosMotorista) => {
  // Placeholder for any specific business logic before creation
  return await motoristaRepository.criarMotorista(dadosMotorista);
};

/**
 * Lista todos os motoristas, aplicando filtros opcionais.
 * @async // Marcado como async para alinhamento com futuras implementações de banco de dados.
 * @param {object} [filtros] - Filtros para a listagem.
 * @param {string} [filtros.nome] - Nome (ou parte do nome) para filtrar.
 * @returns {Promise<Array<object>>} Uma lista de motoristas.
 */
const listarTodosMotoristas = async (filtros) => {
  return await motoristaRepository.listarMotoristas(filtros);
};

/**
 * Busca um motorista por seu identificador único.
 * Lança um erro se o motorista não for encontrado.
 * @async // Marcado como async para alinhamento com futuras implementações de banco de dados.
 * @param {string} id - O ID do motorista.
 * @returns {Promise<object>} O objeto do motorista encontrado.
 * @throws {AppError} Se o motorista não for encontrado (status 404).
 */
const buscarMotoristaPorIdentificador = async (id) => {
  const motorista = await motoristaRepository.buscarMotoristaPorId(id);
  if (!motorista) {
    throw new AppError('Motorista não encontrado', 404);
  }
  return motorista;
};

/**
 * Atualiza os dados de um motorista existente.
 * Lança um erro se o motorista a ser atualizado não for encontrado.
 * @async // Marcado como async para alinhamento com futuras implementações de banco de dados.
 * @param {string} id - O ID do motorista a ser atualizado.
 * @param {object} dadosMotorista - Dados a serem atualizados.
 * @param {string} [dadosMotorista.nome] - Novo nome do motorista.
 * @returns {Promise<object>} O motorista atualizado.
 * @throws {AppError} Se o motorista não for encontrado para atualização (status 404) ou se a atualização falhar (status 500).
 */
const atualizarDadosMotorista = async (id, dadosMotorista) => {
  const motoristaExistente = await motoristaRepository.buscarMotoristaPorId(id);
  if (!motoristaExistente) {
    throw new AppError('Motorista não encontrado para atualização', 404);
  }

  const motoristaAtualizado = await motoristaRepository.atualizarMotorista(id, dadosMotorista);
  if (!motoristaAtualizado) {
    // This case implies an issue if the prior check passed, possibly a race condition in a real DB
    // For in-memory, this is more of a defensive check.
    throw new AppError('Falha ao atualizar dados do motorista', 500);
  }
  return motoristaAtualizado;
};

/**
 * Remove um motorista do sistema.
 * Lança um erro se o motorista a ser removido não for encontrado.
 * @async // Marcado como async para alinhamento com futuras implementações de banco de dados.
 * @param {string} id - O ID do motorista a ser removido.
 * @returns {Promise<boolean>} True se a remoção for bem-sucedida.
 * @throws {AppError} Se o motorista não for encontrado para remoção (status 404) ou se a remoção falhar (status 500).
 */
const removerMotorista = async (id) => {
  const motoristaExistente = await motoristaRepository.buscarMotoristaPorId(id);
  if (!motoristaExistente) {
    throw new AppError('Motorista não encontrado para remoção', 404);
  }

  const deletado = await motoristaRepository.deletarMotorista(id);
  if (!deletado) {
    // Similar to update, this is a defensive check for in-memory.
    throw new AppError('Falha ao remover motorista', 500);
  }
  return true; // Or no return if controller handles 204 response directly
};

module.exports = {
  cadastrarNovoMotorista,
  listarTodosMotoristas,
  buscarMotoristaPorIdentificador,
  atualizarDadosMotorista,
  removerMotorista,
};
