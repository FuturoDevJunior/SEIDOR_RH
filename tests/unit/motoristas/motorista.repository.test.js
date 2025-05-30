const {
  criarMotorista,
  listarMotoristas,
  buscarMotoristaPorId,
  atualizarMotorista,
  deletarMotorista,
  _limparMotoristas,
} = require('../../../src/api/motoristas/motorista.repository');
const { v4: uuidv4 } = require('uuid'); // Using the same mocking strategy as attempted for automovel

// Mock the uuid module, specifically the v4 function
jest.mock('uuid', () => ({
  v4: jest.fn(),
}));

describe('Motorista Repository', () => {
  beforeEach(() => {
    _limparMotoristas(); // Clear data before each test
    uuidv4.mockClear(); // Clear mock state before each test
  });

  afterEach(() => {
    _limparMotoristas(); // Clear data after each test
  });

  describe('criarMotorista', () => {
    it('should create and return a new motorista with a generated ID', () => {
      uuidv4.mockReturnValue('driver-uuid-001');
      const dadosMotorista = { nome: 'João Silva' };
      const motorista = criarMotorista(dadosMotorista);

      expect(uuidv4).toHaveBeenCalledTimes(1);
      expect(motorista).toEqual({ id: 'driver-uuid-001', ...dadosMotorista });
      expect(buscarMotoristaPorId('driver-uuid-001')).toEqual(motorista);
    });
  });

  describe('listarMotoristas', () => {
    it('should return all motoristas if no filters are provided', () => {
      uuidv4.mockReturnValueOnce('id1').mockReturnValueOnce('id2');
      criarMotorista({ nome: 'João Silva' });
      criarMotorista({ nome: 'Maria Oliveira' });
      const motoristas = listarMotoristas();
      expect(motoristas.length).toBe(2);
    });

    it('should filter motoristas by nome (case-insensitive, partial match)', () => {
      uuidv4.mockReturnValueOnce('id1').mockReturnValueOnce('id2').mockReturnValueOnce('id3');
      criarMotorista({ nome: 'João Silva' });
      criarMotorista({ nome: 'Maria Oliveira' });
      criarMotorista({ nome: 'João Antunes' });
      
      let motoristas = listarMotoristas({ nome: 'João' });
      expect(motoristas.length).toBe(2);
      
      motoristas = listarMotoristas({ nome: 'silva' });
      expect(motoristas.length).toBe(1);
      expect(motoristas[0].nome).toBe('João Silva');
    });

    it('should return an empty array if no motoristas match filters', () => {
      criarMotorista({ nome: 'Carlos Pereira' });
      const motoristas = listarMotoristas({ nome: 'Zuleide' });
      expect(motoristas.length).toBe(0);
    });
  });

  describe('buscarMotoristaPorId', () => {
    it('should return the motorista if found', () => {
      uuidv4.mockReturnValue('driver-id-existing');
      const dados = { nome: 'Fernanda Costa' };
      criarMotorista(dados);
      const motorista = buscarMotoristaPorId('driver-id-existing');
      expect(motorista).toEqual({ id: 'driver-id-existing', ...dados });
    });

    it('should return undefined if motorista is not found', () => {
      const motorista = buscarMotoristaPorId('non-existing-driver-id');
      expect(motorista).toBeUndefined();
    });
  });

  describe('atualizarMotorista', () => {
    it('should update and return the motorista if found', () => {
      uuidv4.mockReturnValue('driver-id-to-update');
      criarMotorista({ nome: 'Roberto Almeida' });
      const dadosAtualizacao = { nome: 'Roberto de Almeida Santos' };
      const motoristaAtualizado = atualizarMotorista('driver-id-to-update', dadosAtualizacao);
      
      expect(motoristaAtualizado).toBeDefined();
      expect(motoristaAtualizado.nome).toBe('Roberto de Almeida Santos');
    });

    it('should return null if motorista to update is not found', () => {
      const motoristaAtualizado = atualizarMotorista('non-existing-driver-id', { nome: 'Novo Nome' });
      expect(motoristaAtualizado).toBeNull();
    });
  });

  describe('deletarMotorista', () => {
    it('should delete the motorista and return true if found', () => {
      uuidv4.mockReturnValue('driver-id-to-delete');
      criarMotorista({ nome: 'Ana Beatriz' });
      
      const resultado = deletarMotorista('driver-id-to-delete');
      expect(resultado).toBe(true);
      expect(buscarMotoristaPorId('driver-id-to-delete')).toBeUndefined();
      expect(listarMotoristas().length).toBe(0);
    });

    it('should return false if motorista to delete is not found', () => {
      const resultado = deletarMotorista('non-existing-driver-id');
      expect(resultado).toBe(false);
    });
  });

   describe('_limparMotoristas', () => {
    it('should clear all motoristas from the list', () => {
      criarMotorista({ nome: 'Lucas Martins' });
      _limparMotoristas();
      expect(listarMotoristas().length).toBe(0);
    });
  });
});
