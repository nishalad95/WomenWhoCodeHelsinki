# 1) What base image will you use? We're using node version: 10.15.3


# Create the app directory
WORKDIR /usr/src/app

# package*.json contains the metadata of the project
# Copy these files into the container file system
COPY package*.json ./

# 2) Instruct Docker to install any node dependencies we need:


# Copy all contents from current location to the `WORKDIR`
COPY . .

# 3) What command will docker run to start the node app?
