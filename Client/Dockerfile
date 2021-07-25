FROM node as build
WORKDIR /app
COPY . /app/
RUN npm install
RUN npm run build

FROM nginx:1.16-alpine
COPY  --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
