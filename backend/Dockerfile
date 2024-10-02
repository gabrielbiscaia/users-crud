FROM node:20.17.0

WORKDIR /app

COPY . .
COPY ./.env ./.env

RUN npm install

RUN npm run build

CMD [  "npm", "run", "start" ]