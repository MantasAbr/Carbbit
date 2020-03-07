#FROM bitnami/node:13.9.0
FROM node:13.10-alpine

RUN apk --update --no-cache add tzdata bash curl \
    && cp /usr/share/zoneinfo/Europe/Vilnius /etc/localtime \
    && echo "Europe/Vilnius" > /etc/timezone \
    && apk del tzdata

RUN mkdir -p /app
WORKDIR /app

COPY package*.json /app/
RUN npm install
COPY ./ /app/
COPY wait-for-it.sh /

CMD /wait-for-it.sh db:3306
# -- node /app/bin/www
#ENTRYPOINT [ "node" ]
#CMD [ "./bin/www" ]

#EXPOSE 3000