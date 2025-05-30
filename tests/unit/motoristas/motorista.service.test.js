const motoristaService = require('../../../src/api/motoristas/motorista.service');
const motoristaRepository = require('../../../src/api/motoristas/motorista.repository');
const AppError = require('../../../src/utils/AppError');
const idGenerator = require('../../../src/utils/idGenerator'); // Importar

// Mock o repositório
jest.mock('../../../src/api/motoristas/motorista.repository');
// Mock idGenerator
jest.mock('../../../src/utils/idGenerator', () => jest.fn());

describe('Motorista Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    idGenerator.mockReturnValue('mocked-motorista-uuid'); // Configurar mock do idGenerator
  });

  describe('cadastrarNovoMotorista', () => {
    it('should call repository.criarMotorista and return the result', async () => {
      const dadosMotorista = { nome: 'Carlos Daniel' };
      const expectedMotorista = { id: 'mocked-motorista-uuid', ...dadosMotorista };
      // Mesmo que o idGenerator seja mockado, o teste aqui foca no retorno do criarMotorista mockado.
      motoristaRepository.criarMotorista.mockResolvedValue(expectedMotorista);

      const result = await motoristaService.cadastrarNovoMotorista(dadosMotorista);

      expect(motoristaRepository.criarMotorista).toHaveBeenCalledWith(dadosMotorista);
      expect(result).toEqual(expectedMotorista);
    });
  });

  describe('listarTodosMotoristas', () => {
    it('should call repository.listarMotoristas and return the result', async () => {
      const mockFiltros = { nome: 'Carlos' };
      const expectedLista = [{ id: 'driver-uuid-002', nome: 'Carlos Daniel' }];
      motoristaRepository.listarMotoristas.mockResolvedValue(expectedLista);

      const result = await motoristaService.listarTodosMotoristas(mockFiltros);

      expect(motoristaRepository.listarMotoristas).toHaveBeenCalledWith(mockFiltros);
      expect(result).toEqual(expectedLista);
    });
  });

  describe('buscarMotoristaPorIdentificador', () => {
    it('should return motorista if repository finds it', async () => {
      const mockId = 'driver-uuid-002';
      const expectedMotorista = { id: mockId, nome: 'Carlos Daniel' };
      motoristaRepository.buscarMotoristaPorId.mockResolvedValue(expectedMotorista);

      const result = await motoristaService.buscarMotoristaPorIdentificador(mockId);

      expect(motoristaRepository.buscarMotoristaPorId).toHaveBeenCalledWith(mockId);
      expect(result).toEqual(expectedMotorista);
    });

    it('should throw AppError if repository does not find motorista', async () => {
      const mockId = 'not-found-driver-id';
      motoristaRepository.buscarMotoristaPorId.mockResolvedValue(undefined);

      await expect(
        motoristaService.buscarMotoristaPorIdentificador(mockId)
      ).rejects.toThrow(new AppError('Motorista não encontrado', 404));
      expect(motoristaRepository.buscarMotoristaPorId).toHaveBeenCalledWith(mockId);
    });
  });

  describe('atualizarDadosMotorista', () => {
    const mockId = 'driver-uuid-003';
    const dadosUpdate = { nome: 'Carlos Daniel Atualizado' };
    const motoristaExistente = { id: mockId, nome: 'Carlos Daniel' };
    const motoristaAtualizadoEsperado = { ...motoristaExistente, ...dadosUpdate };

    it('should update and return motorista if repository finds and updates it', async () => {
      motoristaRepository.buscarMotoristaPorId.mockResolvedValue(motoristaExistente);
      motoristaRepository.atualizarMotorista.mockResolvedValue(motoristaAtualizadoEsperado);

      const result = await motoristaService.atualizarDadosMotorista(mockId, dadosUpdate);

      expect(motoristaRepository.buscarMotoristaPorId).toHaveBeenCalledWith(mockId);
      expect(motoristaRepository.atualizarMotorista).toHaveBeenCalledWith(mockId, dadosUpdate);
      expect(result).toEqual(motoristaAtualizadoEsperado);
    });

    it('should throw AppError if motorista to update is not found', async () => {
      motoristaRepository.buscarMotoristaPorId.mockResolvedValue(undefined);

      await expect(
        motoristaService.atualizarDadosMotorista(mockId, dadosUpdate)
      ).rejects.toThrow(new AppError('Motorista não encontrado para atualização', 404));
      expect(motoristaRepository.buscarMotoristaPorId).toHaveBeenCalledWith(mockId);
      expect(motoristaRepository.atualizarMotorista).not.toHaveBeenCalled();
    });
    
    it('should throw AppError if repository.atualizarMotorista returns null/falsy', async () => {
      motoristaRepository.buscarMotoristaPorId.mockResolvedValue(motoristaExistente);
      motoristaRepository.atualizarMotorista.mockResolvedValue(null); 

      await expect(
        motoristaService.atualizarDadosMotorista(mockId, dadosUpdate)
      ).rejects.toThrow(new AppError('Falha ao atualizar dados do motorista', 500));
    });
  });

  describe('removerMotorista', () => {
    const mockId = 'driver-uuid-004';
    const motoristaExistente = { id: mockId, nome: 'Juliana Paes' };

    it('should call repository.deletarMotorista and return true if successful', async () => {
      motoristaRepository.buscarMotoristaPorId.mockResolvedValue(motoristaExistente);
      motoristaRepository.deletarMotorista.mockResolvedValue(true);

      const result = await motoristaService.removerMotorista(mockId);

      expect(motoristaRepository.buscarMotoristaPorId).toHaveBeenCalledWith(mockId);
      expect(motoristaRepository.deletarMotorista).toHaveBeenCalledWith(mockId);
      expect(result).toBe(true);
    });

    it('should throw AppError if motorista to remove is not found', async () => {
      motoristaRepository.buscarMotoristaPorId.mockResolvedValue(undefined);

      await expect(
        motoristaService.removerMotorista(mockId)
      ).rejects.toThrow(new AppError('Motorista não encontrado para remoção', 404));
      expect(motoristaRepository.buscarMotoristaPorId).toHaveBeenCalledWith(mockId);
      expect(motoristaRepository.deletarMotorista).not.toHaveBeenCalled();
    });

    it('should throw AppError if repository.deletarMotorista returns false', async () => {
      motoristaRepository.buscarMotoristaPorId.mockResolvedValue(motoristaExistente);
      motoristaRepository.deletarMotorista.mockResolvedValue(false); 

      await expect(
        motoristaService.removerMotorista(mockId)
      ).rejects.toThrow(new AppError('Falha ao remover motorista', 500));
    });
  });
});
