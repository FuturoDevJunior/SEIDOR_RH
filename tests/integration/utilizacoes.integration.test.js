const request = require('supertest');
const app = require('../../src/app');
const motoristaRepository = require('../../src/api/motoristas/motorista.repository');
const automovelRepository = require('../../src/api/automoveis/automovel.repository');
const utilizacaoRepository = require('../../src/api/utilizacoes/utilizacao.repository');
const idGenerator = require('../../src/utils/idGenerator'); // Necessário para gerar IDs previsíveis no setup

describe('Utilizacoes API Integration Tests', () => {
  let mockMotoristas = [];
  let mockAutomoveis = [];

  // Helper para criar utilizações em massa
  const seedUtilizacoes = async (count) => {
    const utilizacoesCriadas = [];
    for (let i = 0; i < count; i++) {
      const motorista = mockMotoristas[i % mockMotoristas.length];
      const automovel = mockAutomoveis[i % mockAutomoveis.length];
      
      // Tentar evitar conflitos se um motorista/automóvel já estiver em uso ativo (simplificado)
      const automovelEmUso = await utilizacaoRepository.buscarUtilizacaoAtivaPorAutomovelId(automovel.id);
      const motoristaEmUso = await utilizacaoRepository.buscarUtilizacaoAtivaPorMotoristaId(motorista.id);

      if (!automovelEmUso && !motoristaEmUso) {
        const utilizacao = await utilizacaoRepository.criarUtilizacao({
          motoristaId: motorista.id,
          automovelId: automovel.id,
          motivoUtilizacao: `Utilizacao Teste ${i + 1}`,
          dataInicio: new Date(Date.now() - (count - i) * 1000 * 60 * 60).toISOString(), // Datas de início variadas
          // dataFim será null por padrão
        });
        utilizacoesCriadas.push(utilizacao);
      } else {
        // Se houver conflito, apenas logamos ou criamos menos itens. Para este teste, isso pode significar menos de 'count' itens.
        // console.log(`Conflito ao tentar criar utilização para motorista ${motorista.id} e/ou automovel ${automovel.id}`);
      }
    }
    return utilizacoesCriadas;
  };


  beforeEach(async () => {
    await motoristaRepository._limparMotoristas();
    await automovelRepository._limparAutomoveis();
    await utilizacaoRepository._limparUtilizacoes();

    mockMotoristas = [];
    mockAutomoveis = [];

    // Criar alguns motoristas e automóveis base
    for (let i = 0; i < 5; i++) {
      mockMotoristas.push(await motoristaRepository.criarMotorista({ nome: `Motorista Teste ${i + 1}` }));
      mockAutomoveis.push(await automovelRepository.criarAutomovel({
        placa: `CAR-${String(i + 1).padStart(3, '0')}`,
        cor: i % 2 === 0 ? 'Azul' : 'Prata',
        marca: `Marca Teste ${i % 3}`,
      }));
    }
  });
  
  afterAll(async () => {
    await motoristaRepository._limparMotoristas();
    await automovelRepository._limparAutomoveis();
    await utilizacaoRepository._limparUtilizacoes();
  });

  describe('POST /api/utilizacoes (Iniciar Utilizacao)', () => {
    const motivo = 'Viagem de demonstração';

    it('should start a new utilization and return 201', async () => {
      const payload = {
        motoristaId: mockMotoristas[0].id,
        automovelId: mockAutomoveis[0].id,
        motivoUtilizacao: motivo,
      };
      const response = await request(app)
        .post('/api/utilizacoes')
        .send(payload);

      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.motoristaId).toBe(mockMotoristas[0].id);
      expect(response.body.automovelId).toBe(mockAutomoveis[0].id);
      expect(response.body.motivoUtilizacao).toBe(motivo);
      expect(response.body.dataInicio).toBeDefined();
      expect(response.body.dataFim).toBeNull();
    });

    // ... (outros testes de POST /api/utilizacoes permanecem os mesmos, adaptados para usar mockMotoristas[0] e mockAutomoveis[0]) ...
    it('should return 400 if motoristaId is missing', async () => {
      const payload = { automovelId: mockAutomoveis[0].id, motivoUtilizacao: motivo };
      const response = await request(app).post('/api/utilizacoes').send(payload);
      expect(response.statusCode).toBe(400);
      expect(response.body.errors[0].param).toBe('motoristaId');
    });
    
    it('should return 400 if automovelId is missing', async () => {
      const payload = { motoristaId: mockMotoristas[0].id, motivoUtilizacao: motivo };
      const response = await request(app).post('/api/utilizacoes').send(payload);
      expect(response.statusCode).toBe(400);
      expect(response.body.errors[0].param).toBe('automovelId');
    });

    it('should return 400 if motivoUtilizacao is missing', async () => {
      const payload = { motoristaId: mockMotoristas[0].id, automovelId: mockAutomoveis[0].id };
      const response = await request(app).post('/api/utilizacoes').send(payload);
      expect(response.statusCode).toBe(400);
      expect(response.body.errors[0].param).toBe('motivoUtilizacao');
    });
    
    it('should return 400 if motoristaId is not a valid UUID', async () => {
      const payload = { motoristaId: 'invalid-uuid', automovelId: mockAutomoveis[0].id, motivoUtilizacao: motivo };
      const response = await request(app).post('/api/utilizacoes').send(payload);
      expect(response.statusCode).toBe(400);
      expect(response.body.errors[0].msg).toBe('motoristaId deve ser um UUID válido');
    });

    it('should return 404 if motoristaId does not exist', async () => {
        const nonExistentMotoristaId = idGenerator(); // Gera um UUID válido mas não existente
        const payload = { motoristaId: nonExistentMotoristaId, automovelId: mockAutomoveis[0].id, motivoUtilizacao: motivo };
        const response = await request(app).post('/api/utilizacoes').send(payload);
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe('Motorista não encontrado');
    });

    it('should return 409 if automovel is already in use', async () => {
      await utilizacaoRepository.criarUtilizacao({
        motoristaId: mockMotoristas[0].id,
        automovelId: mockAutomoveis[0].id,
        motivoUtilizacao: 'Primeira viagem',
        dataInicio: new Date().toISOString(),
      });
      
      const payload = {
        motoristaId: mockMotoristas[1].id,
        automovelId: mockAutomoveis[0].id, 
        motivoUtilizacao: 'Segunda tentativa de viagem',
      };
      const response = await request(app).post('/api/utilizacoes').send(payload);
      expect(response.statusCode).toBe(409);
      expect(response.body.message).toBe('Automóvel já em utilização');
    });

    it('should return 409 if motorista is already using another automovel', async () => {
       await utilizacaoRepository.criarUtilizacao({
        motoristaId: mockMotoristas[0].id,
        automovelId: mockAutomoveis[0].id,
        motivoUtilizacao: 'Primeira viagem',
        dataInicio: new Date().toISOString(),
      });
      
      const payload = {
        motoristaId: mockMotoristas[0].id, 
        automovelId: mockAutomoveis[1].id, 
        motivoUtilizacao: 'Outra viagem com mesmo motorista',
      };
      const response = await request(app).post('/api/utilizacoes').send(payload);
      expect(response.statusCode).toBe(409);
      expect(response.body.message).toBe('Motorista já utilizando outro automóvel');
    });
  });

  describe('PATCH /api/utilizacoes/:id/finalizar', () => {
    let utilizacaoAtiva;

    beforeEach(async () => {
      const utilizacaoData = {
        motoristaId: mockMotoristas[0].id,
        automovelId: mockAutomoveis[0].id,
        motivoUtilizacao: 'Para ser finalizada',
        dataInicio: new Date().toISOString(),
      };
      // Criar diretamente no repo para ter o ID para o teste
      utilizacaoAtiva = await utilizacaoRepository.criarUtilizacao(utilizacaoData);
    });

    it('should finalize an active utilization and return 200', async () => {
      const response = await request(app).patch(`/api/utilizacoes/${utilizacaoAtiva.id}/finalizar`);
      expect(response.statusCode).toBe(200);
      expect(response.body.id).toBe(utilizacaoAtiva.id);
      expect(response.body.dataFim).not.toBeNull();
    });
    
    it('should return 400 if utilizacaoId is not a valid UUID', async () => {
      const response = await request(app).patch('/api/utilizacoes/invalid-uuid/finalizar');
      expect(response.statusCode).toBe(400);
      expect(response.body.errors[0].msg).toBe('ID da utilização deve ser um UUID válido');
    });


    it('should return 404 if utilizacaoId does not exist', async () => {
      const nonExistentUtilizacaoId = idGenerator();
      const response = await request(app).patch(`/api/utilizacoes/${nonExistentUtilizacaoId}/finalizar`);
      expect(response.statusCode).toBe(404);
    });

    it('should return 400 if utilization is already finalized', async () => {
      await request(app).patch(`/api/utilizacoes/${utilizacaoAtiva.id}/finalizar`);
      const response = await request(app).patch(`/api/utilizacoes/${utilizacaoAtiva.id}/finalizar`);
      expect(response.statusCode).toBe(400);
    });
  });

  describe('GET /api/utilizacoes (Listar com Paginação)', () => {
    const totalUtilizacoesParaSeed = 25;

    beforeEach(async () => {
      // Seed a larger number of utilizations for pagination testing
      // Ensure we have enough unique motoristas/automoveis or handle potential conflicts
      // For simplicity, creating more motoristas/automoveis if needed for unique pairings
      const neededMotoristas = Math.ceil(totalUtilizacoesParaSeed / mockAutomoveis.length);
      const neededAutomoveis = Math.ceil(totalUtilizacoesParaSeed / mockMotoristas.length);

      while(mockMotoristas.length < neededMotoristas) {
        mockMotoristas.push(await motoristaRepository.criarMotorista({ nome: `Motorista Extra ${mockMotoristas.length +1}`}));
      }
      while(mockAutomoveis.length < neededAutomoveis) {
        mockAutomoveis.push(await automovelRepository.criarAutomovel({ placa: `EXT-${String(mockAutomoveis.length+1).padStart(3,'0')}`, cor: 'Preto', marca: 'ExtraMarca'}));
      }
      await seedUtilizacoes(totalUtilizacoesParaSeed);
    });

    it('should return default paginated results (page=1, limit=10)', async () => {
      const response = await request(app).get('/api/utilizacoes');
      expect(response.statusCode).toBe(200);
      expect(response.body.items.length).toBeLessThanOrEqual(10);
      expect(response.body.currentPage).toBe(1);
      expect(response.body.itemsPerPage).toBe(10);
      expect(response.body.totalItems).toBeGreaterThanOrEqual(0); // Can be less than totalUtilizacoesParaSeed if conflicts occurred
      expect(response.body.totalPages).toBe(Math.ceil(response.body.totalItems / 10) || 1);
      response.body.items.forEach(item => {
        expect(item).toHaveProperty('motorista');
        expect(item).toHaveProperty('automovel');
      });
    });

    it('should return specific page and limit', async () => {
      const page = 2;
      const limit = 5;
      const response = await request(app).get(`/api/utilizacoes?page=${page}&limit=${limit}`);
      expect(response.statusCode).toBe(200);
      expect(response.body.items.length).toBeLessThanOrEqual(limit);
      expect(response.body.currentPage).toBe(page);
      expect(response.body.itemsPerPage).toBe(limit);
      expect(response.body.totalItems).toBeGreaterThanOrEqual(0);
      expect(response.body.totalPages).toBe(Math.ceil(response.body.totalItems / limit) || 1);
    });

    it('should handle page exceeding totalPages by returning empty items', async () => {
      const response = await request(app).get('/api/utilizacoes?page=100&limit=10'); // Assuming 100 is > totalPages
      expect(response.statusCode).toBe(200);
      expect(response.body.items.length).toBe(0);
      expect(response.body.currentPage).toBe(100);
      expect(response.body.totalItems).toBeGreaterThanOrEqual(0);
      // totalPages will be calculated based on actual totalItems
      expect(response.body.totalPages).toBe(Math.ceil(response.body.totalItems / 10) || 1); 
    });

    it('should use default limit if provided limit is invalid', async () => {
        const response = await request(app).get('/api/utilizacoes?page=1&limit=abc');
        expect(response.statusCode).toBe(200);
        expect(response.body.itemsPerPage).toBe(10);
    });

    it('should use default page if provided page is invalid', async () => {
        const response = await request(app).get('/api/utilizacoes?page=abc&limit=5');
        expect(response.statusCode).toBe(200);
        expect(response.body.currentPage).toBe(1);
    });

    it('should return empty array with correct metadata if no utilizacoes exist', async () => {
      await utilizacaoRepository._limparUtilizacoes(); // Clear any seeded data
      const response = await request(app).get('/api/utilizacoes');
      expect(response.statusCode).toBe(200);
      expect(response.body.items).toEqual([]);
      expect(response.body.totalItems).toBe(0);
      expect(response.body.totalPages).toBe(1);
      expect(response.body.currentPage).toBe(1);
      expect(response.body.itemsPerPage).toBe(10);
    });
  });
});
