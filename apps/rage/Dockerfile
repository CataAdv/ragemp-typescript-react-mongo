FROM node:20 AS base
WORKDIR /app
COPY package*.json ./

FROM base AS build
WORKDIR /app
RUN npm install
COPY . .
RUN npm run build:production

FROM base AS final
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package*.json ./

FROM disinterpreter/ragemp-server
WORKDIR /ragemp/ragemp-srv
COPY --from=final /app/dist ./
COPY --from=final /app/node_modules ./node_modules
COPY --from=final /app/package*.json ./
CMD ["./start_server.sh"]
