const validate = require('../../../src/middlewares/requestValidator');
const { validationResult } = require('express-validator');

jest.mock('express-validator', () => ({
  validationResult: jest.fn(),
}));

describe('requestValidator middleware', () => {
  let req, res, next;
  beforeEach(() => {
    req = {};
    res = { status: jest.fn().mockReturnThis(), json: jest.fn().mockReturnThis() };
    next = jest.fn();
    jest.clearAllMocks();
  });

  it('deve retornar 400 e erros únicos se houver erros de validação', () => {
    validationResult.mockReturnValue({
      isEmpty: () => false,
      array: () => [
        { msg: 'is required', path: 'campo1' },
        { msg: 'must be a string', path: 'campo1' },
        { msg: 'is required', path: 'campo2' },
      ],
    });
    validate(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ errors: [
      { msg: 'is required', path: 'campo1', param: 'campo1' },
      { msg: 'is required', path: 'campo2', param: 'campo2' },
    ] });
    expect(next).not.toHaveBeenCalled();
  });

  it('deve chamar next se não houver erros', () => {
    validationResult.mockReturnValue({ isEmpty: () => true });
    validate(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  it('deve retornar 400 e erro único se houver erro apenas com param (sem path)', () => {
    validationResult.mockReturnValue({
      isEmpty: () => false,
      array: () => [
        { msg: 'is required', param: 'campo3' },
        { msg: 'must be a string', param: 'campo3' },
      ],
    });
    validate(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ errors: [
      { msg: 'is required', param: 'campo3' },
    ] });
    expect(next).not.toHaveBeenCalled();
  });
}); 