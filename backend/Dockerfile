FROM node:14

WORKDIR /home/app

COPY . .

RUN npm install

EXPOSE 4000

RUN [ "npm", "run", "build" ]

CMD [ "node", "dist/app.js" ]
