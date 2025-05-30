const errorHandler = require('../../../src/middlewares/errorHandler');

describe('errorHandler middleware', () => {
  let req, res, next;
  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    next = jest.fn();
    jest.clearAllMocks();
  });

  it('deve retornar 404 para AppError operacional 404', () => {
    const err = { isOperational: true, statusCode: 404, status: 'fail', message: 'Não encontrado' };
    errorHandler(err, req, res, next);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ status: 'fail', message: 'Não encontrado' });
  });

  it('deve retornar statusCode e mensagem para AppError operacional genérico', () => {
    const err = { isOperational: true, statusCode: 400, status: 'fail', message: 'Erro de validação' };
    errorHandler(err, req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ status: 'fail', message: 'Erro de validação' });
  });

  it('deve retornar 500 e mensagem genérica para erro não operacional', () => {
    const err = { isOperational: false, statusCode: 500, status: 'error', message: 'Erro desconhecido' };
    errorHandler(err, req, res, next);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ status: 'error', message: 'Something went very wrong!' });
  });

  it('deve definir statusCode e status padrão se não definidos', () => {
    const err = { isOperational: true, message: 'Erro sem statusCode/status' };
    errorHandler(err, req, res, next);
    expect(err.statusCode).toBe(500);
    expect(err.status).toBe('error');
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ status: 'error', message: 'Erro sem statusCode/status' });
  });

  it('deve retornar 500 e mensagem genérica para erro não operacional sem statusCode', () => {
    const err = { isOperational: false, message: 'Erro desconhecido' };
    errorHandler(err, req, res, next);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ status: 'error', message: 'Something went very wrong!' });
  });
}); 