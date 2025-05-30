const { handleIniciarUtilizacao, handleFinalizarUtilizacao, handleListarUtilizacoes } = require('../../../src/api/utilizacoes/utilizacao.controller');

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};
const mockNext = jest.fn();

describe('Utilizacao Controller - Error Handling', () => {
  beforeEach(() => { jest.clearAllMocks(); });

  it('handleIniciarUtilizacao deve chamar next em caso de erro', async () => {
    const req = { body: {} };
    const res = mockRes();
    const error = new Error('Erro simulado');
    jest.spyOn(require('../../../src/api/utilizacoes/utilizacao.service'), 'iniciarUtilizacaoAutomovel').mockRejectedValueOnce(error);
    await handleIniciarUtilizacao(req, res, mockNext);
    expect(mockNext).toHaveBeenCalledWith(error);
  });

  it('handleFinalizarUtilizacao deve chamar next em caso de erro', async () => {
    const req = { params: { id: 'id' } };
    const res = mockRes();
    const error = new Error('Erro simulado');
    jest.spyOn(require('../../../src/api/utilizacoes/utilizacao.service'), 'finalizarUtilizacaoAutomovel').mockRejectedValueOnce(error);
    await handleFinalizarUtilizacao(req, res, mockNext);
    expect(mockNext).toHaveBeenCalledWith(error);
  });

  it('handleListarUtilizacoes deve chamar next em caso de erro', async () => {
    const req = { query: {} };
    const res = mockRes();
    const error = new Error('Erro simulado');
    jest.spyOn(require('../../../src/api/utilizacoes/utilizacao.service'), 'listarRegistrosDeUtilizacao').mockRejectedValueOnce(error);
    await handleListarUtilizacoes(req, res, mockNext);
    expect(mockNext).toHaveBeenCalledWith(error);
  });
}); 