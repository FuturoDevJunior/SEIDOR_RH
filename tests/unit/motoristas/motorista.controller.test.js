const { handleCriarMotorista, handleListarMotoristas, handleBuscarMotoristaPorId, handleAtualizarMotorista, handleDeletarMotorista } = require('../../../src/api/motoristas/motorista.controller');

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};
const mockNext = jest.fn();

describe('Motorista Controller - Error Handling', () => {
  beforeEach(() => { jest.clearAllMocks(); });

  it('handleCriarMotorista deve chamar next em caso de erro', async () => {
    const req = { body: {} };
    const res = mockRes();
    const error = new Error('Erro simulado');
    jest.spyOn(require('../../../src/api/motoristas/motorista.service'), 'cadastrarNovoMotorista').mockRejectedValueOnce(error);
    await handleCriarMotorista(req, res, mockNext);
    expect(mockNext).toHaveBeenCalledWith(error);
  });

  it('handleListarMotoristas deve chamar next em caso de erro', async () => {
    const req = { query: {} };
    const res = mockRes();
    const error = new Error('Erro simulado');
    jest.spyOn(require('../../../src/api/motoristas/motorista.service'), 'listarTodosMotoristas').mockRejectedValueOnce(error);
    await handleListarMotoristas(req, res, mockNext);
    expect(mockNext).toHaveBeenCalledWith(error);
  });

  it('handleBuscarMotoristaPorId deve chamar next em caso de erro', async () => {
    const req = { params: { id: 'id' } };
    const res = mockRes();
    const error = new Error('Erro simulado');
    jest.spyOn(require('../../../src/api/motoristas/motorista.service'), 'buscarMotoristaPorIdentificador').mockRejectedValueOnce(error);
    await handleBuscarMotoristaPorId(req, res, mockNext);
    expect(mockNext).toHaveBeenCalledWith(error);
  });

  it('handleAtualizarMotorista deve chamar next em caso de erro', async () => {
    const req = { params: { id: 'id' }, body: {} };
    const res = mockRes();
    const error = new Error('Erro simulado');
    jest.spyOn(require('../../../src/api/motoristas/motorista.service'), 'atualizarDadosMotorista').mockRejectedValueOnce(error);
    await handleAtualizarMotorista(req, res, mockNext);
    expect(mockNext).toHaveBeenCalledWith(error);
  });

  it('handleDeletarMotorista deve chamar next em caso de erro', async () => {
    const req = { params: { id: 'id' } };
    const res = mockRes();
    const error = new Error('Erro simulado');
    jest.spyOn(require('../../../src/api/motoristas/motorista.service'), 'removerMotorista').mockRejectedValueOnce(error);
    await handleDeletarMotorista(req, res, mockNext);
    expect(mockNext).toHaveBeenCalledWith(error);
  });
}); 