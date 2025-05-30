module.exports = {
  // Informa ao Jest para procurar módulos em node_modules e também no diretório src
  // Isso pode ajudar em alguns casos de resolução de módulo mais complexos.
  moduleDirectories: ['node_modules', 'src'],

  // Padrão de detecção de arquivos de teste
  testMatch: [
    '<rootDir>/tests/unit/**/*.test.js',
    '<rootDir>/tests/integration/**/*.test.js',
  ],

  // Ambiente de teste (Node.js é o padrão para backend)
  testEnvironment: 'node',

  // Cobertura de código
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.js', // Coletar cobertura de todos os arquivos JS em src
    '!src/server.js',    // Não coletar de server.js (geralmente ponto de entrada)
    '!src/app.js',       // Não coletar de app.js (configuração principal)
    '!src/utils/AppError.js', // Classes de erro são difíceis de cobrir significativamente em unidade
    // Adicionar outros arquivos/paths para excluir da cobertura se necessário
  ],

  // Limpar mocks entre cada teste
  clearMocks: true,
  rootDir: '.',
};
