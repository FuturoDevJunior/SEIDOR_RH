const request = require('supertest');
const app = require('../../src/app');

describe('Health Check API', () => {
  describe('GET /health', () => {
    it('should return 200 OK with application status', async () => {
      const response = await request(app).get('/health');
      
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('status', 'UP');
      expect(response.body).toHaveProperty('timestamp');
      expect(response.body.message).toBe('Aplicação está operacional.');
      // Check if timestamp is a valid ISO string
      expect(new Date(response.body.timestamp).toISOString()).toBe(response.body.timestamp);
    });
  });
});
