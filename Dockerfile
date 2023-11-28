# using official node image based on alpine linux
FROM node:20.9.0-alpine

# set working dir to app
WORKDIR /usr/src/app

# run on port 3000
EXPOSE 3000

# get files
COPY . .
# get packages!
WORKDIR /usr/src/app/server
RUN npm ci
RUN yarn start &
WORKDIR /usr/src/app/client
RUN npm ci
RUN yarn start &

