# Base stage
FROM node:22-alpine AS base
WORKDIR /app
COPY package*.json ./

# Dependencies stage
FROM base AS deps
RUN npm install

# Development stage
FROM base AS development
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# We don't copy specific source files here because we interpret them at runtime or mount them
CMD ["npm", "run", "dev"]

# Build stage
FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production stage
FROM node:22-alpine AS production
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./package.json

# Set production environment
ENV NODE_ENV=production
EXPOSE 8000

# Use non-root user for security
USER node

CMD ["npm", "run", "start"]
