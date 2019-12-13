FROM node:10

# app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g nodemon @babel/core @babel/node @babel/preset-env

RUN npm install

# Bundle app source
COPY . .

EXPOSE 3000

CMD [ "nodemon","--exec", "babel-node" ,"src/index.js" ]


