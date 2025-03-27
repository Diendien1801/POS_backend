# GitHub Codespaces ♥️ Express

# POS Backend System

A Point of Sale backend system built with Express.js, PostgreSQL, and PostgREST.

## Prerequisites

- Docker
- Docker Compose

## Quick Start with Docker

1. Clone the repository

2. Create .env file with template below

3. Start all services using Docker Compose:
```bash
docker compose up --build -d
```

This will start:
- PostgreSQL database (port 5432)
- Express.js backend (port 3001)
- PostgREST API (port 3000)

To check the status of your containers:
```bash
docker compose ps
```

To view logs:
```bash
docker compose logs -f
```

## Services

Once running, the following services are available:

- REST API: http://localhost:3001
- PostgREST API: http://localhost:3000
- PostgreSQL Database: localhost:5432

## Environment Variables

Key environment variables in `.env`:

```plaintext
POSTGRES_DB=
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_HOST=
JWT_SECRET=
PORT=
PGRST_DB_ANON_ROLE=
PGRST_SERVER_PORT=
```

## Stopping the Application

To stop all services:
```bash
docker compose down
```

To stop and remove all data (including database volume):
```bash
docker compose down -v
```
