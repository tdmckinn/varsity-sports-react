FROM node:12.15.0

RUN curl -o- -L https://yarnpkg.com/install.sh | bash

RUN mkdir -p /app
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json

RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]