FROM node:dubnium-alpine

# Creating a new group and user for the container environment.
RUN addgroup -S chautari && adduser -S pawsh -G chautari
USER pawsh:chautari

# Getting into the created user's home directory.
WORKDIR /home/pawsh 

# Copy source code into the container.
COPY dist app
COPY public public
COPY node_modules node_modules

# Main server running script
CMD [ "sh", "-c", "node app/index.js" ]
