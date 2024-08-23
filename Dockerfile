# Use the specific Node.js version.
FROM node:20.10.0

# Set the working directory in the Docker image
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install the npm packages
RUN npm install

# Copy the rest of your app's source code from your host to your image filesystem.
COPY ./src .

# Set the command to run your app using CMD which defines your runtime.
CMD [ "npm", "run", "dev" ]