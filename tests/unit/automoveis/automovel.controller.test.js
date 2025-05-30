const { handleCriarAutomovel, handleListarAutomoveis, handleBuscarAutomovelPorId, handleAtualizarAutomovel, handleDeletarAutomovel } = require('../../../src/api/automoveis/automovel.controller');

// Mock response, request e next
const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};
const mockNext = jest.fn();

describe('Automovel Controller - Error Handling', () => {
  beforeEach(() => { jest.clearAllMocks(); });

  it('handleCriarAutomovel deve chamar next em caso de erro', async () => {
    const req = { body: {} };
    const res = mockRes();
    const error = new Error('Erro simulado');
    jest.spyOn(require('../../../src/api/automoveis/automovel.service'), 'cadastrarNovoAutomovel').mockRejectedValueOnce(error);
    await handleCriarAutomovel(req, res, mockNext);
    expect(mockNext).toHaveBeenCalledWith(error);
  });

  it('handleListarAutomoveis deve chamar next em caso de erro', async () => {
    const req = { query: {} };
    const res = mockRes();
    const error = new Error('Erro simulado');
    jest.spyOn(require('../../../src/api/automoveis/automovel.service'), 'listarTodosAutomoveis').mockRejectedValueOnce(error);
    await handleListarAutomoveis(req, res, mockNext);
    expect(mockNext).toHaveBeenCalledWith(error);
  });

  it('handleBuscarAutomovelPorId deve chamar next em caso de erro', async () => {
    const req = { params: { id: 'id' } };
    const res = mockRes();
    const error = new Error('Erro simulado');
    jest.spyOn(require('../../../src/api/automoveis/automovel.service'), 'buscarAutomovelPorIdentificador').mockRejectedValueOnce(error);
    await handleBuscarAutomovelPorId(req, res, mockNext);
    expect(mockNext).toHaveBeenCalledWith(error);
  });

  it('handleAtualizarAutomovel deve chamar next em caso de erro', async () => {
    const req = { params: { id: 'id' }, body: {} };
    const res = mockRes();
    const error = new Error('Erro simulado');
    jest.spyOn(require('../../../src/api/automoveis/automovel.service'), 'atualizarDadosAutomovel').mockRejectedValueOnce(error);
    await handleAtualizarAutomovel(req, res, mockNext);
    expect(mockNext).toHaveBeenCalledWith(error);
  });

  it('handleDeletarAutomovel deve chamar next em caso de erro', async () => {
    const req = { params: { id: 'id' } };
    const res = mockRes();
    const error = new Error('Erro simulado');
    jest.spyOn(require('../../../src/api/automoveis/automovel.service'), 'removerAutomovel').mockRejectedValueOnce(error);
    await handleDeletarAutomovel(req, res, mockNext);
    expect(mockNext).toHaveBeenCalledWith(error);
  });
}); 