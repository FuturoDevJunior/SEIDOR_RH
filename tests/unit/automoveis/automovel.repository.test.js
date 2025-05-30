const {
  criarAutomovel,
  listarAutomoveis,
  buscarAutomovelPorId,
  atualizarAutomovel,
  deletarAutomovel,
  _limparAutomoveis,
} = require('../../../src/api/automoveis/automovel.repository');
const { v4: uuidv4 } = require('uuid'); // This will be our mock

// Mock the uuid module, specifically the v4 function
jest.mock('uuid', () => ({
  v4: jest.fn(),
}));

describe('Automovel Repository', () => {
  beforeEach(() => {
    _limparAutomoveis(); // Clear data before each test
    uuidv4.mockClear(); // Clear mock state before each test
  });

  afterEach(() => {
    _limparAutomoveis(); // Clear data after each test
  });

  describe('criarAutomovel', () => {
    it('should create and return a new automovel with a generated ID', () => {
      uuidv4.mockReturnValue('test-uuid-123');
      const dadosAutomovel = { placa: 'ABC-1234', cor: 'Azul', marca: 'Fiat' };
      const automovel = criarAutomovel(dadosAutomovel);

      expect(uuidv4).toHaveBeenCalledTimes(1);
      expect(automovel).toEqual({ id: 'test-uuid-123', ...dadosAutomovel });
      expect(buscarAutomovelPorId('test-uuid-123')).toEqual(automovel);
    });
  });

  describe('listarAutomoveis', () => {
    it('should return all automoveis if no filters are provided', () => {
      // For listar, ID generation isn't the primary focus, but ensure data is there
      uuidv4.mockReturnValueOnce('id1').mockReturnValueOnce('id2');
      criarAutomovel({ placa: 'ABC-1234', cor: 'Azul', marca: 'Fiat' });
      criarAutomovel({ placa: 'XYZ-5678', cor: 'Vermelho', marca: 'Ford' });
      const automoveis = listarAutomoveis();
      expect(automoveis.length).toBe(2);
    });

    it('should filter automoveis by cor', () => {
      uuidv4.mockReturnValueOnce('id1').mockReturnValueOnce('id2').mockReturnValueOnce('id3');
      criarAutomovel({ placa: 'ABC-1234', cor: 'Azul', marca: 'Fiat' });
      criarAutomovel({ placa: 'XYZ-5678', cor: 'Vermelho', marca: 'Ford' });
      criarAutomovel({ placa: 'DEF-5555', cor: 'Azul', marca: 'VW' });
      const automoveis = listarAutomoveis({ cor: 'Azul' });
      expect(automoveis.length).toBe(2);
      expect(automoveis.every(a => a.cor === 'Azul')).toBe(true);
    });

    it('should filter automoveis by marca', () => {
      uuidv4.mockReturnValueOnce('id1').mockReturnValueOnce('id2').mockReturnValueOnce('id3');
      criarAutomovel({ placa: 'ABC-1234', cor: 'Azul', marca: 'Fiat' });
      criarAutomovel({ placa: 'XYZ-5678', cor: 'Vermelho', marca: 'Ford' });
      criarAutomovel({ placa: 'GHI-9012', cor: 'Preto', marca: 'Fiat' });
      const automoveis = listarAutomoveis({ marca: 'Fiat' });
      expect(automoveis.length).toBe(2);
      expect(automoveis.every(a => a.marca === 'Fiat')).toBe(true);
    });

    it('should filter automoveis by cor and marca', () => {
      uuidv4.mockReturnValueOnce('id1').mockReturnValueOnce('id2').mockReturnValueOnce('id3');
      criarAutomovel({ placa: 'ABC-1234', cor: 'Azul', marca: 'Fiat' });
      criarAutomovel({ placa: 'XYZ-5678', cor: 'Azul', marca: 'Ford' });
      criarAutomovel({ placa: 'GHI-9012', cor: 'Preto', marca: 'Fiat' });
      const automoveis = listarAutomoveis({ cor: 'Azul', marca: 'Fiat' });
      expect(automoveis.length).toBe(1);
      expect(automoveis[0].placa).toBe('ABC-1234');
    });
    
    it('should be case-insensitive for filters', () => {
      uuidv4.mockReturnValueOnce('id1');
      criarAutomovel({ placa: 'ABC-1234', cor: 'Azul', marca: 'Fiat' });
      const automoveis = listarAutomoveis({ cor: 'azul', marca: 'fiat' });
      expect(automoveis.length).toBe(1);
    });

    it('should return an empty array if no automoveis match filters', () => {
      uuidv4.mockReturnValueOnce('id1');
      criarAutomovel({ placa: 'ABC-1234', cor: 'Azul', marca: 'Fiat' });
      const automoveis = listarAutomoveis({ cor: 'Verde' });
      expect(automoveis.length).toBe(0);
    });
  });

  describe('buscarAutomovelPorId', () => {
    it('should return the automovel if found', () => {
      uuidv4.mockReturnValue('id-existente');
      const dados = { placa: 'ABC-1234', cor: 'Azul', marca: 'Fiat' };
      criarAutomovel(dados);
      const automovel = buscarAutomovelPorId('id-existente');
      expect(automovel).toEqual({ id: 'id-existente', ...dados });
    });

    it('should return undefined if automovel is not found', () => {
      const automovel = buscarAutomovelPorId('id-nao-existente');
      expect(automovel).toBeUndefined();
    });
  });

  describe('atualizarAutomovel', () => {
    it('should update and return the automovel if found', () => {
      uuidv4.mockReturnValue('id-para-atualizar');
      criarAutomovel({ placa: 'ABC-1234', cor: 'Azul', marca: 'Fiat' });
      const dadosAtualizacao = { cor: 'Vermelho', placa: 'DEF-5678' };
      const automovelAtualizado = atualizarAutomovel('id-para-atualizar', dadosAtualizacao);
      
      expect(automovelAtualizado).toBeDefined();
      expect(automovelAtualizado.cor).toBe('Vermelho');
      expect(automovelAtualizado.placa).toBe('DEF-5678');
      expect(automovelAtualizado.marca).toBe('Fiat');
    });

    it('should return null if automovel to update is not found', () => {
      const automovelAtualizado = atualizarAutomovel('id-nao-existente', { cor: 'Preto' });
      expect(automovelAtualizado).toBeNull();
    });
  });

  describe('deletarAutomovel', () => {
    it('should delete the automovel and return true if found', () => {
      uuidv4.mockReturnValue('id-para-deletar');
      criarAutomovel({ placa: 'ABC-1234', cor: 'Azul', marca: 'Fiat' });
      
      const resultado = deletarAutomovel('id-para-deletar');
      expect(resultado).toBe(true);
      expect(buscarAutomovelPorId('id-para-deletar')).toBeUndefined();
      expect(listarAutomoveis().length).toBe(0);
    });

    it('should return false if automovel to delete is not found', () => {
      const resultado = deletarAutomovel('id-nao-existente');
      expect(resultado).toBe(false);
    });
  });

   describe('_limparAutomoveis', () => {
    it('should clear all automoveis from the list', () => {
      uuidv4.mockReturnValue('id1');
      criarAutomovel({ placa: 'ABC-1234', cor: 'Azul', marca: 'Fiat' });
      _limparAutomoveis();
      expect(listarAutomoveis().length).toBe(0);
    });
  });
});
