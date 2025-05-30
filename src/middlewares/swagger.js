const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');
const fs = require('fs');

/**
 * Middleware para expor a documentação Swagger UI.
 * @param {Express.Application} app - Instância do Express
 * @param {Object} [options] - Opções adicionais
 * @param {string} [options.openapiPath] - Caminho para o arquivo OpenAPI YAML
 * @param {string} [options.route='/api-docs'] - Rota para expor a documentação
 */
function setupSwagger(app, options = {}) {
  const openapiPath =
    options.openapiPath ||
    process.env.OPENAPI_PATH ||
    path.join(__dirname, '../../openapi.yaml');
  const route = options.route || '/api-docs';

  const swaggerDocument = YAML.load(openapiPath);
  const swaggerOptions = {
    customSiteTitle: 'Controle de Automóveis API - Documentação',
    // customCss: '.swagger-ui .topbar { display: none }',
  };

  // Endpoint para servir o openapi.yaml bruto (útil para testes e integração)
  app.get(`${route}/swagger.yaml`, (req, res) => {
    try {
      const yamlContent = fs.readFileSync(openapiPath, 'utf8');
      res.set('Content-Type', 'application/x-yaml');
      res.send(yamlContent);
    } catch (err) {
      res.status(500).send('Erro ao ler o arquivo openapi.yaml');
    }
  });

  // Expor a documentação antes de middlewares restritivos
  app.use(
    route,
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, swaggerOptions)
  );
}

module.exports = setupSwagger; 