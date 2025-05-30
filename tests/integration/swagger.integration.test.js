const fs = require('fs');
const path = require('path');
const YAML = require('yamljs');
const request = require('supertest');
const app = require('../../src/app');

function extractOpenApiCore(obj) {
  if (!obj) return {};
  return {
    openapi: obj.openapi,
    info: obj.info,
    servers: obj.servers,
    paths: obj.paths,
    components: obj.components,
    tags: obj.tags,
    security: obj.security,
    externalDocs: obj.externalDocs,
  };
}

function deepEqualTolerant(a, b) {
  if (a === b) return true;
  if (typeof a !== typeof b) return false;
  if (a == null || b == null) return a == b;
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return a.every((v, i) => deepEqualTolerant(v, b[i]));
  }
  if (typeof a === 'object' && typeof b === 'object') {
    const aKeys = Object.keys(a || {}).sort();
    const bKeys = Object.keys(b || {}).sort();
    if (aKeys.length !== bKeys.length) return false;
    return aKeys.every((k, i) =>
      k === bKeys[i] && deepEqualTolerant(a[k], b[k])
    );
  }
  return String(a) === String(b);
}

describe('Swagger API Documentation', () => {
  describe('GET /api-docs', () => {
    it('should return 200 OK and HTML content for Swagger UI', async () => {
      const response = await request(app).get('/api-docs/');
      expect(response.statusCode).toBe(200);
      expect(response.headers['content-type']).toMatch(/html/);
      expect(
        response.text.includes('<title>Swagger UI</title>') ||
        response.text.includes(
          '<title>Controle de Automóveis API - Documentação</title>'
        )
      ).toBe(true);
    });

    it('should redirect to /api-docs/ if accessed without trailing slash', async () => {
      const response = await request(app).get('/api-docs');
      expect(response.statusCode).toBe(301);
      expect(response.headers.location).toBe('/api-docs/');
    });
  });

  describe('Swagger OpenAPI YAML consistency', () => {
    it('should serve the same openapi.yaml via /api-docs/swagger.yaml', async () => {
      const response = await request(app).get('/api-docs/swagger.yaml');
      expect(response.statusCode).toBe(200);
      const servedYaml = response.text;
      const fileYaml = fs.readFileSync(
        path.join(__dirname, '../../openapi.yaml'),
        'utf8'
      );
      const servedObj = YAML.parse(servedYaml);
      const fileObj = YAML.parse(fileYaml);
      expect(deepEqualTolerant(extractOpenApiCore(servedObj), extractOpenApiCore(fileObj))).toBe(true);
    });
  });

  describe('Falha ao carregar o YAML do Swagger', () => {
    it('deve lidar com erro ao carregar o openapi.yaml', () => {
      jest.resetModules();
      jest.doMock('yamljs', () => ({
        load: () => {
          throw new Error('Falha ao carregar YAML');
        },
      }));
      // Importações após o mock para garantir uso do mock
      // eslint-disable-next-line global-require
      const express = require('express');
      // eslint-disable-next-line global-require
      const setupSwagger = require('../../src/middlewares/swagger');
      const appExpress = express();
      expect(() =>
        setupSwagger(appExpress, {
          openapiPath: 'caminho-invalido.yaml',
          route: '/docs-erro',
        })
      ).toThrow('Falha ao carregar YAML');
      jest.dontMock('yamljs');
    });
  });
});
