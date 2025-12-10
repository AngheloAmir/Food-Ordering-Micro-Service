#!/bin/bash

# Define colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Function to display help
show_help() {
    echo "Usage: ./manage.sh [COMMAND]"
    echo ""
    echo "Commands:"
    echo "  dev      Start the application in Development mode (Hot Reload)"
    echo "  prod     Start the application in Production mode (Optimized, Detached)"
    echo "  build    Build the Docker images without starting"
    echo "  down     Stop and remove all containers"
    echo "  logs     View logs of running containers"
    echo ""
}

# Main logic
case "$1" in
    dev)
        echo -e "${GREEN}Starting application in DEVELOPMENT mode...${NC}"
        docker compose -f docker-compose.yml up --build
        ;;
    prod)
        echo -e "${GREEN}Starting application in PRODUCTION mode...${NC}"
        # Use -d for detached mode in production
        docker compose -f docker-compose.prod.yml up --build -d
        echo -e "${GREEN}Application is running in background.${NC}"
        ;;
    build)
        echo -e "${YELLOW}Building Docker images...${NC}"
        # Build both to ensure cache is warm or specific targets are built
        docker compose -f docker-compose.yml build
        docker compose -f docker-compose.prod.yml build
        ;;
    down)
        echo -e "${YELLOW}Stopping containers...${NC}"
        docker compose -f docker-compose.yml down
        docker compose -f docker-compose.prod.yml down
        ;;
    logs)
        docker compose logs -f
        ;;
    *)
        show_help
        ;;
esac
