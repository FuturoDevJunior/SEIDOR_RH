jest.mock('uuid', () => ({
  v4: jest.fn(),
}));

const {
  criarUtilizacao,
  buscarUtilizacaoPorId,
  atualizarUtilizacao,
  listarTodasUtilizacoes,
  buscarUtilizacaoAtivaPorAutomovelId,
  buscarUtilizacaoAtivaPorMotoristaId,
  _limparUtilizacoes,
} = require('../../../src/api/utilizacoes/utilizacao.repository');
const { v4: uuidv4 } = require('uuid'); // Using the same mocking strategy

describe('Utilizacao Repository', () => {
  beforeEach(() => {
    _limparUtilizacoes();
    uuidv4.mockClear();
  });

  afterEach(() => {
    _limparUtilizacoes();
  });

  const mockUtilizacaoData = {
    motoristaId: 'motorista-001',
    automovelId: 'automovel-001',
    motivoUtilizacao: 'Viagem a trabalho',
    dataInicio: new Date().toISOString(),
  };

  describe('criarUtilizacao', () => {
    it('should create and return a new utilizacao with a generated ID and null dataFim', () => {
      uuidv4.mockReturnValue('utilizacao-uuid-001');
      const utilizacao = criarUtilizacao(mockUtilizacaoData);

      expect(uuidv4).toHaveBeenCalledTimes(1);
      expect(utilizacao).toEqual({ 
        id: 'utilizacao-uuid-001', 
        motoristaId: mockUtilizacaoData.motoristaId,
        automovelId: mockUtilizacaoData.automovelId,
        motivoUtilizacao: mockUtilizacaoData.motivoUtilizacao,
        dataInicio: expect.any(String),
        dataFim: null 
      });
      expect(buscarUtilizacaoPorId('utilizacao-uuid-001')).toEqual(utilizacao);
    });
  });

  describe('buscarUtilizacaoPorId', () => {
    it('should return the utilizacao if found', () => {
      uuidv4.mockReturnValue('existing-util-id');
      const utilizacaoCriada = criarUtilizacao(mockUtilizacaoData);
      const utilizacao = buscarUtilizacaoPorId('existing-util-id');
      expect(utilizacao).toEqual(utilizacaoCriada);
    });

    it('should return undefined if utilizacao is not found', () => {
      const utilizacao = buscarUtilizacaoPorId('non-existing-util-id');
      expect(utilizacao).toBeUndefined();
    });
  });

  describe('atualizarUtilizacao', () => {
    it('should update and return the utilizacao if found', () => {
      uuidv4.mockReturnValue('util-id-to-update');
      criarUtilizacao(mockUtilizacaoData);
      const dataFim = new Date().toISOString();
      const dadosAtualizacao = { dataFim };
      
      const utilizacaoAtualizada = atualizarUtilizacao('util-id-to-update', dadosAtualizacao);
      
      expect(utilizacaoAtualizada).toBeDefined();
      expect(utilizacaoAtualizada.dataFim).toBe(dataFim);
      expect(utilizacaoAtualizada.motivoUtilizacao).toBe(mockUtilizacaoData.motivoUtilizacao);
    });

    it('should return null if utilizacao to update is not found', () => {
      const utilizacaoAtualizada = atualizarUtilizacao('non-existing-util-id', { dataFim: new Date().toISOString() });
      expect(utilizacaoAtualizada).toBeNull();
    });
  });

  describe('listarTodasUtilizacoes', () => {
    it('should return all utilizacoes', () => {
      uuidv4.mockReturnValueOnce('id1').mockReturnValueOnce('id2');
      criarUtilizacao({ ...mockUtilizacaoData, automovelId: 'auto-001' });
      criarUtilizacao({ ...mockUtilizacaoData, automovelId: 'auto-002' });
      const utilizacoes = listarTodasUtilizacoes();
      expect(utilizacoes.length).toBe(2);
    });
    
    it('should return a copy, not the original array', () => {
      criarUtilizacao(mockUtilizacaoData);
      const list1 = listarTodasUtilizacoes();
      list1.pop(); // Modify the returned list
      const list2 = listarTodasUtilizacoes();
      expect(list2.length).toBe(1); // Original should be unchanged
    });
  });

  describe('buscarUtilizacaoAtivaPorAutomovelId', () => {
    it('should return utilizacao if automovel has active use (dataFim is null)', () => {
      uuidv4.mockReturnValueOnce('active-by-auto-id').mockReturnValueOnce('finished-by-auto-id');
      const utilizacaoAtiva = criarUtilizacao({ ...mockUtilizacaoData, automovelId: 'auto-active' });
      // Finaliza outra utilização para garantir que só uma está ativa
      const utilizacaoFinalizada = criarUtilizacao({ ...mockUtilizacaoData, automovelId: 'other-auto', dataInicio: new Date().toISOString() });
      atualizarUtilizacao(utilizacaoFinalizada.id, { dataFim: new Date().toISOString() });

      const encontrada = buscarUtilizacaoAtivaPorAutomovelId('auto-active');
      expect(encontrada).toEqual(expect.objectContaining({
        id: 'active-by-auto-id',
        automovelId: 'auto-active',
        motoristaId: mockUtilizacaoData.motoristaId,
        motivoUtilizacao: mockUtilizacaoData.motivoUtilizacao,
        dataInicio: expect.any(String),
        dataFim: null
      }));
    });

    it('should return undefined if automovel has no active use', () => {
      uuidv4.mockReturnValue('finished-by-auto-id');
      const utilizacaoFinalizada = criarUtilizacao({ ...mockUtilizacaoData, automovelId: 'auto-finished' });
      atualizarUtilizacao(utilizacaoFinalizada.id, { dataFim: new Date().toISOString() });

      const encontrada = buscarUtilizacaoAtivaPorAutomovelId('auto-finished');
      expect(encontrada).toBeUndefined();
    });
     it('should return undefined if automovelId does not exist', () => {
      const encontrada = buscarUtilizacaoAtivaPorAutomovelId('non-existent-auto-id');
      expect(encontrada).toBeUndefined();
    });
  });

  describe('buscarUtilizacaoAtivaPorMotoristaId', () => {
    it('should return utilizacao if motorista has active use (dataFim is null)', () => {
      uuidv4.mockReturnValueOnce('active-by-driver-id').mockReturnValueOnce('finished-by-driver-id');
      // Active use
      const utilizacaoAtiva = criarUtilizacao({ ...mockUtilizacaoData, motoristaId: 'driver-active', automovelId: 'other-auto' });
      // Finished use for same driver
      const utilizacaoFinalizada = criarUtilizacao({ ...mockUtilizacaoData, motoristaId: 'driver-active', automovelId: 'automovel-001', dataInicio: new Date().toISOString() });
      atualizarUtilizacao(utilizacaoFinalizada.id, { dataFim: new Date().toISOString() });

      const encontrada = buscarUtilizacaoAtivaPorMotoristaId('driver-active');
      expect(encontrada).toEqual(expect.objectContaining({
        id: 'active-by-driver-id',
        motoristaId: 'driver-active',
        automovelId: 'other-auto',
        motivoUtilizacao: mockUtilizacaoData.motivoUtilizacao,
        dataInicio: expect.any(String),
        dataFim: null
      }));
    });

    it('should return undefined if motorista has no active use', () => {
      uuidv4.mockReturnValue('finished-by-driver-id');
      const utilizacaoFinalizada = criarUtilizacao({ ...mockUtilizacaoData, motoristaId: 'driver-finished' });
      atualizarUtilizacao(utilizacaoFinalizada.id, { dataFim: new Date().toISOString() });
      
      const encontrada = buscarUtilizacaoAtivaPorMotoristaId('driver-finished');
      expect(encontrada).toBeUndefined();
    });
     it('should return undefined if motoristaId does not exist', () => {
      const encontrada = buscarUtilizacaoAtivaPorMotoristaId('non-existent-driver-id');
      expect(encontrada).toBeUndefined();
    });
  });

  describe('_limparUtilizacoes', () => {
    it('should clear all utilizacoes', () => {
      criarUtilizacao(mockUtilizacaoData);
      _limparUtilizacoes();
      expect(listarTodasUtilizacoes().length).toBe(0);
    });
  });
});
