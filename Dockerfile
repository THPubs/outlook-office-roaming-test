FROM node:carbon-alpine as build-stage

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# COPY package.json yarn.lock ./
# For npm@5 or later, copy package-lock.json as well
# COPY package.json package-lock.json ./

ENV NPM_CONFIG_LOGLEVEL warn

# Install and configure `serve`.
RUN yarn global add serve
EXPOSE 5000

# Install all dependencies of the current project.
COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install

# Copy all local files into the image.
COPY . .

# Build for production.
RUN yarn build


FROM node:carbon-alpine

# Create app directory
WORKDIR /usr/src/app

COPY --from=build-stage /usr/src/app/dist /usr/src/app/dist

RUN yarn global add serve
CMD serve -s dist
EXPOSE 5000
