# select your base image to start wich
FROM node:alpine

# Create app directory 
# this is the location where you will be inside the container
WORKDIR /usr/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# copying packages first helps take advantage of docker layers
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

# Make this port accessible from outside the container
# Necessary for your browser to send HTTP requests to your Node App

EXPOSE 8080

# Command to run when the container is ready
CMD ["npm", "run", "dev"]

# Need to create volumes to sync files with container
