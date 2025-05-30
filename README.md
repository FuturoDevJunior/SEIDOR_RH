<!-- LOGO -->
<p align="center">
  <img src="./vec_api_logo.png" alt="Logo do Controle de Automóveis API" width="220"/>
</p>

<!-- BADGES -->
<p align="center">
  <a href="https://nodejs.org/en"><img src="https://img.shields.io/badge/Node.js-18.x-green?style=for-the-badge&logo=node.js" alt="Node.js"></a>
  <a href="https://www.npmjs.com/"><img src="https://img.shields.io/badge/NPM->=9.x-red?style=for-the-badge&logo=npm" alt="NPM"></a>
  <a href="#testes"><img src="https://img.shields.io/badge/Testes-Jest%20%26%20Supertest-blueviolet?style=for-the-badge&logo=jest" alt="Jest"></a>
  <a href="#docker"><img src="https://img.shields.io/badge/Docker-ready-blue?style=for-the-badge&logo=docker" alt="Docker"></a>
  <a href="#deploy-render"><img src="https://img.shields.io/badge/Deploy-Render.com-46a2f1?style=for-the-badge&logo=render" alt="Render"></a>
  <a href="./openapi.yaml"><img src="https://img.shields.io/badge/OpenAPI-3.0-yellow?style=for-the-badge&logo=swagger" alt="OpenAPI"></a>
  <a href="#licenca"><img src="https://img.shields.io/badge/Licença-ISC-brightgreen?style=for-the-badge" alt="ISC"></a>
  <a href="https://github.com/devferreirag/Saidor/commits/main"><img src="https://img.shields.io/github/last-commit/devferreirag/Saidor?style=for-the-badge" alt="Último commit"></a>
  <a href="https://github.com/devferreirag/Saidor/issues"><img src="https://img.shields.io/github/issues/devferreirag/Saidor?style=for-the-badge" alt="Issues"></a>
  <a href="https://github.com/devferreirag/Saidor/pulls"><img src="https://img.shields.io/github/issues-pr/devferreirag/Saidor?style=for-the-badge" alt="PRs"></a>
  <a href="https://github.com/devferreirag/Saidor/graphs/contributors"><img src="https://img.shields.io/github/contributors/devferreirag/Saidor?style=for-the-badge" alt="Contribuidores"></a>
</p>

---

# Controle de Automóveis API

API RESTful moderna, escalável e pronta para produção, focada em excelência de código, experiência do desenvolvedor e robustez de produto.

<p align="center">
  <a href="https://seidor-rh.onrender.com" target="_blank"><b>🌐 Teste a demonstração online</b></a>
</p>

---

## 📑 Sumário

- [Visão Geral](#visão-geral)
- [Por que este projeto é diferente?](#por-que-este-projeto-é-diferente)
- [Demonstração Online](#demonstração-online)
- [Principais Funcionalidades](#principais-funcionalidades)
- [Arquitetura e Tecnologias](#arquitetura-e-tecnologias)
- [Instalação e Execução](#instalação-e-execução)
- [Documentação da API](#documentação-da-api)
- [Exemplos de Uso](#exemplos-de-uso)
- [Testes e Cobertura](#testes-e-cobertura)
- [Contribuição](#contribuição)
- [Roadmap](#roadmap)
- [Licença](#licença)
- [Contato e Reconhecimentos](#contato-e-reconhecimentos)

---

## 🚗 Visão Geral

O **Controle de Automóveis API** é uma solução completa para gestão de frotas, motoristas e utilizações, desenhada para ser referência em qualidade, clareza e escalabilidade. O projeto foi desenvolvido com foco em Clean Code, SOLID, testes automatizados e documentação profissional — tudo para garantir facilidade de manutenção, evolução e integração em ambientes reais.

---

## ✨ Por que este projeto é diferente?

- **Visão de Produto:** Não é só código — é solução! Cada endpoint, validação e regra de negócio foi pensado para resolver problemas reais de gestão de frotas, com foco em usabilidade e segurança.
- **Qualidade Profissional:** Arquitetura modular, testes completos, documentação OpenAPI e deploy automatizado. Pronto para produção, fácil de escalar e manter.
- **Experiência do Desenvolvedor:** Onboarding rápido, exemplos claros, código limpo e comentários objetivos. Ideal para times que valorizam produtividade e aprendizado contínuo.
- **Cultura de Excelência:** O projeto reflete uma mentalidade de melhoria contínua, colaboração e respeito às melhores práticas do mercado.
- **Pronto para o futuro:** Estrutura preparada para autenticação, integrações externas, webhooks e persistência real — facilitando adaptações para qualquer cenário corporativo.

---

## 🚀 Demonstração Online

- **Render:** [https://seidor-rh.onrender.com](https://seidor-rh.onrender.com)
- **Swagger UI:** [https://seidor-rh.onrender.com/api-docs](https://seidor-rh.onrender.com/api-docs)

---

## 🛠️ Principais Funcionalidades

| Feature                       | Descrição                                                  |
|-------------------------------|------------------------------------------------------------|
| CRUD Automóveis               | Cadastro, listagem, busca, edição e remoção de automóveis  |
| CRUD Motoristas               | Cadastro, listagem, busca, edição e remoção de motoristas  |
| Utilização de Automóveis      | Início/fim de uso, histórico, paginação, regras de negócio |
| Health Check                  | Endpoint `/health` para monitoramento                      |
| Rate Limiting                 | Proteção contra abuso de requisições                       |
| Validação de Dados            | Validação robusta via express-validator                    |
| Documentação OpenAPI/Swagger  | Especificação completa e playground interativo             |
| Testes Unitários e Integração | Cobertura total com Jest e Supertest                       |
| Deploy Docker e Render        | Pronto para produção e cloud                               |
| Clean Code & SOLID            | Código limpo, modular, fácil de manter                     |

---

## 🏗️ Arquitetura e Tecnologias

- **Node.js 18+**
- **Express.js**
- **Jest & Supertest** (testes)
- **Docker** (containerização)
- **Render** (deploy cloud)
- **OpenAPI 3.0** (documentação)
- **Express-validator** (validação)
- **Arquitetura modular, Clean Code, SOLID**

### Estrutura de Pastas

```
controle/
├── src/
│   ├── api/
│   │   ├── automoveis/
│   │   ├── health/
│   │   ├── motoristas/
│   │   └── utilizacoes/
│   ├── middlewares/
│   ├── utils/
│   ├── app.js
│   └── server.js
├── tests/
│   ├── unit/
│   └── integration/
├── openapi.yaml
├── render.yaml
├── Dockerfile
├── package.json, .env, etc.
```

---

## ⚡ Instalação e Execução

### Pré-requisitos

- Node.js >= 18.x
- NPM >= 9.x
- Docker (opcional)

### Instalação Local

```bash
git clone https://github.com/devferreirag/Saidor.git
cd Saidor/controle
npm install
cp .env.example .env # Ajuste as variáveis se necessário
```

### Execução

- **Desenvolvimento:**  
  `npm run dev`
- **Produção:**  
  `npm start`

### Docker

```bash
docker build -t controle-automoveis-api .
docker run -p 3000:3000 -e PORT=3000 controle-automoveis-api
```

---

## 📖 Documentação da API

- **Swagger UI:**  
  [https://seidor-rh.onrender.com/api-docs](https://seidor-rh.onrender.com/api-docs)
- **Arquivo OpenAPI:**  
  [`openapi.yaml`](./openapi.yaml)

### Endpoints Principais

- `GET /health` — Health check
- `POST /api/automoveis` — Criar automóvel
- `GET /api/automoveis` — Listar automóveis
- `GET /api/automoveis/:id` — Buscar automóvel
- `PUT /api/automoveis/:id` — Atualizar automóvel
- `DELETE /api/automoveis/:id` — Remover automóvel
- `POST /api/motoristas` — Criar motorista
- `GET /api/motoristas` — Listar motoristas
- `GET /api/motoristas/:id` — Buscar motorista
- `PUT /api/motoristas/:id` — Atualizar motorista
- `DELETE /api/motoristas/:id` — Remover motorista
- `POST /api/utilizacoes` — Iniciar utilização
- `PATCH /api/utilizacoes/:id/finalizar` — Finalizar utilização
- `GET /api/utilizacoes` — Listar utilizações (paginação)

---

## 🧑‍💻 Exemplos de Uso

### Criar Automóvel

```bash
curl -X POST https://seidor-rh.onrender.com/api/automoveis \
  -H 'Content-Type: application/json' \
  -d '{"placa": "ABC-1234", "cor": "Azul", "marca": "MarcaXYZ"}'
```

**Resposta:**
```json
{
  "id": "gerado-pelo-uuid",
  "placa": "ABC-1234",
  "cor": "Azul",
  "marca": "MarcaXYZ"
}
```

### Listar Utilizações (com paginação)

```bash
curl "https://seidor-rh.onrender.com/api/utilizacoes?page=1&limit=10"
```

**Resposta:**
```json
{
  "items": [
    {
      "id": "uuid-da-utilizacao",
      "motoristaId": "uuid-do-motorista",
      "automovelId": "uuid-do-automovel",
      "dataInicio": "2024-07-31T12:00:00.000Z",
      "dataFim": null,
      "motivoUtilizacao": "Viagem a serviço",
      "motorista": { "id": "uuid-do-motorista", "nome": "Nome do Motorista" },
      "automovel": { "id": "uuid-do-automovel", "placa": "ABC-1234", "marca": "Marca", "cor": "Cor" }
    }
  ],
  "totalItems": 1,
  "totalPages": 1,
  "currentPage": 1,
  "itemsPerPage": 10
}
```

---

## 🧪 Testes e Cobertura

- **Testes unitários e integração:**  
  `npm test`
- **Cobertura de testes:**  
  `npm run coverage` (relatório em `coverage/lcov-report/index.html`)
- **Frameworks:** Jest, Supertest

---

## 🤝 Contribuição

Acredita em colaboração, aprendizado contínuo e código aberto?  
Sinta-se à vontade para contribuir!  
Siga os passos:

1. Fork este repositório
2. Crie uma branch: `git checkout -b feature/NovaFeature`
3. Commit suas alterações: `git commit -m 'feat: Nova feature'`
4. Push para sua branch: `git push origin feature/NovaFeature`
5. Abra um Pull Request

Consulte o [CONTRIBUTING.md](./CONTRIBUTING.md) para mais detalhes.

---

## 🗺️ Roadmap

- [x] CRUD Automóveis
- [x] CRUD Motoristas
- [x] Utilização de Automóveis
- [x] Health Check
- [x] Rate Limiting
- [x] Documentação OpenAPI/Swagger
- [x] Testes unitários e integração
- [x] Deploy Docker e Render
- [ ] Autenticação JWT (futuro)
- [ ] Integração com banco de dados persistente (futuro)
- [ ] Webhooks e eventos (futuro)

---

## 📄 Licença

Distribuído sob a licença ISC.  
Veja o campo "license" do [`package.json`](./package.json) para mais informações.

---

## 👤 Contato e Reconhecimentos

Desenvolvido por [Gabriel Ferreira](https://linkedin.com/in/devferreirag)  
Agradecimentos especiais a todos os contribuidores, à comunidade Node.js e aos mantenedores de ferramentas open source!

<p align="center">
  <em>Este projeto é resultado de paixão por tecnologia, atenção a detalhes e compromisso com excelência. Se você busca alguém com visão de produto, foco em qualidade e espírito colaborativo, vamos conversar!</em>
  <br>
  <em>Powered by DevFerreiraG</em>
</p>
