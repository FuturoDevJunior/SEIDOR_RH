const utilizacaoRepository = require('./utilizacao.repository');
const automovelRepository = require('../automoveis/automovel.repository');
const motoristaRepository = require('../motoristas/motorista.repository');
const AppError = require('../../utils/AppError');

/**
 * Inicia a utilização de um automóvel por um motorista.
 * Realiza validações para garantir que o motorista e o automóvel existem e estão disponíveis.
 * @async
 * @param {object} dados - Dados para iniciar a utilização.
 * @param {string} dados.motoristaId - ID do motorista.
 * @param {string} dados.automovelId - ID do automóvel.
 * @param {string} dados.motivoUtilizacao - Motivo da utilização.
 * @returns {Promise<object>} O registro da nova utilização criada.
 * @throws {AppError} Se o motorista ou automóvel não for encontrado (404).
 * @throws {AppError} Se o automóvel já estiver em utilização (409).
 * @throws {AppError} Se o motorista já estiver utilizando outro automóvel (409).
 */
const iniciarUtilizacaoAutomovel = async ({ motoristaId, automovelId, motivoUtilizacao }) => {
  // Validate motoristaId
  const motorista = await motoristaRepository.buscarMotoristaPorId(motoristaId);
  if (!motorista) {
    throw new AppError('Motorista não encontrado', 404);
  }

  // Validate automovelId
  const automovel = await automovelRepository.buscarAutomovelPorId(automovelId);
  if (!automovel) {
    throw new AppError('Automóvel não encontrado', 404);
  }

  // Rule 1: Check if automovel is already in use
  const automovelEmUso = await utilizacaoRepository.buscarUtilizacaoAtivaPorAutomovelId(automovelId);
  if (automovelEmUso) {
    throw new AppError('Automóvel já em utilização', 409); // 409 Conflict
  }

  // Rule 2: Check if motorista is already using another automovel
  const motoristaEmUso = await utilizacaoRepository.buscarUtilizacaoAtivaPorMotoristaId(motoristaId);
  if (motoristaEmUso) {
    throw new AppError('Motorista já utilizando outro automóvel', 409); // 409 Conflict
  }

  const dadosNovaUtilizacao = {
    motoristaId,
    automovelId,
    dataInicio: new Date().toISOString(),
    motivoUtilizacao,
    // dataFim is null by default in repository
  };

  const novaUtilizacao = await utilizacaoRepository.criarUtilizacao(dadosNovaUtilizacao);
  return novaUtilizacao;
};

/**
 * Finaliza um registro de utilização de automóvel existente.
 * @async
 * @param {string} utilizacaoId - O ID do registro de utilização a ser finalizado.
 * @returns {Promise<object>} O registro da utilização atualizado com a data de fim.
 * @throws {AppError} Se o registro de utilização não for encontrado (404).
 * @throws {AppError} Se a utilização já estiver finalizada (400).
 * @throws {AppError} Se houver uma falha ao atualizar o registro (500).
 */
const finalizarUtilizacaoAutomovel = async (utilizacaoId) => {
  const utilizacao = await utilizacaoRepository.buscarUtilizacaoPorId(utilizacaoId);
  if (!utilizacao) {
    throw new AppError('Registro de utilização não encontrado', 404);
  }

  if (utilizacao.dataFim !== null) {
    throw new AppError('Utilização já finalizada', 400); // 400 Bad Request
  }

  const dadosAtualizacao = {
    dataFim: new Date().toISOString(),
  };

  const utilizacaoAtualizada = await utilizacaoRepository.atualizarUtilizacao(utilizacaoId, dadosAtualizacao);
  if (!utilizacaoAtualizada) {
    // Should not happen if previous checks passed, but as a safeguard
    throw new AppError('Falha ao finalizar utilização', 500);
  }
  return utilizacaoAtualizada;
};

/**
 * Popula os detalhes do motorista e do automóvel para um único registro de utilização.
 * Função auxiliar para `listarRegistrosDeUtilizacao`.
 * @async
 * @private
 * @param {object} utilizacao - O registro de utilização a ser populado.
 * @returns {Promise<object>} O registro de utilização com detalhes de motorista e automóvel.
 */
const _popularDetalhesUtilizacao = async (utilizacao) => {
  const motorista = await motoristaRepository.buscarMotoristaPorId(utilizacao.motoristaId);
  const automovel = await automovelRepository.buscarAutomovelPorId(utilizacao.automovelId);
  return {
    ...utilizacao,
    motorista: motorista ? { id: motorista.id, nome: motorista.nome } : null,
    automovel: automovel ? { id: automovel.id, placa: automovel.placa, marca: automovel.marca, cor: automovel.cor } : null,
  };
};

/**
 * Lista todos os registros de utilização, populando detalhes do motorista e do automóvel.
 * @async
 * @returns {Promise<Array<object>>} Uma lista de registros de utilização, cada um contendo:
 * - `id` {string} ID da utilização.
 * - `motoristaId` {string} ID do motorista.
 * - `automovelId` {string} ID do automóvel.
 * - `dataInicio` {string} Data de início (ISO String).
 * - `dataFim` {string | null} Data de fim (ISO String) ou null se ativa.
 * - `motivoUtilizacao` {string} Motivo da utilização.
 * - `motorista` {object | null} Detalhes do motorista ({ id, nome }) ou null se não encontrado.
 * - `automovel` {object | null} Detalhes do automóvel ({ id, placa, marca, cor }) ou null se não encontrado.
 */
const listarRegistrosDeUtilizacao = async ({ page = 1, limit = 10 } = {}) => {
  const pageNumber = parseInt(page, 10);
  const limitNumber = parseInt(limit, 10);

  const currentPage = pageNumber > 0 ? pageNumber : 1;
  const itemsPerPage = limitNumber > 0 ? limitNumber : 10;
  const offset = (currentPage - 1) * itemsPerPage;

  const { totalItems, items: utilizacoesPaginadas } = await utilizacaoRepository.listarTodasUtilizacoes({ 
    limit: itemsPerPage, 
    offset,
  });
  
  const registrosDetalhados = await Promise.all(
    utilizacoesPaginadas.map(_popularDetalhesUtilizacao) // Reutiliza a função auxiliar refatorada
  );

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return {
    items: registrosDetalhados,
    totalItems,
    totalPages: totalPages > 0 ? totalPages : 1, // Garante pelo menos 1 página se houver itens
    currentPage,
    itemsPerPage,
  };
};

module.exports = {
  iniciarUtilizacaoAutomovel,
  finalizarUtilizacaoAutomovel,
  listarRegistrosDeUtilizacao,
};
