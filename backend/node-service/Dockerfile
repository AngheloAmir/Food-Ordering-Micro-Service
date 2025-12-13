FROM node:25-alpine3.22

WORKDIR /app

COPY package*.json ./
RUN npm install

EXPOSE 5199

CMD ["npm", "run", "dev"]
