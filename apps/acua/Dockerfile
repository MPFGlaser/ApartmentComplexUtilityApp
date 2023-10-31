FROM nginx:stable-alpine

WORKDIR /

COPY ./dist/apps/acua /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
