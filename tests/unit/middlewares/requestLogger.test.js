const requestLogger = require('../../../src/middlewares/requestLogger');

describe('requestLogger middleware', () => {
  it('deve logar erro no evento res.on("error")', () => {
    const req = { method: 'GET', originalUrl: '/test' };
    const res = {
      on: jest.fn((event, cb) => {
        if (event === 'error') {
          // Simula erro
          cb(new Error('Erro simulado'));
        }
        return res;
      }),
    };
    const next = jest.fn();
    requestLogger(req, res, next);
    expect(res.on).toHaveBeenCalledWith('error', expect.any(Function));
    expect(next).toHaveBeenCalled();
  });
}); 