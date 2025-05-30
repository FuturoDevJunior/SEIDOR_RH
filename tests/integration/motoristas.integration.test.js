const request = require('supertest');
const app = require('../../src/app');
const motoristaRepository = require('../../src/api/motoristas/motorista.repository'); // To call _limparMotoristas

describe('Motoristas API Integration Tests', () => {
  beforeEach(() => {
    motoristaRepository._limparMotoristas();
  });

  afterAll(() => {
    motoristaRepository._limparMotoristas();
  });

  describe('POST /api/motoristas', () => {
    it('should create a new motorista and return 201', async () => {
      const novoMotorista = { nome: 'Fernanda Lima' };
      const response = await request(app)
        .post('/api/motoristas')
        .send(novoMotorista);

      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.nome).toBe(novoMotorista.nome);
    });

    it('should return 400 if nome is missing', async () => {
      const response = await request(app)
        .post('/api/motoristas')
        .send({});
      expect(response.statusCode).toBe(400);
      expect(response.body.errors).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ msg: 'Nome is required', param: 'nome' })
        ])
      );
    });
    
    it('should return 400 if nome is not a string', async () => {
      const response = await request(app)
        .post('/api/motoristas')
        .send({ nome: 12345 });
      expect(response.statusCode).toBe(400);
      expect(response.body.errors).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ msg: 'Nome must be a string', param: 'nome' })
        ])
      );
    });
  });

  describe('GET /api/motoristas', () => {
    it('should return an empty array if no motoristas exist', async () => {
      const response = await request(app).get('/api/motoristas');
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual([]);
    });

    it('should return all motoristas', async () => {
      motoristaRepository.criarMotorista({ nome: 'Rodrigo Santoro' });
      motoristaRepository.criarMotorista({ nome: 'Alice Braga' });

      const response = await request(app).get('/api/motoristas');
      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBe(2);
      expect(response.body[0].nome).toBe('Rodrigo Santoro');
      expect(response.body[1].nome).toBe('Alice Braga');
    });

    it('should filter motoristas by nome (case-insensitive, partial match)', async () => {
      motoristaRepository.criarMotorista({ nome: 'Wagner Moura' });
      motoristaRepository.criarMotorista({ nome: 'Sonia Braga' });
      motoristaRepository.criarMotorista({ nome: 'Wagner Pires' });

      const response = await request(app).get('/api/motoristas?nome=Wagner');
      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBe(2);
      
      const response2 = await request(app).get('/api/motoristas?nome=braga');
      expect(response2.statusCode).toBe(200);
      expect(response2.body.length).toBe(1);
      expect(response2.body[0].nome).toBe('Sonia Braga');
    });
  });

  describe('GET /api/motoristas/:id', () => {
    it('should return 404 if motorista does not exist', async () => {
      const response = await request(app).get('/api/motoristas/non-existent-driver-id');
      expect(response.statusCode).toBe(404);
      expect(response.body.message).toBe('Motorista não encontrado');
    });

    it('should return the motorista if it exists', async () => {
      const motorista = motoristaRepository.criarMotorista({ nome: 'Lázaro Ramos' });
      const response = await request(app).get(`/api/motoristas/${motorista.id}`);
      
      expect(response.statusCode).toBe(200);
      expect(response.body.id).toBe(motorista.id);
      expect(response.body.nome).toBe(motorista.nome);
    });
  });

  describe('PUT /api/motoristas/:id', () => {
    it('should return 404 if motorista to update does not exist', async () => {
      const dadosUpdate = { nome: 'Novo Nome Fantástico' };
      const response = await request(app)
        .put('/api/motoristas/non-existent-driver-id')
        .send(dadosUpdate);
      expect(response.statusCode).toBe(404);
      expect(response.body.message).toBe('Motorista não encontrado para atualização');
    });

    it('should return 400 if validation fails for update (e.g. empty nome)', async () => {
      const motorista = motoristaRepository.criarMotorista({ nome: 'Bruno Garcia' });
      const response = await request(app)
        .put(`/api/motoristas/${motorista.id}`)
        .send({ nome: '' }); 

      expect(response.statusCode).toBe(400);
      expect(response.body.errors).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ msg: 'Nome is required', param: 'nome' })
        ])
      );
    });

    it('should update the motorista and return 200', async () => {
      const motorista = motoristaRepository.criarMotorista({ nome: 'Débora Falabella' });
      const dadosUpdate = { nome: 'Débora Nascimento Falabella' };
      
      const response = await request(app)
        .put(`/api/motoristas/${motorista.id}`)
        .send(dadosUpdate);

      expect(response.statusCode).toBe(200);
      expect(response.body.id).toBe(motorista.id);
      expect(response.body.nome).toBe(dadosUpdate.nome);

      const motoristaDoRepo = motoristaRepository.buscarMotoristaPorId(motorista.id);
      expect(motoristaDoRepo.nome).toBe(dadosUpdate.nome);
    });
  });

  describe('DELETE /api/motoristas/:id', () => {
    it('should return 404 if motorista to delete does not exist', async () => {
      const response = await request(app).delete('/api/motoristas/non-existent-driver-id');
      expect(response.statusCode).toBe(404);
      expect(response.body.message).toBe('Motorista não encontrado para remoção');
    });

    it('should delete the motorista and return 204', async () => {
      const motorista = motoristaRepository.criarMotorista({ nome: 'Vladimir Brichta' });
      
      const response = await request(app).delete(`/api/motoristas/${motorista.id}`);
      expect(response.statusCode).toBe(204);

      const motoristaDoRepo = motoristaRepository.buscarMotoristaPorId(motorista.id);
      expect(motoristaDoRepo).toBeUndefined();
    });
  });
});
