const idGenerator = require('../../utils/idGenerator');

let motoristas = [];

/**
 * Cria um novo registro de motorista.
 * @param {object} dadosMotorista - Os dados do motorista a ser criado.
 * @param {string} dadosMotorista.nome - O nome do motorista.
 * @returns {object} O objeto do motorista recém-criado, incluindo seu ID gerado.
 */
const criarMotorista = (dadosMotorista) => {
  const novoMotorista = {
    id: idGenerator(),
    ...dadosMotorista,
  };
  motoristas.push(novoMotorista);
  return novoMotorista;
};

/**
 * Lista os motoristas, com opção de filtro por nome.
 * O filtro por nome é case-insensitive e realiza uma busca parcial (includes).
 * @param {object} [filtros={}] - Os filtros a serem aplicados.
 * @param {string} [filtros.nome] - O nome (ou parte do nome) para filtrar os motoristas.
 * @returns {Array<object>} Uma lista de motoristas que correspondem ao filtro.
 */
const listarMotoristas = ({ nome } = {}) => {
  let motoristasFiltrados = [...motoristas];
  if (nome) {
    motoristasFiltrados = motoristasFiltrados.filter(
      (motorista) => motorista.nome && motorista.nome.toLowerCase().includes(nome.toLowerCase())
    );
  }
  return motoristasFiltrados;
};

/**
 * Busca um motorista pelo seu ID.
 * @param {string} id - O ID do motorista a ser buscado.
 * @returns {object | undefined} O objeto do motorista se encontrado, ou undefined caso contrário.
 */
const buscarMotoristaPorId = (id) => {
  return motoristas.find((motorista) => motorista.id === id);
};

/**
 * Atualiza um motorista existente com novos dados.
 * @param {string} id - O ID do motorista a ser atualizado.
 * @param {object} dadosAtualizacao - Os dados a serem atualizados no motorista.
 * @param {string} [dadosAtualizacao.nome] - O novo nome do motorista.
 * @returns {object | null} O objeto do motorista atualizado, ou null se o motorista não for encontrado.
 */
const atualizarMotorista = (id, dadosAtualizacao) => {
  const index = motoristas.findIndex((motorista) => motorista.id === id);
  if (index === -1) {
    return null;
  }
  motoristas[index] = {
    ...motoristas[index],
    ...dadosAtualizacao,
  };
  return motoristas[index];
};

/**
 * Deleta um motorista do registro.
 * @param {string} id - O ID do motorista a ser deletado.
 * @returns {boolean} Retorna true se o motorista foi deletado com sucesso, false caso contrário.
 */
const deletarMotorista = (id) => {
  const index = motoristas.findIndex((motorista) => motorista.id === id);
  if (index === -1) {
    return false;
  }
  motoristas.splice(index, 1);
  return true;
};

/**
 * Limpa todos os motoristas do registro. (Usado principalmente para testes)
 * @private
 */
const _limparMotoristas = () => {
  motoristas = [];
};

module.exports = {
  criarMotorista,
  listarMotoristas,
  buscarMotoristaPorId,
  atualizarMotorista,
  deletarMotorista,
  _limparMotoristas,
};
