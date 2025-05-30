# Estágio 1: Build e instalação de dependências
FROM node:18-alpine AS builder
# Usar alpine para uma imagem final menor. node:18 corresponde ao que definimos em package.json "engines"

WORKDIR /usr/src/app

# Copiar package.json e package-lock.json (ou yarn.lock)
COPY package*.json ./

# Instalar apenas dependências de produção para manter a imagem final menor
# Usar npm ci para instalações consistentes baseadas no package-lock.json
RUN npm ci --omit=dev

# Copiar o restante do código da aplicação
COPY . .
        
# Estágio 2: Imagem de Produção Final
FROM node:18-alpine AS final

WORKDIR /usr/src/app

# Definir NODE_ENV como production (boa prática)
ENV NODE_ENV=production
# A porta será definida pela variável de ambiente PORT injetada pela plataforma de hospedagem (ex: Render)
# ou pelo docker run -p. O app já escuta process.env.PORT.
# EXPOSE ${PORT} # Não podemos usar EXPOSE ${PORT} diretamente aqui pois PORT não é um build-arg.
# A porta padrão do app é 3000 se PORT não for definido.
# O ideal é que a plataforma de hospedagem defina PORT.
# Se precisar expor uma porta padrão conhecida no Dockerfile:
EXPOSE 3000 

# Copiar dependências de produção do estágio builder
COPY --from=builder /usr/src/app/node_modules ./node_modules
# Copiar código da aplicação do estágio builder
COPY --from=builder /usr/src/app/src ./src
COPY --from=builder /usr/src/app/package.json ./package.json
# Copiar openapi.yaml se o app.js o carrega do sistema de arquivos em produção
# (No nosso caso, YAML.load é síncrono e o arquivo é lido no início)
COPY --from=builder /usr/src/app/openapi.yaml ./openapi.yaml 

# Opcional: Criar um usuário não-root para rodar a aplicação (melhor segurança)
# RUN addgroup -S appgroup && adduser -S appuser -G appgroup
# USER appuser

# Comando para iniciar a aplicação
# O script "start" já é "node src/server.js"
CMD ["npm", "start"]
