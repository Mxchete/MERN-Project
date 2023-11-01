# using official node image based on alpine linux
FROM node:20.9.0-alpine

# set working dir to app
WORKDIR /usr/src/app

# get packages!
COPY package*.json ./
RUN npm ci

# get files
COPY . .

# run on port 3000
EXPOSE 3000
CMD [ "node", "server.js" ]
