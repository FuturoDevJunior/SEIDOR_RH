<!-- LOGO -->
<!--
A logo é exibida via HTML para centralização e controle de tamanho.
O alt text é descritivo para acessibilidade. Fallback em Markdown para máxima compatibilidade.
-->
<p align="center">
  <img src="./vec_api_logo.png" alt="Logo do Vehicle Control System API - Controle de Automóveis" width="220"/>
</p>
<p align="center">
  ![Logo do Vehicle Control System API - Controle de Automóveis](./vec_api_logo.png)
</p>

<!-- BADGES -->
<p align="center">
  <a href="https://nodejs.org/en" target="_blank"><img src="https://img.shields.io/badge/Node.js-18.x-green?style=for-the-badge&logo=node.js" alt="Node.js"></a>
  <a href="https://www.npmjs.com/" target="_blank"><img src="https://img.shields.io/badge/NPM->=9.x-red?style=for-the-badge&logo=npm" alt="NPM"></a>
  <a href="https://www.docker.com/" target="_blank"><img src="https://img.shields.io/badge/Docker-ready-blue?style=for-the-badge&logo=docker" alt="Docker"></a>
  <a href="https://seidor-rh.onrender.com" target="_blank"><img src="https://img.shields.io/badge/Deploy-Render.com-46a2f1?style=for-the-badge&logo=render" alt="Render"></a>
  <a href="./openapi.yaml" target="_blank"><img src="https://img.shields.io/badge/OpenAPI-3.0-yellow?style=for-the-badge&logo=swagger" alt="OpenAPI"></a>
  <a href="#testes" target="_blank"><img src="https://img.shields.io/badge/Testes-Jest%20%26%20Supertest-blueviolet?style=for-the-badge&logo=jest" alt="Jest"></a>
  <a href="https://github.com/devferreirag/Saidor/actions" target="_blank"><img src="https://img.shields.io/github/actions/workflow/status/devferreirag/Saidor/controle/.github/workflows/ci.yml?branch=main&style=for-the-badge&logo=githubactions" alt="CI Status"></a>
  <a href="https://github.com/devferreirag/Saidor/commits/main" target="_blank"><img src="https://img.shields.io/github/last-commit/devferreirag/Saidor?style=for-the-badge" alt="Último commit"></a>
  <a href="https://github.com/devferreirag/Saidor/issues" target="_blank"><img src="https://img.shields.io/github/issues/devferreirag/Saidor?style=for-the-badge" alt="Issues"></a>
  <a href="https://github.com/devferreirag/Saidor/pulls" target="_blank"><img src="https://img.shields.io/github/issues-pr/devferreirag/Saidor?style=for-the-badge" alt="PRs"></a>
  <a href="https://github.com/devferreirag/Saidor/graphs/contributors" target="_blank"><img src="https://img.shields.io/github/contributors/devferreirag/Saidor?style=for-the-badge" alt="Contribuidores"></a>
  <a href="./LICENSE" target="_blank"><img src="https://img.shields.io/github/license/devferreirag/Saidor?style=for-the-badge" alt="Licença ISC"></a>
  <a href="https://github.com/devferreirag/Saidor/stargazers" target="_blank"><img src="https://img.shields.io/github/stars/devferreirag/Saidor?style=for-the-badge" alt="Stars"></a>
  <a href="https://github.com/devferreirag/Saidor/network/members" target="_blank"><img src="https://img.shields.io/github/forks/devferreirag/Saidor?style=for-the-badge" alt="Forks"></a>
</p>

---

# Vehicle Control System API

API RESTful moderna, escalável e pronta para produção, focada em excelência de código, experiência do desenvolvedor e robustez de produto.

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

O **Vehicle Control System API** é uma solução completa para gestão de frotas, motoristas e utilizações, desenhada para ser referência em qualidade, clareza e escalabilidade. O projeto foi desenvolvido com foco em Clean Code, SOLID, testes automatizados e documentação profissional — tudo para garantir facilidade de manutenção, evolução e integração em ambientes reais.

---

## ✨ Diferenciais

- **Visão de Produto:** Cada endpoint resolve problemas reais de gestão de frotas, com foco em usabilidade e segurança.
- **Qualidade Profissional:** Arquitetura modular, testes completos, documentação OpenAPI e deploy automatizado.
- **Experiência do Dev:** Onboarding rápido, exemplos claros, código limpo e comentários objetivos.
- **Pronto para o Futuro:** Estrutura preparada para autenticação, integrações externas, webhooks e persistência real.

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
  `npm run coverage` (relatório em `coverage/lcov-report/index.html`)
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
