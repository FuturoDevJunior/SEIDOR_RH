const utilizacaoService = require('../../../src/api/utilizacoes/utilizacao.service');
const utilizacaoRepository = require('../../../src/api/utilizacoes/utilizacao.repository');
const automovelRepository = require('../../../src/api/automoveis/automovel.repository');
const motoristaRepository = require('../../../src/api/motoristas/motorista.repository');
const AppError = require('../../../src/utils/AppError');
const idGenerator = require('../../../src/utils/idGenerator');

// Mock repositories and idGenerator
jest.mock('../../../src/api/utilizacoes/utilizacao.repository');
jest.mock('../../../src/api/automoveis/automovel.repository');
jest.mock('../../../src/api/motoristas/motorista.repository');
jest.mock('../../../src/utils/idGenerator', () => jest.fn());

describe('Utilizacao Service', () => {
  const mockMotoristaId = 'driver-001';
  const mockAutomovelId = 'car-001';
  const mockUtilizacaoId = 'usage-001';
  const mockMotivo = 'Entrega de material';

  const mockMotorista = { id: mockMotoristaId, nome: 'Carlos Sainz' };
  const mockAutomovel = { id: mockAutomovelId, placa: 'FEA-5500', marca: 'Ferrari', cor: 'Vermelho' };
  const dateNowISO = new Date().toISOString();

  beforeEach(() => {
    jest.clearAllMocks();
    idGenerator.mockReturnValue(mockUtilizacaoId);

    motoristaRepository.buscarMotoristaPorId.mockResolvedValue(mockMotorista);
    automovelRepository.buscarAutomovelPorId.mockResolvedValue(mockAutomovel);
    utilizacaoRepository.buscarUtilizacaoAtivaPorAutomovelId.mockResolvedValue(null);
    utilizacaoRepository.buscarUtilizacaoAtivaPorMotoristaId.mockResolvedValue(null);
    utilizacaoRepository.criarUtilizacao.mockImplementation(dados => Promise.resolve({
      id: idGenerator(),
      ...dados,
      dataFim: null,
    }));
  });

  // Testes para iniciarUtilizacaoAutomovel e finalizarUtilizacaoAutomovel permanecem os mesmos
  // ... (copie os describes de iniciarUtilizacaoAutomovel e finalizarUtilizacaoAutomovel do conteúdo anterior aqui)
  describe('iniciarUtilizacaoAutomovel', () => {
    const validPayload = { 
      motoristaId: mockMotoristaId, 
      automovelId: mockAutomovelId, 
      motivoUtilizacao: mockMotivo 
    };

    it('should create and return a new utilizacao if all checks pass', async () => {
      const result = await utilizacaoService.iniciarUtilizacaoAutomovel(validPayload);
      
      expect(motoristaRepository.buscarMotoristaPorId).toHaveBeenCalledWith(mockMotoristaId);
      expect(automovelRepository.buscarAutomovelPorId).toHaveBeenCalledWith(mockAutomovelId);
      expect(utilizacaoRepository.buscarUtilizacaoAtivaPorAutomovelId).toHaveBeenCalledWith(mockAutomovelId);
      expect(utilizacaoRepository.buscarUtilizacaoAtivaPorMotoristaId).toHaveBeenCalledWith(mockMotoristaId);
      expect(utilizacaoRepository.criarUtilizacao).toHaveBeenCalledWith(expect.objectContaining({
        ...validPayload,
        dataInicio: expect.any(String), 
      }));
      expect(idGenerator).toHaveBeenCalledTimes(1);
      expect(result).toHaveProperty('id', mockUtilizacaoId);
      expect(result.motivoUtilizacao).toBe(mockMotivo);
      expect(result.dataFim).toBeNull();
    });

    it('should throw AppError if motorista is not found', async () => {
      motoristaRepository.buscarMotoristaPorId.mockResolvedValue(null);
      await expect(utilizacaoService.iniciarUtilizacaoAutomovel(validPayload))
        .rejects.toThrow(new AppError('Motorista não encontrado', 404));
    });

    it('should throw AppError if automovel is not found', async () => {
      automovelRepository.buscarAutomovelPorId.mockResolvedValue(null);
      await expect(utilizacaoService.iniciarUtilizacaoAutomovel(validPayload))
        .rejects.toThrow(new AppError('Automóvel não encontrado', 404));
    });

    it('should throw AppError if automovel is already in use', async () => {
      utilizacaoRepository.buscarUtilizacaoAtivaPorAutomovelId.mockResolvedValue({ id: 'another-usage-id' });
      await expect(utilizacaoService.iniciarUtilizacaoAutomovel(validPayload))
        .rejects.toThrow(new AppError('Automóvel já em utilização', 409));
    });

    it('should throw AppError if motorista is already using another automovel', async () => {
      utilizacaoRepository.buscarUtilizacaoAtivaPorMotoristaId.mockResolvedValue({ id: 'yet-another-usage-id' });
      await expect(utilizacaoService.iniciarUtilizacaoAutomovel(validPayload))
        .rejects.toThrow(new AppError('Motorista já utilizando outro automóvel', 409));
    });
  });

  describe('finalizarUtilizacaoAutomovel', () => {
    const mockUtilizacaoAtiva = {
      id: mockUtilizacaoId,
      motoristaId: mockMotoristaId,
      automovelId: mockAutomovelId,
      motivoUtilizacao: mockMotivo,
      dataInicio: new Date(new Date().getTime() - 3600000).toISOString(), 
      dataFim: null,
    };

    it('should finalize and return utilizacao if found and not already finalized', async () => {
      utilizacaoRepository.buscarUtilizacaoPorId.mockResolvedValue(mockUtilizacaoAtiva);
      utilizacaoRepository.atualizarUtilizacao.mockImplementation((id, data) => Promise.resolve({
        ...mockUtilizacaoAtiva, 
        ...data 
      }));

      const result = await utilizacaoService.finalizarUtilizacaoAutomovel(mockUtilizacaoId);

      expect(utilizacaoRepository.buscarUtilizacaoPorId).toHaveBeenCalledWith(mockUtilizacaoId);
      expect(utilizacaoRepository.atualizarUtilizacao).toHaveBeenCalledWith(mockUtilizacaoId, {
        dataFim: expect.any(String),
      });
      expect(result.id).toBe(mockUtilizacaoId);
      expect(result.dataFim).not.toBeNull();
      expect(new Date(result.dataFim).getTime()).toBeGreaterThanOrEqual(new Date(mockUtilizacaoAtiva.dataInicio).getTime());
    });

    it('should throw AppError if utilizacao is not found', async () => {
      utilizacaoRepository.buscarUtilizacaoPorId.mockResolvedValue(null);
      await expect(utilizacaoService.finalizarUtilizacaoAutomovel("some-other-id"))
        .rejects.toThrow(new AppError('Registro de utilização não encontrado', 404));
    });

    it('should throw AppError if utilizacao is already finalized', async () => {
      const mockUtilizacaoFinalizada = { ...mockUtilizacaoAtiva, dataFim: dateNowISO };
      utilizacaoRepository.buscarUtilizacaoPorId.mockResolvedValue(mockUtilizacaoFinalizada);
      
      await expect(utilizacaoService.finalizarUtilizacaoAutomovel(mockUtilizacaoId))
        .rejects.toThrow(new AppError('Utilização já finalizada', 400));
    });
    
    it('should throw AppError if atualizarUtilizacao fails (defensive)', async () => {
      utilizacaoRepository.buscarUtilizacaoPorId.mockResolvedValue(mockUtilizacaoAtiva);
      utilizacaoRepository.atualizarUtilizacao.mockResolvedValue(null); 
      
      await expect(utilizacaoService.finalizarUtilizacaoAutomovel(mockUtilizacaoId))
        .rejects.toThrow(new AppError('Falha ao finalizar utilização', 500));
    });
  });


  describe('listarRegistrosDeUtilizacao', () => {
    // Cria um array de 25 mock de utilizações para testar paginação
    const totalMockItems = 25;
    const mockUtilizacoesList = Array.from({ length: totalMockItems }, (_, i) => ({
      id: `usage-${i + 1}`,
      motoristaId: `driver-${i % 5 + 1}`, // Cycle through 5 drivers
      automovelId: `car-${i % 3 + 1}`,   // Cycle through 3 cars
      dataInicio: new Date(new Date().getTime() - (totalMockItems - i) * 3600000).toISOString(),
      dataFim: i % 2 === 0 ? new Date(new Date().getTime() - (totalMockItems - i - 1) * 3600000).toISOString() : null,
      motivoUtilizacao: `Motivo ${i + 1}`,
    }));

    // Mock para _popularDetalhesUtilizacao (simplificado para estes testes)
    const mockPopularDetalhes = jest.fn(utilizacao => Promise.resolve({
        ...utilizacao,
        motorista: { id: utilizacao.motoristaId, nome: 'Nome Mock Motorista' },
        automovel: { id: utilizacao.automovelId, placa: 'ABC-123', marca: 'Marca Mock', cor: 'Cor Mock' },
    }));
    
    // Sobrescrever o mock de _popularDetalhesUtilizacao que está no mesmo módulo de listarRegistrosDeUtilizacao
    // Esta é uma forma de mockar uma função privada dentro do mesmo módulo para testes.
    // No entanto, como _popularDetalhesUtilizacao não é exportada, precisamos de uma abordagem diferente
    // ou testar o efeito de listarRegistrosDeUtilizacao como um todo, incluindo a população.
    // Para este teste, vamos assumir que _popularDetalhesUtilizacao funciona como esperado
    // e focar nos aspectos de paginação. O mock de listarTodasUtilizacoes no repositório é o crucial.

    beforeEach(() => {
      // Configurar o mock do repositório para simular paginação
      utilizacaoRepository.listarTodasUtilizacoes.mockImplementation(({ limit, offset } = {}) => {
        const total = mockUtilizacoesList.length;
        let items = [...mockUtilizacoesList];
        if (typeof limit === 'number' && typeof offset === 'number' && limit > 0 && offset >= 0) {
          items = items.slice(offset, offset + limit);
        }
        return Promise.resolve({ totalItems: total, items });
      });

      // Mock para as buscas de motorista e automovel usadas por _popularDetalhesUtilizacao
      motoristaRepository.buscarMotoristaPorId.mockImplementation(id => 
        Promise.resolve({ id, nome: `Motorista ${id}` })
      );
      automovelRepository.buscarAutomovelPorId.mockImplementation(id => 
        Promise.resolve({ id, placa: `CAR-${id}`, marca: 'Marca Teste', cor: 'Cor Teste' })
      );
    });

    it('should return default paginated results when no params are given (page=1, limit=10)', async () => {
      const result = await utilizacaoService.listarRegistrosDeUtilizacao();
      
      expect(utilizacaoRepository.listarTodasUtilizacoes).toHaveBeenCalledWith({ limit: 10, offset: 0 });
      expect(result.items.length).toBe(10);
      expect(result.currentPage).toBe(1);
      expect(result.itemsPerPage).toBe(10);
      expect(result.totalItems).toBe(totalMockItems);
      expect(result.totalPages).toBe(Math.ceil(totalMockItems / 10)); // 25 / 10 = 2.5 -> 3
      expect(result.items[0].motivoUtilizacao).toBe('Motivo 1');
    });

    it('should return specific page and limit', async () => {
      const page = 2;
      const limit = 5;
      const result = await utilizacaoService.listarRegistrosDeUtilizacao({ page, limit });

      expect(utilizacaoRepository.listarTodasUtilizacoes).toHaveBeenCalledWith({ limit: 5, offset: 5 });
      expect(result.items.length).toBe(5);
      expect(result.currentPage).toBe(page);
      expect(result.itemsPerPage).toBe(limit);
      expect(result.totalItems).toBe(totalMockItems);
      expect(result.totalPages).toBe(Math.ceil(totalMockItems / limit)); // 25 / 5 = 5
      expect(result.items[0].motivoUtilizacao).toBe('Motivo 6'); // (page-1)*limit + 1
    });

    it('should handle invalid page (e.g., 0, "abc") by defaulting to page 1', async () => {
      const resultPage0 = await utilizacaoService.listarRegistrosDeUtilizacao({ page: 0, limit: 5 });
      expect(utilizacaoRepository.listarTodasUtilizacoes).toHaveBeenCalledWith({ limit: 5, offset: 0 });
      expect(resultPage0.currentPage).toBe(1);

      const resultPageAbc = await utilizacaoService.listarRegistrosDeUtilizacao({ page: "abc", limit: 5 });
      expect(utilizacaoRepository.listarTodasUtilizacoes).toHaveBeenCalledWith({ limit: 5, offset: 0 });
      expect(resultPageAbc.currentPage).toBe(1);
    });

    it('should handle invalid limit (e.g., 0, "abc") by defaulting to limit 10', async () => {
      const resultLimit0 = await utilizacaoService.listarRegistrosDeUtilizacao({ page: 1, limit: 0 });
      expect(utilizacaoRepository.listarTodasUtilizacoes).toHaveBeenCalledWith({ limit: 10, offset: 0 });
      expect(resultLimit0.itemsPerPage).toBe(10);

      const resultLimitAbc = await utilizacaoService.listarRegistrosDeUtilizacao({ page: 1, limit: "abc" });
      expect(utilizacaoRepository.listarTodasUtilizacoes).toHaveBeenCalledWith({ limit: 10, offset: 0 });
      expect(resultLimitAbc.itemsPerPage).toBe(10);
    });
    
    it('should handle page exceeding totalPages by returning last valid page or empty items', async () => {
      // Com 25 itens e limite 10, totalPages = 3. Pedindo página 4.
      // O serviço deve calcular o offset para a página 4 (offset = 30)
      // O repositório mockado retornará items vazios pois mockUtilizacoesList.slice(30, 30 + 10) é []
      const result = await utilizacaoService.listarRegistrosDeUtilizacao({ page: 4, limit: 10 });
      
      expect(utilizacaoRepository.listarTodasUtilizacoes).toHaveBeenCalledWith({ limit: 10, offset: 30 });
      expect(result.items.length).toBe(0); // Nenhum item na página que não existe
      expect(result.currentPage).toBe(4);   // Mantém a página solicitada
      expect(result.totalPages).toBe(3);   // Total de páginas correto
      expect(result.totalItems).toBe(totalMockItems);
    });

    it('should return correct pagination metadata when totalItems is 0', async () => {
      // Configurar mock para retornar 0 itens
      utilizacaoRepository.listarTodasUtilizacoes.mockResolvedValue({ totalItems: 0, items: [] });
      
      const result = await utilizacaoService.listarRegistrosDeUtilizacao({ page: 1, limit: 10 });
      
      expect(result.items.length).toBe(0);
      expect(result.totalItems).toBe(0);
      expect(result.totalPages).toBe(1); // Garante pelo menos 1 página
      expect(result.currentPage).toBe(1);
      expect(result.itemsPerPage).toBe(10);
    });

     it('should correctly populate details for paginated items', async () => {
      const page = 1;
      const limit = 3;
      const result = await utilizacaoService.listarRegistrosDeUtilizacao({ page, limit });

      expect(result.items.length).toBe(3);
      expect(result.items[0]).toHaveProperty('motorista');
      expect(result.items[0]).toHaveProperty('automovel');
      expect(result.items[0].motorista.id).toBe(mockUtilizacoesList[0].motoristaId);
      expect(result.items[0].automovel.id).toBe(mockUtilizacoesList[0].automovelId);
    });
  });
});
