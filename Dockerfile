FROM ubuntu:18.04

RUN apt-get update

RUN apt-get install curl gnupg -y

RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -

RUN apt-get install -y nodejs mongodb

WORKDIR /usr/src/app

COPY . .

RUN npm install

EXPOSE 3333

#RUN chmod 755 entrypoint.sh

COPY entrypoint.sh /usr/local/bin/

RUN chmod +x /usr/local/bin/entrypoint.sh

ENTRYPOINT ["entrypoint.sh"]

RUN /usr/local/bin/entrypoint.sh