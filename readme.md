## Modular Micro Service / Monorepo
This is my  project that create a complete solution for a modular micro service / monorepo
It includes the backend, database and the front end.
It also includes docker for easy deployment and management.
Docker is a good way to prevent this application from being affected by the environment it is running on.

## Run locally without docker
``` npm run dev ```

As of this writting, the version of the node used is v25.2.1
You also need to change the .env.local to use the remote supabase project

## Run with docker
``` npm run dockerdev ```
