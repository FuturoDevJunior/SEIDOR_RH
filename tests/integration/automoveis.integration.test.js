const request = require('supertest');
const app = require('../../src/app');
const automovelRepository = require('../../src/api/automoveis/automovel.repository'); // To call _limparAutomoveis

describe('Automoveis API Integration Tests', () => {
  // Utility function to create a car for tests
  const criarAutomovelDirectly = (dados) => {
    // This bypasses service and controller, directly using repository
    // to ensure clean state or specific setup for some tests.
    // For most creation tests, we'll use the POST endpoint.
    return automovelRepository.criarAutomovel(dados);
  };

  beforeEach(() => {
    // Clear data before each test
    automovelRepository._limparAutomoveis();
  });

  afterAll(() => {
    // Optional: Clear data after all tests in this file if needed elsewhere
    automovelRepository._limparAutomoveis();
  });

  describe('POST /api/automoveis', () => {
    it('should create a new automovel and return 201', async () => {
      const novoAutomovel = {
        placa: 'INT-0001',
        cor: 'Verde Musgo',
        marca: 'Subaru',
      };
      const response = await request(app)
        .post('/api/automoveis')
        .send(novoAutomovel);

      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.placa).toBe(novoAutomovel.placa);
      expect(response.body.cor).toBe(novoAutomovel.cor);
      expect(response.body.marca).toBe(novoAutomovel.marca);
    });

    it('should return 400 if placa is missing', async () => {
      const response = await request(app)
        .post('/api/automoveis')
        .send({ cor: 'Azul', marca: 'Fiat' });
      expect(response.statusCode).toBe(400);
      expect(response.body.errors).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ msg: 'Placa is required', param: 'placa' })
        ])
      );
    });
    
    it('should return 400 if cor is missing', async () => {
      const response = await request(app)
        .post('/api/automoveis')
        .send({ placa: 'TST-0002', marca: 'Ford' });
      expect(response.statusCode).toBe(400);
       expect(response.body.errors).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ msg: 'Cor is required', param: 'cor' })
        ])
      );
    });

    it('should return 400 if marca is missing', async () => {
      const response = await request(app)
        .post('/api/automoveis')
        .send({ placa: 'TST-0003', cor: 'Preto' });
      expect(response.statusCode).toBe(400);
      expect(response.body.errors).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ msg: 'Marca is required', param: 'marca' })
        ])
      );
    });
  });

  describe('GET /api/automoveis', () => {
    it('should return an empty array if no automoveis exist', async () => {
      const response = await request(app).get('/api/automoveis');
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual([]);
    });

    it('should return all automoveis', async () => {
      criarAutomovelDirectly({ placa: 'INT-0010', cor: 'Prata', marca: 'Honda' });
      criarAutomovelDirectly({ placa: 'INT-0011', cor: 'Preto', marca: 'Toyota' });

      const response = await request(app).get('/api/automoveis');
      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBe(2);
      expect(response.body[0].placa).toBe('INT-0010');
      expect(response.body[1].placa).toBe('INT-0011');
    });

    it('should filter automoveis by cor', async () => {
      criarAutomovelDirectly({ placa: 'INT-0012', cor: 'Azul', marca: 'Hyundai' });
      criarAutomovelDirectly({ placa: 'INT-0013', cor: 'Branco', marca: 'Kia' });
      criarAutomovelDirectly({ placa: 'INT-0014', cor: 'Azul', marca: 'VW' });


      const response = await request(app).get('/api/automoveis?cor=Azul');
      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBe(2);
      expect(response.body.every(a => a.cor === 'Azul')).toBe(true);
    });

    it('should filter automoveis by marca (case-insensitive)', async () => {
      criarAutomovelDirectly({ placa: 'INT-0015', cor: 'Vermelho', marca: 'Ferrari' });
      criarAutomovelDirectly({ placa: 'INT-0016', cor: 'Amarelo', marca: 'Lamborghini' });
      criarAutomovelDirectly({ placa: 'INT-0017', cor: 'Preto', marca: 'ferrari' });

      const response = await request(app).get('/api/automoveis?marca=Ferrari');
      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBe(2);
      expect(response.body.every(a => a.marca.toLowerCase() === 'ferrari')).toBe(true);
    });
  });

  describe('GET /api/automoveis/:id', () => {
    it('should return 404 if automovel does not exist', async () => {
      const response = await request(app).get('/api/automoveis/non-existent-id');
      expect(response.statusCode).toBe(404);
      expect(response.body.message).toBe('Automóvel não encontrado');
    });

    it('should return the automovel if it exists', async () => {
      const automovel = criarAutomovelDirectly({ placa: 'INT-0020', cor: 'Roxo', marca: 'Porsche' });
      const response = await request(app).get(`/api/automoveis/${automovel.id}`);
      
      expect(response.statusCode).toBe(200);
      expect(response.body.id).toBe(automovel.id);
      expect(response.body.placa).toBe(automovel.placa);
    });
  });

  describe('PUT /api/automoveis/:id', () => {
    it('should return 404 if automovel to update does not exist', async () => {
      const dadosUpdate = { placa: 'UPD-0001', cor: 'Cinza', marca: 'Audi' };
      const response = await request(app)
        .put('/api/automoveis/non-existent-id')
        .send(dadosUpdate);
      expect(response.statusCode).toBe(404);
      expect(response.body.message).toBe('Automóvel não encontrado para atualização');
    });

    it('should return 400 if validation fails for update', async () => {
      const automovel = criarAutomovelDirectly({ placa: 'INT-0030', cor: 'Laranja', marca: 'McLaren' });
      const response = await request(app)
        .put(`/api/automoveis/${automovel.id}`)
        .send({ placa: '', cor: 'Preto', marca: 'BMW' }); // Empty placa

      expect(response.statusCode).toBe(400);
      expect(response.body.errors).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ msg: 'Placa is required', param: 'placa' })
        ])
      );
    });

    it('should update the automovel and return 200', async () => {
      const automovel = criarAutomovelDirectly({ placa: 'INT-0031', cor: 'Verde', marca: 'Jaguar' });
      const dadosUpdate = { placa: 'UPD-0031', cor: 'Azul Celeste', marca: 'Aston Martin' };
      
      const response = await request(app)
        .put(`/api/automoveis/${automovel.id}`)
        .send(dadosUpdate);

      expect(response.statusCode).toBe(200);
      expect(response.body.id).toBe(automovel.id);
      expect(response.body.placa).toBe(dadosUpdate.placa);
      expect(response.body.cor).toBe(dadosUpdate.cor);
      expect(response.body.marca).toBe(dadosUpdate.marca);

      // Verify in "DB"
      const automovelDoRepo = automovelRepository.buscarAutomovelPorId(automovel.id);
      expect(automovelDoRepo.placa).toBe(dadosUpdate.placa);
    });
  });

  describe('DELETE /api/automoveis/:id', () => {
    it('should return 404 if automovel to delete does not exist', async () => {
      const response = await request(app).delete('/api/automoveis/non-existent-id');
      expect(response.statusCode).toBe(404);
      expect(response.body.message).toBe('Automóvel não encontrado para remoção');
    });

    it('should delete the automovel and return 204', async () => {
      const automovel = criarAutomovelDirectly({ placa: 'INT-0040', cor: 'Dourado', marca: 'Rolls Royce' });
      
      const response = await request(app).delete(`/api/automoveis/${automovel.id}`);
      expect(response.statusCode).toBe(204);

      // Verify it's actually deleted
      const automovelDoRepo = automovelRepository.buscarAutomovelPorId(automovel.id);
      expect(automovelDoRepo).toBeUndefined();
    });
  });
});
