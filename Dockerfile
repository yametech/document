FROM node:14.3.0 AS builder
WORKDIR /app
RUN npm install -g cnpm --registry=https://registry.npm.taobao.org
RUN alias cnpm="npm --registry=https://registry.npm.taobao.org \
--cache=$HOME/.npm/.cache/cnpm \
--disturl=https://npm.taobao.org/dist \
--userconfig=$HOME/.cnpmrc"
RUN cnpm install -g vuepress


COPY . .
RUN npm run docs:build


FROM nginx:1.19.0
COPY --from=builder app/dist /usr/share/nginx/html/
COPY --from=builder app/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80