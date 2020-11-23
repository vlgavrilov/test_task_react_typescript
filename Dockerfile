FROM node:12-alpine as builder
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run start

FROM nginx:1.16.0-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
