FROM node:20-alpine
RUN mkdir /app
COPY package*.json /app
WORKDIR /app
RUN npm install
COPY . .
EXPOSE 5173
CMD [ "npm", 'run', 'dev', '--', '--host' ]