FROM node:16.9.1 as build
WORKDIR /app

# install dependencies
COPY package.json ./
RUN npm install

# Copy all local files into the image.
COPY . .

RUN npm run build

EXPOSE 3000
CMD ["node", "build/index.js"]
