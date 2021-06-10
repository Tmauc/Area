FROM node:13

WORKDIR ./webclient
COPY package.json .

RUN npm install

COPY . ./

EXPOSE 8081

CMD npm start
