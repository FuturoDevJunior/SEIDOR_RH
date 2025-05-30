const { handleHealthCheck } = require('../../../src/api/health/health.controller');

describe('handleHealthCheck', () => {
  let req;
  let res;
  let next;
  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    next = jest.fn();
    jest.clearAllMocks();
  });

  it('deve responder com status 200 e mensagem de saúde', () => {
    handleHealthCheck(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 'UP',
        message: 'Aplicação está operacional.',
        timestamp: expect.any(String),
      })
    );
    expect(next).not.toHaveBeenCalled();
  });

  it('deve chamar next(error) se res.status lançar erro', () => {
    const fakeError = new Error('Erro simulado');
    res.status.mockImplementation(() => {
      throw fakeError;
    });
    handleHealthCheck(req, res, next);
    expect(next).toHaveBeenCalledWith(fakeError);
  });
}); 