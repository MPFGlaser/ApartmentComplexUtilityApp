FROM nginx:stable-alpine

WORKDIR /

RUN addgroup -S acua && adduser -S acua -G acua

USER acua

COPY ./dist/apps/acua /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
