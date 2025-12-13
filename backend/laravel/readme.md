# Laravel Service

This directory contains the Laravel backend service.

## Run Locally (No Docker)

1.  **Install Dependencies**:
    ```bash
    composer install
    ```
2.  **Environment Setup**:
    Copy `.env.example` to `.env` and configure your database settings.
    ```bash
    cp .env.example .env
    php artisan key:generate
    ```
3.  **Run Server**:
    ```bash
    php artisan serve
    ```
    The API will be available at `http://localhost:8000/api/test`.

## Run with Docker

1.  **Start Container**:
    From the root of `backend/laravel` or using the main package.json script:
    ```bash
    docker compose up -d
    ```
    Reflecting changes: Since we map the volume (`.:/var/www`), changes you make locally are instantly reflected in the container without rebuilding.

    The API will be available at `http://localhost:8001/api/test`.

2.  **Stop Container**:
    ```bash
    docker compose down
    ```
