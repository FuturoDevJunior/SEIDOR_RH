const express = require('express');
const path = require('path');
const fs = require('fs');
const request = require('supertest');
const YAML = require('yamljs');
const setupSwagger = require('../../../src/middlewares/swagger');

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

describe('setupSwagger middleware (unit)', () => {
  it('deve servir o openapi.yaml bruto em /api-docs/swagger.yaml', async () => {
    const app = express();
    const openapiPath = path.join(__dirname, '../../../openapi.yaml');
    setupSwagger(app, { openapiPath, route: '/api-docs' });
    const response = await request(app).get('/api-docs/swagger.yaml');
    expect(response.statusCode).toBe(200);
    expect(
      response.headers['content-type'].includes('yaml') ||
      response.headers['content-type'].includes('text/html')
    ).toBe(true);
    const fileYaml = fs.readFileSync(openapiPath, 'utf8');
    const servedYaml = response.text;
    const fileObj = YAML.parse(fileYaml);
    const servedObj = YAML.parse(servedYaml);
    expect(deepEqualTolerant(extractOpenApiCore(servedObj), extractOpenApiCore(fileObj))).toBe(true);
  });
}); 