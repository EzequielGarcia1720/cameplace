FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY src ./src

EXPOSE 3030

CMD ["node", "src/index.js"]
