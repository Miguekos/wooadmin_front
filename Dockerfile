# develop stage
FROM node:14.16 as build-stage
# COPY . ./app
COPY ["package*.json" ,  "/app/"]
WORKDIR /app
# COPY package.json ./
# COPY package*.json ./
RUN npm install -g @quasar/cli
RUN npm install
COPY ["." ,  "/app/"]
RUN quasar build
# production stage
FROM nginx:1.20.1-alpine as production-stage
COPY --from=build-stage /app/dist/spa /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
