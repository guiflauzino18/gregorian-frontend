# Etapa 1: build da aplicação
FROM node:18 as build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build --prod

# Etapa 2: imagem final com nginx
FROM nginx:alpine

COPY --from=build /app/dist/gregorian-frontend /usr/share/nginx/html
COPY build/dev/nginx.conf /etc/nginx/conf.d/default.conf