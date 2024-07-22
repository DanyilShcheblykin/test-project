###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:lts-alpine As development

WORKDIR /usr/src/app

COPY --chown=node:node package.json package-lock.json ./

RUN npm install

COPY --chown=node:node . .

USER node

###################
# BUILD FOR PRODUCTION
###################

FROM node:lts-alpine As build

WORKDIR /usr/src/app

COPY --chown=node:node package.json package-lock.json ./

COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

COPY --chown=node:node . .

RUN npm run build

ENV NODE_ENV production

RUN npm install --production && npm cache clean --force

USER node

###################
# PRODUCTION
###################

FROM node:lts-alpine As production

WORKDIR /usr/src/app

COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

CMD [ "node", "dist/main.js" ]