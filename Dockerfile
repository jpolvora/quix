# Version 4
FROM node:18-alpine AS builder
WORKDIR /app
COPY ["package*.json", "tsconfig.json", "tsconfig-build.json", "app-*.json", "./"]
RUN npm ci
COPY ./src ./src
RUN npm run build

FROM node:18-alpine AS final
WORKDIR /app
COPY --from=builder ./app/dist ./
COPY ["package*.json", "app-*.json", "./"]
RUN npm install --production
RUN npm install pm2 -g
# RUN pm2 update
CMD [ "npm", "start" ]