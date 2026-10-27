FROM node:22-alpine

RUN apk add --no-cache git ca-certificates openssh-client

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]