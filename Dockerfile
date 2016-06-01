FROM node:wheezy

# Prepare app directory
RUN mkdir -p /usr/src/app
ADD . /usr/src/app

# Install dependencies
WORKDIR /usr/src/app
RUN npm install

# Expose the app port
EXPOSE 8000

# Build the app
CMD npm run start
