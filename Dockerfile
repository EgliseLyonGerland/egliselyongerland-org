FROM node:wheezy

# Set environments variables
ENV PORT 8000

# Prepare app directory
RUN mkdir -p /usr/src/app
ADD package.json /usr/src/app/

# Install dependencies
WORKDIR /usr/src/app
RUN npm install

ADD . /usr/src/app/

# Build app
RUN npm run build

# Expose the app port
EXPOSE 8080

# Build the app
CMD [ "npm", "start" ]
