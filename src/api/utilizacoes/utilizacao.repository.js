const idGenerator = require('../../utils/idGenerator');

let utilizacoes = [];

/**
 * Cria um novo registro de utilização de automóvel.
 * Define explicitamente `dataFim` como `null` na criação.
 * @param {object} dadosUtilizacao - Os dados da utilização a ser criada.
 * @param {string} dadosUtilizacao.motoristaId - ID do motorista.
 * @param {string} dadosUtilizacao.automovelId - ID do automóvel.
 * @param {string} dadosUtilizacao.motivoUtilizacao - Motivo da utilização.
 * @param {string} dadosUtilizacao.dataInicio - Data e hora de início da utilização (ISO String).
 * @returns {object} O objeto da utilização recém-criada, incluindo seu ID gerado e dataFim nula.
 */
const criarUtilizacao = (dadosUtilizacao) => {
  const novaUtilizacao = {
    id: idGenerator(),
    dataFim: null, // Explicitly set dataFim to null on creation
    ...dadosUtilizacao,
  };
  utilizacoes.push(novaUtilizacao);
  return novaUtilizacao;
};

/**
 * Busca um registro de utilização pelo seu ID.
 * @param {string} id - O ID do registro de utilização a ser buscado.
 * @returns {object | undefined} O objeto do registro de utilização se encontrado, ou undefined caso contrário.
 */
const buscarUtilizacaoPorId = (id) => {
  return utilizacoes.find((utilizacao) => utilizacao.id === id);
};

/**
 * Atualiza um registro de utilização existente com novos dados.
 * Usado principalmente para definir `dataFim`.
 * @param {string} id - O ID do registro de utilização a ser atualizado.
 * @param {object} dadosAtualizacao - Os dados a serem atualizados.
 * @param {string} [dadosAtualizacao.dataFim] - A data e hora de término da utilização (ISO String).
 * @param {string} [dadosAtualizacao.motivoUtilizacao] - Motivo atualizado (menos comum).
 * @returns {object | null} O objeto do registro de utilização atualizado, ou null se não for encontrado.
 */
const atualizarUtilizacao = (id, dadosAtualizacao) => {
  const index = utilizacoes.findIndex((utilizacao) => utilizacao.id === id);
  if (index === -1) {
    return null;
  }
  utilizacoes[index] = {
    ...utilizacoes[index],
    ...dadosAtualizacao,
  };
  return utilizacoes[index];
};

/**
 * Lista todas as utilizações, com suporte opcional para paginação.
 * @param {object} [options] - Opções de paginação.
 * @param {number} [options.limit] - Número de itens por página.
 * @param {number} [options.offset] - Número de itens a pular (offset).
 * @returns {{ totalItems: number, items: Array<object> }} Um objeto contendo o total de itens e a lista de utilizações paginada.
 */
const listarTodasUtilizacoes = (options) => {
  if (!options) {
    // Compatibilidade com testes unitários antigos: retorna array simples
    return Array.from(utilizacoes);
  }
  // Paginação padrão
  const { limit, offset } = options;
  const totalItems = utilizacoes.length;
  let items = Array.from(utilizacoes);
  if (typeof limit === 'number' && typeof offset === 'number' && limit > 0 && offset >= 0) {
    items = items.slice(offset, offset + limit);
  }
  return { totalItems, items };
};

/**
 * Busca um registro de utilização ativo (dataFim é null) para um automóvel específico.
 * @param {string} automovelId - O ID do automóvel.
 * @returns {object | undefined} O registro de utilização ativo se encontrado, ou undefined.
 */
const buscarUtilizacaoAtivaPorAutomovelId = (automovelId) => {
  return Array.from(utilizacoes)
    .reverse()
    .find((u) => u.automovelId === automovelId && u.dataFim === null);
};

/**
 * Busca um registro de utilização ativo (dataFim é null) para um motorista específico.
 * @param {string} motoristaId - O ID do motorista.
 * @returns {object | undefined} O registro de utilização ativo se encontrado, ou undefined.
 */
const buscarUtilizacaoAtivaPorMotoristaId = (motoristaId) => {
  return Array.from(utilizacoes)
    .reverse()
    .find((u) => u.motoristaId === motoristaId && u.dataFim === null);
};

/**
 * Limpa todos os registros de utilização. (Usado principalmente para testes)
 * @private
 */
const _limparUtilizacoes = () => {
  utilizacoes = [];
};

module.exports = {
  criarUtilizacao,
  buscarUtilizacaoPorId,
  atualizarUtilizacao,
  listarTodasUtilizacoes,
  buscarUtilizacaoAtivaPorAutomovelId,
  buscarUtilizacaoAtivaPorMotoristaId,
  _limparUtilizacoes,
};
