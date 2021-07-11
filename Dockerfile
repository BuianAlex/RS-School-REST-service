FROM node:14.17-alpine
WORKDIR ./usr/app/
COPY package*.json ./
RUN npm i -g @nestjs/cli
RUN npm i
COPY . ./
CMD [ "npm", "run", "start:dev" ]
