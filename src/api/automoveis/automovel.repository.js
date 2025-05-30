const idGenerator = require('../../utils/idGenerator');

let automoveis = [];

/**
 * Cria um novo registro de automóvel.
 * @param {object} dadosAutomovel - Os dados do automóvel a ser criado.
 * @param {string} dadosAutomovel.placa - A placa do automóvel.
 * @param {string} dadosAutomovel.cor - A cor do automóvel.
 * @param {string} dadosAutomovel.marca - A marca do automóvel.
 * @returns {object} O objeto do automóvel recém-criado, incluindo seu ID gerado.
 */
const criarAutomovel = (dadosAutomovel) => {
  const novoAutomovel = {
    id: idGenerator(),
    ...dadosAutomovel,
  };
  automoveis.push(novoAutomovel);
  return novoAutomovel;
};

/**
 * Lista os automóveis, com opção de filtro por cor e/ou marca.
 * @param {object} [filtros={}] - Os filtros a serem aplicados.
 * @param {string} [filtros.cor] - A cor para filtrar os automóveis (case-insensitive).
 * @param {string} [filtros.marca] - A marca para filtrar os automóveis (case-insensitive).
 * @returns {Array<object>} Uma lista de automóveis que correspondem aos filtros.
 */
const listarAutomoveis = ({ cor, marca } = {}) => {
  let automoveisFiltrados = [...automoveis];
  if (cor) {
    automoveisFiltrados = automoveisFiltrados.filter(
      (automovel) => automovel.cor && automovel.cor.toLowerCase() === cor.toLowerCase()
    );
  }
  if (marca) {
    automoveisFiltrados = automoveisFiltrados.filter(
      (automovel) => automovel.marca && automovel.marca.toLowerCase() === marca.toLowerCase()
    );
  }
  return automoveisFiltrados;
};

/**
 * Busca um automóvel pelo seu ID.
 * @param {string} id - O ID do automóvel a ser buscado.
 * @returns {object | undefined} O objeto do automóvel se encontrado, ou undefined caso contrário.
 */
const buscarAutomovelPorId = (id) => {
  return automoveis.find((automovel) => automovel.id === id);
};

/**
 * Atualiza um automóvel existente com novos dados.
 * @param {string} id - O ID do automóvel a ser atualizado.
 * @param {object} dadosAtualizacao - Os dados a serem atualizados no automóvel.
 * @param {string} [dadosAtualizacao.placa] - A nova placa do automóvel.
 * @param {string} [dadosAtualizacao.cor] - A nova cor do automóvel.
 * @param {string} [dadosAtualizacao.marca] - A nova marca do automóvel.
 * @returns {object | null} O objeto do automóvel atualizado, ou null se o automóvel não for encontrado.
 */
const atualizarAutomovel = (id, dadosAtualizacao) => {
  const index = automoveis.findIndex((automovel) => automovel.id === id);
  if (index === -1) {
    return null; // Or undefined, as per original checklist note
  }
  automoveis[index] = {
    ...automoveis[index],
    ...dadosAtualizacao,
  };
  return automoveis[index];
};

/**
 * Deleta um automóvel do registro.
 * @param {string} id - O ID do automóvel a ser deletado.
 * @returns {boolean} Retorna true se o automóvel foi deletado com sucesso, false caso contrário.
 */
const deletarAutomovel = (id) => {
  const index = automoveis.findIndex((automovel) => automovel.id === id);
  if (index === -1) {
    return false;
  }
  automoveis.splice(index, 1);
  return true;
};

/**
 * Limpa todos os automóveis do registro. (Usado principalmente para testes)
 * @private
 */
const _limparAutomoveis = () => {
  automoveis = [];
};

module.exports = {
  criarAutomovel,
  listarAutomoveis,
  buscarAutomovelPorId,
  atualizarAutomovel,
  deletarAutomovel,
  _limparAutomoveis,
};
