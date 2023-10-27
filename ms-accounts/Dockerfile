# Version 4
FROM node:18-alpine AS builder
WORKDIR /app
COPY ["package*.json", "tsconfig*.json", "./"]
RUN npm ci
COPY ./dist .
RUN npm run build

FROM node:18-alpine AS final
WORKDIR /app
COPY --from=builder ./app/dist ./
COPY ["package*.json", "tsconfig*.json", "./"]
RUN npm install --production
RUN npm install pm2 -g
# RUN pm2 update
CMD [ "npm", "start" ]