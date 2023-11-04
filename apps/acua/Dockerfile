FROM nginxinc/nginx-unprivileged:alpine

WORKDIR /

COPY ./dist/apps/acua /usr/share/nginx/html

COPY ./config/apps/acua/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
