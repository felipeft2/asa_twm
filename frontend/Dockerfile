# Estágio 1: Construir a aplicação
# Usa uma imagem base do Node.js para a construção. 
FROM node:20-alpine AS builder

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia os arquivos de configuração do npm para instalar as dependências
COPY package*.json ./

# Instale as dependências.
RUN npm install

# Copie o restante do código-fonte da sua aplicação
COPY . .

# Execute o comando de build do React para gerar os arquivos estáticos de produção
RUN npm run build

# Estágio 2: Servir a aplicação com um servidor web leve (Nginx)
# Usa uma imagem base do Nginx, que é um servidor web eficiente e pequeno.
FROM nginx:alpine

# Copia os arquivos estáticos do estágio de "builder" para o diretório de serviço do Nginx
COPY --from=builder /app/build /usr/share/nginx/html

# A porta 80 é a porta padrão para tráfego HTTP, que será exposta
EXPOSE 80

# Comando para iniciar o servidor Nginx quando o contêiner for executado
CMD ["nginx", "-g", "daemon off;"]