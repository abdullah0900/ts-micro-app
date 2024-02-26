FROM node:18

RUN addgroup -q --system project && \
    adduser -q --system --home /home/project \
      --shell /bin/bash -uid 1001 --ingroup project project

USER project

WORKDIR /home/project


COPY package.json yarn.lock ./
RUN yarn install

EXPOSE 8080

CMD ["yarn", "dev"]