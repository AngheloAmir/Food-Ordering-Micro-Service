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

To open the vite ports, run ``` npm run open ```
This will open all of the vite ports in the browser

## Run with docker
``` npm run dev:docker ```

## Services
The node service runs on port 5199
Admin App runs on port 5200
Restaurant App runs on port 5201
Customer App runs on port 5202
Delivery App runs on port 5203
Employee App runs on port 5204
POS App runs on port 5205
The Main App for customer runs on port 5206
Accounting App runs on port 5207
