## Monorepo for Food-Ordering-Micro-Service
This is my  project that create a complete solution for a monorepo
It includes the backend, database and the front end.
It also includes docker for easy deployment and management.
Docker is a good way to prevent this application from being affected by the environment it is running on.

## Prerequisites
- Node.js v25.2.1
- Docker
- Docker Compose

## Run locally without docker
``` npm run dev:local ```

As of this writting, the version of the node used is v25.2.1
You also need to change the .env.local to use the remote supabase project

## Run with docker
``` npm run dev:docker ```
