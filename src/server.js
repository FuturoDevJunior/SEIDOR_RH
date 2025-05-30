const dotenv = require('dotenv');

// Carrega variáveis de ambiente do .env apenas se não estiver em produção
// Em produção, as variáveis de ambiente são geralmente injetadas pelo provedor de hospedagem
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${PORT}`);
});
