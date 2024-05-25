FROM node:latest

WORKDIR /code
ADD ./package.json /code/package.json
ADD ./package-lock.json /code/package-lock.json

RUN npm install

# move the installed node_modules to / so that the build command (in disco.json)
# will see it when running npm run build
RUN mv /code/node_modules /node_modules
