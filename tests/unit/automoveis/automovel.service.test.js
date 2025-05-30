const automovelService = require('../../../src/api/automoveis/automovel.service');
const automovelRepository = require('../../../src/api/automoveis/automovel.repository');
const AppError = require('../../../src/utils/AppError');
const idGenerator = require('../../../src/utils/idGenerator'); // Import idGenerator

// Mock the repository
jest.mock('../../../src/api/automoveis/automovel.repository');
// Mock idGenerator
jest.mock('../../../src/utils/idGenerator', () => jest.fn());

describe('Automovel Service', () => {
  beforeEach(() => {
    // Clear all mock call counts and mock implementations after each test
    jest.clearAllMocks();
    // Configure idGenerator mock for tests that might involve creation via repository
    idGenerator.mockReturnValue('mocked-uuid-from-service-test');
  });

  // afterEach is removed as per instructions, jest.clearAllMocks() in beforeEach is enough

  describe('cadastrarNovoAutomovel', () => {
    it('should call repository.criarAutomovel and return the result', async () => {
      const dadosAutomovel = { placa: 'TES-0001', cor: 'Preto', marca: 'Tesla' };
      // The repository mock will be called by the service.
      // The repository itself uses idGenerator, but since the repository is mocked,
      // idGenerator's behavior within the actual repository code won't be hit directly from this service test.
      // However, if automovelRepository.criarAutomovel was NOT mocked and we were testing
      // the service's interaction with the *actual* repository, then mocking idGenerator
      // as done in beforeEach would be critical.
      // For this test, as repository.criarAutomovel is mocked, we define its return value directly.
      const expectedAutomovel = { id: 'mock-id-1', ...dadosAutomovel };
      automovelRepository.criarAutomovel.mockResolvedValue(expectedAutomovel); // Assuming async service

      const result = await automovelService.cadastrarNovoAutomovel(dadosAutomovel);

      expect(automovelRepository.criarAutomovel).toHaveBeenCalledWith(dadosAutomovel);
      expect(result).toEqual(expectedAutomovel);
    });
  });

  describe('listarTodosAutomoveis', () => {
    it('should call repository.listarAutomoveis and return the result', async () => {
      const mockFiltros = { marca: 'Tesla' };
      const expectedLista = [{ id: 'mock-id-1', placa: 'TES-0001', cor: 'Preto', marca: 'Tesla' }];
      automovelRepository.listarAutomoveis.mockResolvedValue(expectedLista); // Assuming async service

      const result = await automovelService.listarTodosAutomoveis(mockFiltros);

      expect(automovelRepository.listarAutomoveis).toHaveBeenCalledWith(mockFiltros);
      expect(result).toEqual(expectedLista);
    });
  });

  describe('buscarAutomovelPorIdentificador', () => {
    it('should return automovel if repository finds it', async () => {
      const mockId = 'mock-id-1';
      const expectedAutomovel = { id: mockId, placa: 'TES-0001', cor: 'Preto', marca: 'Tesla' };
      automovelRepository.buscarAutomovelPorId.mockResolvedValue(expectedAutomovel); // Assuming async service

      const result = await automovelService.buscarAutomovelPorIdentificador(mockId);

      expect(automovelRepository.buscarAutomovelPorId).toHaveBeenCalledWith(mockId);
      expect(result).toEqual(expectedAutomovel);
    });

    it('should throw AppError if repository does not find automovel', async () => {
      const mockId = 'not-found-id';
      automovelRepository.buscarAutomovelPorId.mockResolvedValue(undefined); // Assuming async service

      await expect(automovelService.buscarAutomovelPorIdentificador(mockId))
        .rejects.toThrow(new AppError('Automóvel não encontrado', 404));
      expect(automovelRepository.buscarAutomovelPorId).toHaveBeenCalledWith(mockId);
    });
  });

  describe('atualizarDadosAutomovel', () => {
    const mockId = 'mock-id-1';
    const dadosUpdate = { cor: 'Branco' };
    const automovelExistente = { id: mockId, placa: 'TES-0001', cor: 'Preto', marca: 'Tesla' };
    const automovelAtualizadoEsperado = { ...automovelExistente, ...dadosUpdate };

    it('should update and return automovel if repository finds and updates it', async () => {
      automovelRepository.buscarAutomovelPorId.mockResolvedValue(automovelExistente);
      automovelRepository.atualizarAutomovel.mockResolvedValue(automovelAtualizadoEsperado);

      const result = await automovelService.atualizarDadosAutomovel(mockId, dadosUpdate);

      expect(automovelRepository.buscarAutomovelPorId).toHaveBeenCalledWith(mockId);
      expect(automovelRepository.atualizarAutomovel).toHaveBeenCalledWith(mockId, dadosUpdate);
      expect(result).toEqual(automovelAtualizadoEsperado);
    });

    it('should throw AppError if automovel to update is not found', async () => {
      automovelRepository.buscarAutomovelPorId.mockResolvedValue(undefined);

      await expect(automovelService.atualizarDadosAutomovel(mockId, dadosUpdate))
        .rejects.toThrow(new AppError('Automóvel não encontrado para atualização', 404));
      expect(automovelRepository.buscarAutomovelPorId).toHaveBeenCalledWith(mockId);
      expect(automovelRepository.atualizarAutomovel).not.toHaveBeenCalled();
    });
    
    it('should throw AppError if repository.atualizarAutomovel returns null/falsy (defensive check)', async () => {
      automovelRepository.buscarAutomovelPorId.mockResolvedValue(automovelExistente);
      automovelRepository.atualizarAutomovel.mockResolvedValue(null); // Simulate a failure case post-check

      await expect(automovelService.atualizarDadosAutomovel(mockId, dadosUpdate))
        .rejects.toThrow(new AppError('Falha ao atualizar automóvel', 500));
      expect(automovelRepository.buscarAutomovelPorId).toHaveBeenCalledWith(mockId);
      expect(automovelRepository.atualizarAutomovel).toHaveBeenCalledWith(mockId, dadosUpdate);
    });
  });

  describe('removerAutomovel', () => {
    const mockId = 'mock-id-1';
    const automovelExistente = { id: mockId, placa: 'TES-0001', cor: 'Preto', marca: 'Tesla' };

    it('should call repository.deletarAutomovel and return true if successful', async () => {
      automovelRepository.buscarAutomovelPorId.mockResolvedValue(automovelExistente); // Corrected mock for this path
      automovelRepository.deletarAutomovel.mockResolvedValue(true);

      const result = await automovelService.removerAutomovel(mockId);

      // automovelService.removerAutomovel first calls automovelRepository.buscarAutomovelPorId
      expect(automovelRepository.buscarAutomovelPorId).toHaveBeenCalledWith(mockId);
      expect(automovelRepository.deletarAutomovel).toHaveBeenCalledWith(mockId);
      expect(result).toBe(true);
    });

    it('should throw AppError if automovel to remove is not found', async () => {
      automovelRepository.buscarAutomovelPorId.mockResolvedValue(undefined);

      await expect(automovelService.removerAutomovel(mockId))
        .rejects.toThrow(new AppError('Automóvel não encontrado para remoção', 404));
      expect(automovelRepository.buscarAutomovelPorId).toHaveBeenCalledWith(mockId);
      expect(automovelRepository.deletarAutomovel).not.toHaveBeenCalled();
    });

    it('should throw AppError if repository.deletarAutomovel returns false (defensive check)', async () => {
      automovelRepository.buscarAutomovelPorId.mockResolvedValue(automovelExistente);
      automovelRepository.deletarAutomovel.mockResolvedValue(false); // Simulate a failure case post-check

      await expect(automovelService.removerAutomovel(mockId))
        .rejects.toThrow(new AppError('Falha ao remover automóvel', 500));
      expect(automovelRepository.buscarAutomovelPorId).toHaveBeenCalledWith(mockId);
      expect(automovelRepository.deletarAutomovel).toHaveBeenCalledWith(mockId);
    });
  });
});
