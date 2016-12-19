FROM node:boron-alpine
COPY . /src
WORKDIR  /src
RUN npm install 
CMD node index.js



