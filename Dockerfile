# install node_modules and build the app
FROM node:18-buster-slim as build
WORKDIR /app

COPY ./back-end ./back-end
COPY ./front-end ./front-end

WORKDIR /app/back-end
RUN npm install

WORKDIR /app/front-end
RUN npm install
RUN npm run build

ENV NODE_ENV=production

# create lean image
FROM node:18-buster-slim

WORKDIR /app

COPY --from=build /app/back-end ./back-end
COPY --from=build /app/front-end/build ./front-end

WORKDIR /app/back-end

EXPOSE 8080

USER node

CMD ["npm", "start"]