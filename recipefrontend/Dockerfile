FROM node:18.18-alpine3.18

COPY package.json package-lock.json ./

RUN npm install

COPY . .

# RUN npm run build

CMD [ "npm","start" ]