ARG NODE_VERSION=22.14.0

FROM node:${NODE_VERSION}-alpine as base

ENV NODE_ENV=development

RUN corepack enable

WORKDIR /src

# Build
FROM base as build

COPY --link package.json pnpm-lock.yaml .
RUN pnpm fetch
RUN pnpm install

# Run
FROM base

COPY --from=build /src/node_modules /src/node_modules

CMD [ "pnpm", "run", "dev" ]