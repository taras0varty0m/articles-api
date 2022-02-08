FROM node

# Create App Directory
WORKDIR /app 

# Install Dependencies
COPY package.json /app 
COPY yarn.lock /app

RUN yarn install

# Copy app source code
COPY . /app

CMD ["yarn","start"]

# Exports
EXPOSE 5000