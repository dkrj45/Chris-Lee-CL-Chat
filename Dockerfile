# install node_modules and build the app
FROM node:18-buster-slim as build
WORKDIR /app

# copy back-end
COPY ./back-end ./back-end
RUN rm -rf ./back-end/.env

# copy front-end
COPY ./front-end ./front-end
RUN rm -rf ./front-end/.env

# install dependencies in back-end
WORKDIR /app/back-end
RUN npm install

# install dependencies in front-end add build the app
WORKDIR /app/front-end
RUN npm install
RUN npm run build

# set production environment
ENV NODE_ENV=production

# create lean image
FROM node:18-buster-slim

# set working dir
WORKDIR /app

# copy back-end
COPY --from=build /app/back-end ./back-end

# copy front-end
COPY --from=build /app/front-end/build ./front-end

# set working directory
WORKDIR /app/back-end

# expose port
EXPOSE 8080

# set user
USER node

# start the app
CMD ["npm", "start"]