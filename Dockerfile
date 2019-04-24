FROM node:10.9.0

ENV PORT=3000 
ENV MONGODB_URI=mongodb://hssi-db:27017/animals 
ENV DEBUG=notes:*
 
RUN mkdir -p /animals

COPY package.json *.js /animals/
COPY routes/ /animals/routes/
COPY models/ /animals/models/
COPY db/ /animals/db/
COPY bin/ /animals/bin/

WORKDIR /animals

RUN printf "deb http://archive.debian.org/debian/ jessie main\ndeb-src http://archive.debian.org/debian/ jessie main\ndeb http://security.debian.org jessie/updates main\ndeb-src http://security.debian.org jessie/updates main" > /etc/apt/sources.list

RUN apt-get update -y  \
    && apt-get -y install curl python build-essential git ca-certificates  \
    && npm install --unsafe-perm
 
EXPOSE 3000 

CMD npm run docker 
