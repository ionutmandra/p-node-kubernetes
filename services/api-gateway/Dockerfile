#FROM risingstack/alpine:3.4-v8.5.0-4.7.0  AS build
FROM node:11-alpine AS build

#Add label because multistage build creates persisten temp images that add up - https://github.com/moby/moby/issues/34151
LABEL multistagetemp="true"

RUN apk add --update --no-cache \
    python \
    make \
    g++

#create folder in ctainer
WORKDIR /src
COPY package.json package.json
COPY package-lock.json package-lock.json

# Clean install
RUN npm ci

COPY . . 

RUN npm run lint

# delete dev dependencies
RUN npm prune --production

FROM node:11-alpine

WORKDIR /wdir

ENV PORT 3000
EXPOSE 3000

COPY --from=build /src/node_modules node_modules
# gitignore blocks node_modules from copying
# if build stage compiles dist files, copy only those (not sources also, as now)
COPY . .

CMD ["node", "."]
