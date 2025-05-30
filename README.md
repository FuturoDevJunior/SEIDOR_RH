<!-- LOGO -->
<!--
A logo é exibida via HTML para centralização e controle de tamanho.
O alt text é descritivo para acessibilidade.
-->
<p align="center">
  <img src="./vec_api_logo.png" alt="Logo do Vehicle Control System API - Controle de Automóveis" width="220"/>
</p>

<!-- BADGES -->
<p align="center">
  <a href="https://nodejs.org/en" target="_blank">
    <img src="https://img.shields.io/badge/Node.js-18.x-green?style=for-the-badge&logo=node.js" alt="Node.js">
  </a>
  <a href="https://www.npmjs.com/" target="_blank">
    <img src="https://img.shields.io/badge/NPM->=9.x-red?style=for-the-badge&logo=npm" alt="NPM">
  </a>
  <a href="https://www.docker.com/" target="_blank">
    <img src="https://img.shields.io/badge/Docker-ready-blue?style=for-the-badge&logo=docker" alt="Docker">
  </a>
  <a href="https://seidor-rh.onrender.com" target="_blank">
    <img src="https://img.shields.io/badge/Deploy-Render.com-46a2f1?style=for-the-badge&logo=render" alt="Render">
  </a>
  <a href="./openapi.yaml" target="_blank">
    <img src="https://img.shields.io/badge/OpenAPI-3.0-yellow?style=for-the-badge&logo=swagger" alt="OpenAPI">
  </a>
  <a href="./LICENSE" target="_blank">
    <img src="https://img.shields.io/github/license/devferreirag/Saidor?style=for-the-badge" alt="Licença ISC">
  </a>
  <a href="https://github.com/devferreirag/Saidor/commits/main" target="_blank">
    <img src="https://img.shields.io/github/last-commit/devferreirag/Saidor?style=for-the-badge" alt="Último commit">
  </a>
  <a href="https://github.com/devferreirag/Saidor/issues" target="_blank">
    <img src="https://img.shields.io/github/issues/devferreirag/Saidor?style=for-the-badge" alt="Issues">
  </a>
  <a href="https://github.com/devferreirag/Saidor/pulls" target="_blank">
    <img src="https://img.shields.io/github/issues-pr/devferreirag/Saidor?style=for-the-badge" alt="PRs">
  </a>
  <a href="https://github.com/devferreirag/Saidor/graphs/contributors" target="_blank">
    <img src="https://img.shields.io/github/contributors/devferreirag/Saidor?style=for-the-badge" alt="Contribuidores">
  </a>
</p>

---

# Vehicle Control System API

API RESTful para gestão de frotas, motoristas e utilizações. Arquitetura escalável, testes automatizados, documentação OpenAPI e pronta para produção. Foco em facilidade de manutenção, evolução e integração real.

<p align="center">
  <a href="https://seidor-rh.onrender.com" target="_blank"><b>🌐 Teste a demonstração online</b></a>
</p>

---

## 📑 Sumário

- [Visão Geral](#visão-geral)
- [Diferenciais](#diferenciais)
- [Demonstração Online](#demonstração-online)
- [Funcionalidades](#funcionalidades)
- [Arquitetura & Tecnologias](#arquitetura--tecnologias)
- [Instalação](#instalação)
- [Testes & Cobertura](#testes--cobertura)
- [Documentação](#documentação)
- [Contribuição](#contribuição)
- [Roadmap](#roadmap)
- [Licença](#licença)
- [Contato](#contato)

---

## 🚗 Visão Geral

O **Vehicle Control System API** é uma solução robusta para gestão de frotas, motoristas e utilizações, desenvolvida com Clean Code, SOLID, testes automatizados e documentação profissional.

---

## ✨ Diferenciais

- **Produto real:** Endpoints prontos para cenários de gestão de frotas.
- **Qualidade:** Testes, documentação, deploy automatizado.
- **Onboarding rápido:** Código limpo, exemplos claros.
- **Futuro-proof:** Pronto para integrações, autenticação e webhooks.

---

## 🚀 Demonstração Online

- **Render:** [https://seidor-rh.onrender.com](https://seidor-rh.onrender.com)
- **Swagger UI:** [https://seidor-rh.onrender.com/api-docs](https://seidor-rh.onrender.com/api-docs)

---

## 🛠️ Funcionalidades

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

## 🏗️ Arquitetura & Tecnologias

- **Node.js 18+**
- **Express.js**
- **Jest & Supertest** (testes)
- **Docker** (containerização)
- **Render** (deploy cloud)
- **OpenAPI 3.0** (documentação)
- **Express-validator** (validação)
- **Clean Code, SOLID, Modular**

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

## ⚡ Instalação

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

## 🧪 Testes & Cobertura

- **Testes unitários e integração:**  
  `npm test`
- **Cobertura de testes:**  
  `npm run coverage` (relatório local em `coverage/lcov-report/index.html`)
- **Frameworks:** Jest, Supertest

---

## 📖 Documentação

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

## 🤝 Contribuição

Sinta-se à vontade para contribuir!  
Siga os passos:

1. Fork este repositório
2. Crie uma branch: `git checkout -b feature/NovaFeature`
3. Commit suas alterações: `git commit -m 'feat: Nova feature'`
4. Push para sua branch: `git push origin feature/NovaFeature`
5. Abra um Pull Request

Sugestões, dúvidas ou bugs? [Abra uma issue](https://github.com/devferreirag/Saidor/issues)!

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

## 👤 Contato

Desenvolvido por [Gabriel Ferreira](https://linkedin.com/in/devferreirag)  
Agradecimentos especiais a todos os contribuidores, à comunidade Node.js e aos mantenedores de ferramentas open source!

<p align="center">
  <em>Este projeto é resultado de paixão por tecnologia, atenção a detalhes e compromisso com excelência. Se você busca alguém com visão de produto, foco em qualidade e espírito colaborativo, vamos conversar!</em>
  <br>
  <em>Powered by DevFerreiraG</em>
</p>
