# Modular Micro Service

This is an enterprise-level application with interchangeable backends (Node.js or Laravel) and dual frontends (React Admin & Expo Customer).

## Project Structure

- `backend/`
    - `node-service/`: Node.js Express Backend
    - `laravel-service/`: Laravel Backend (Planned)
- `frontend/`
    - `admin-panel/`: React Admin Panel (Planned)
    - `customer-mobile/`: Expo Mobile App (Planned)
- `docker-compose.yml`: Docker Orchestration

## Running with Docker

This project uses Docker Compose Profiles to switch between backends.

### Run Node.js Backend
```bash
docker compose --profile node up --build
```
Access at: http://localhost:8000

### Run Laravel Backend (Future)
```bash
docker compose --profile laravel up --build
```

## Development & Troubleshooting

If you encounter permission issues (e.g., `EACCES` errors) or IDE errors (e.g., cannot find modules), this is often because Docker creates files as `root` (like `node_modules`).

**1. Fix Permissions (Linux/Mac)**
Run this command from the project root to take ownership of the created files:
```bash
sudo chown -R $USER:$USER backend/node-service
```

**2. Setup for Local IDE (Intellisense)**
To ensure your IDE (VS Code, etc.) resolves TypeScript types correctly:
```bash
cd backend/node-service
npm install
```
*Note: This runs the install locally on your machine, separate from the container, allowing your IDE to index the packages.*
