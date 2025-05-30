<!-- Banner/Logo oficial do projeto -->
<p align="center">
  <img src="../vec_api_logo.png" alt="Logo do Vehicle Control System API - Carro estilizado com circuitos" width="320"/>
</p>

<p align="center">
  <!-- Badges principais -->
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

<p align="center">
  <b>API RESTful para gestão de automóveis, motoristas e utilizações, com documentação OpenAPI, testes completos, deploy Docker/Render e arquitetura Clean Code/SOLID.</b>
</p>

---

# 📚 Sumário

- [Sobre o Projeto](#sobre-o-projeto)
- [Demonstração e Playground](#demonstração-e-playground)
- [Principais Features](#principais-features)
- [Instalação e Execução](#instalação-e-execução)
  - [Requisitos](#requisitos)
  - [Instalação Local](#instalação-local)
  - [Execução com Docker](#execução-com-docker)
  - [Deploy Render](#deploy-render)
- [Uso Rápido](#uso-rápido)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Documentação da API (Swagger/OpenAPI)](#documentação-da-api-swaggeropenapi)
- [Exemplos de Requests e Responses](#exemplos-de-requests-e-responses)
- [Testes e Cobertura](#testes-e-cobertura)
- [Contribuição](#contribuição)
- [Roadmap](#roadmap)
- [Licença](#licenca)
- [Contato e Agradecimentos](#contato-e-agradecimentos)

---

# Sobre o Projeto

O **Controle de Automóveis API** é uma solução RESTful para gestão de automóveis, motoristas e utilizações, com persistência em memória, arquitetura modular, documentação OpenAPI 3.0, testes completos (unitários e integração), rate limiting, deploy Docker/Render e princípios Clean Code/SOLID.

- **Stack:** Node.js, Express, Jest, Supertest, Docker, Render, OpenAPI 3.0
- **Arquitetura:** Modular, Clean Code, SOLID, Middlewares reutilizáveis
- **Documentação:** Swagger UI (OpenAPI), exemplos reais, README visual
- **Diferenciais:** Rate limit, validação robusta, deploy automatizado, cobertura de testes, código limpo

---

# Demonstração e Playground

- **Swagger UI:** Após rodar o projeto, acesse: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
- **Arquivo OpenAPI:** [openapi.yaml](./openapi.yaml)
- **Exemplo de endpoint:** `GET /api/automoveis`

---

# Principais Features

| Feature                          | Descrição                                                     |
| -------------------------------- | --------------------------------------------------------------- |
| CRUD Automóveis                 | Cadastro, listagem, busca, edição e remoção de automóveis  |
| CRUD Motoristas                  | Cadastro, listagem, busca, edição e remoção de motoristas   |
| Utilização de Automóveis      | Início/fim de uso, histórico, paginação, regras de negócio |
| Health Check                     | Endpoint `/health` para monitoramento                         |
| Rate Limiting                    | Proteção contra abuso de requisições                        |
| Validação de Dados             | Validação robusta via express-validator                       |
| Documentação OpenAPI/Swagger   | Especificação completa e playground interativo                |
| Testes Unitários e Integração | Cobertura total com Jest e Supertest                            |
| Deploy Docker e Render           | Pronto para produção e cloud                                  |
| Clean Code & SOLID               | Código limpo, modular, fácil de manter                        |

---

# Instalação e Execução

## Requisitos

- Node.js >= 18.x
- NPM >= 9.x
- Docker (opcional, para containerização)

## Instalação Local

```bash
# Clone o repositório
$ git clone https://github.com/devferreirag/Saidor.git
$ cd Saidor/controle

# Instale as dependências
$ npm install

# (Opcional) Copie e ajuste variáveis de ambiente
$ cp .env.example .env
```

## Execução Local

```bash
# Ambiente de desenvolvimento (com nodemon)
$ npm run dev

# Ambiente de produção
$ npm start
```

## Execução com Docker

```bash
# Build da imagem
$ docker build -t controle-automoveis-api .

# Run container (porta 3000 ou definida no .env)
$ docker run -p 3000:3000 -e PORT=3000 controle-automoveis-api
```

## Deploy Render

- O projeto inclui [render.yaml](./render.yaml) para deploy automatizado na plataforma [Render](https://render.com/).
- Basta conectar o repositório, criar um Blueprint Service e seguir as instruções do Render.

---

# Uso Rápido

Exemplo de requisição para criar um automóvel:

```bash
curl -X POST http://localhost:3000/api/automoveis \
  -H 'Content-Type: application/json' \
  -d '{"placa": "ABC-1234", "cor": "Azul", "marca": "MarcaXYZ"}'
```

Exemplo de resposta:

```json
{
  "id": "gerado-pelo-uuid",
  "placa": "ABC-1234",
  "cor": "Azul",
  "marca": "MarcaXYZ"
}
```

---

# Estrutura de Pastas

```
controle/
├── src/
│   ├── api/
│   │   ├── automoveis/       # CRUD Automóveis
│   │   ├── health/           # Health Check
│   │   ├── motoristas/       # CRUD Motoristas
│   │   └── utilizacoes/      # Utilizações
│   ├── middlewares/          # Middlewares (validação, logger, error handler, swagger)
│   ├── utils/                # Utilitários (AppError, idGenerator)
│   ├── app.js                # Configuração principal do Express
│   └── server.js             # Inicialização do servidor
├── tests/
│   ├── unit/                 # Testes unitários
│   └── integration/          # Testes de integração
├── openapi.yaml              # Especificação OpenAPI 3.0
├── render.yaml               # Deploy Render
├── Dockerfile                # Docker
├── package.json, .env, etc.
```

---

# Documentação da API (Swagger/OpenAPI)

- **Swagger UI:** [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
- **Arquivo OpenAPI:** [openapi.yaml](./openapi.yaml)
- **Principais endpoints:**
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

# Exemplos de Requests e Responses

## Criar Automóvel

```http
POST /api/automoveis
Content-Type: application/json
{
  "placa": "ABC-1234",
  "cor": "Azul",
  "marca": "MarcaXYZ"
}
```

Resposta:

```json
{
  "id": "gerado-pelo-uuid",
  "placa": "ABC-1234",
  "cor": "Azul",
  "marca": "MarcaXYZ"
}
```

## Listar Utilizações (com paginação)

```http
GET /api/utilizacoes?page=1&limit=10
```

Resposta:

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

# Testes e Cobertura

- **Testes unitários e integração:** `npm test`
- **Cobertura de testes:** `npm run coverage` (relatório em `coverage/lcov-report/index.html`)
- **Frameworks:** Jest, Supertest
- **Pastas de testes:**
  - `tests/unit/` — Testes unitários por feature
  - `tests/integration/` — Testes de integração por endpoint

---

# Contribuição

Contribuições são bem-vindas! Siga os passos:

1. Fork este repositório
2. Crie uma branch: `git checkout -b feature/NovaFeature`
3. Commit suas alterações: `git commit -m 'feat: Nova feature'`
4. Push para sua branch: `git push origin feature/NovaFeature`
5. Abra um Pull Request

Consulte o [CONTRIBUTING.md](./CONTRIBUTING.md) para mais detalhes.

---

# Roadmap

- [X] CRUD Automóveis
- [X] CRUD Motoristas
- [X] Utilização de Automóveis
- [X] Health Check
- [X] Rate Limiting
- [X] Documentação OpenAPI/Swagger
- [X] Testes unitários e integração
- [X] Deploy Docker e Render
- [ ] Autenticação JWT (futuro)
- [ ] Integração com banco de dados persistente (futuro)
- [ ] Webhooks e eventos (futuro)

---

# Licença

Distribuído sob a licença ISC. Veja o campo "license" do [package.json](./package.json) para mais informações.

---

# Contato e Agradecimentos

Desenvolvido por [Gabriel Ferreira](https://linkedin.com/in/devferreirag) — contato via LinkedIn.

Agradecimentos especiais a todos os contribuidores, à comunidade Node.js e aos mantenedores de ferramentas open source!

<p align="center">
  <em>Este projeto segue as melhores práticas de Clean Code, SOLID e documentação profissional. Powered </em>
</p>
# SEIDOR_RH
