# Docker Setup Guide

This guide will help you run the Expense Tracker application using Docker with SQLite.

## Prerequisites

- Docker Desktop installed and running
- Docker Compose (included with Docker Desktop)

## Quick Start

### Production Build (SQLite)

To run the entire application:

```bash
docker-compose -f docker-compose.simple.yml up --build
```

This will:
- Build and run the backend API with SQLite database on port 5000
- Build and run the frontend on port 80

Access the application at: http://localhost

### Background Mode

To run in background:

```bash
docker-compose -f docker-compose.simple.yml up -d
```

## Services

### Backend API
- **Port**: 5000
- **Database**: SQLite (file-based, no separate container needed)
- **Environment**: Node.js with Express
- **Data Storage**: Persistent SQLite file in `/app/data/database.sqlite`

### Frontend
- **Port**: 80
- **Environment**: React with Vite
- **Server**: Nginx

## Environment Variables

### Backend (.env.docker)
```env
DB_DIALECT=sqlite
DB_STORAGE=/app/data/database.sqlite
PORT=5000
NODE_ENV=production
JWT_SECRET=your-super-secret-jwt-key-here-change-in-production
```

### Frontend (.env.docker)
```env
VITE_API_URL=http://localhost:5000
```

## Docker Commands

### Build and start all services
```bash
docker-compose -f docker-compose.simple.yml up --build
```

### Start services in background
```bash
docker-compose -f docker-compose.simple.yml up -d
```

### Stop all services
```bash
docker-compose -f docker-compose.simple.yml down
```

### View logs
```bash
# All services
docker-compose -f docker-compose.simple.yml logs

# Specific service
docker-compose -f docker-compose.simple.yml logs backend
docker-compose -f docker-compose.simple.yml logs frontend
```

### Rebuild specific service
```bash
docker-compose -f docker-compose.simple.yml build backend
docker-compose -f docker-compose.simple.yml build frontend
```

### Access SQLite database
```bash
# Copy database file to inspect locally
docker cp expense-tracker-backend:/app/data/database.sqlite ./database.sqlite

# Check container logs
docker logs expense-tracker-backend
```

## Database Management

### Backup Database
```bash
# Create backup
docker cp expense-tracker-backend:/app/data/database.sqlite ./backup-$(date +%Y%m%d).sqlite
```

### Restore Database
```bash
# Restore from backup
docker cp ./backup-20241023.sqlite expense-tracker-backend:/app/data/database.sqlite
```

### Reset Database
```bash
# Stop containers and remove data volume
docker-compose -f docker-compose.simple.yml down
docker volume rm expense-tracker-api_sqlite_data
```

## Troubleshooting

### Container Startup Issues
If containers fail to start:
1. Check if ports are available: `docker ps`
2. Check container logs: `docker logs expense-tracker-backend`
3. Rebuild containers: `docker-compose -f docker-compose.simple.yml up --build`

### Port Conflicts
If ports are already in use:
- Backend (5000): Change the port mapping in docker-compose.simple.yml
- Frontend (80): Change the port mapping in docker-compose.simple.yml

### Build Issues
If builds fail:
1. Clean Docker cache: `docker system prune -a`
2. Remove volumes: `docker-compose -f docker-compose.simple.yml down -v`
3. Rebuild: `docker-compose -f docker-compose.simple.yml up --build`

### SQLite Permission Issues
If you get database permission errors:
```bash
# The container automatically creates proper permissions
# If issues persist, rebuild the backend:
docker-compose -f docker-compose.simple.yml build backend
docker-compose -f docker-compose.simple.yml up
```

### Data Persistence
Data is persisted in Docker volumes. To check volumes:
```bash
docker volume ls
```

## Production Deployment

For production deployment:
1. Update JWT_SECRET with a secure random key
2. Set NODE_ENV=production in backend .env.docker
3. Consider using Docker secrets for sensitive data
4. Set up proper SSL/TLS termination
5. Configure proper backup strategies for the SQLite database
6. Consider using a more robust database (PostgreSQL) for high-traffic applications

## File Structure

```
expense-tracker-api/
├── docker-compose.simple.yml   # SQLite-based Docker configuration
├── backend/
│   ├── Dockerfile              # Production backend image
│   ├── .dockerignore
│   └── .env.docker             # Backend environment variables
├── frontend/
│   ├── Dockerfile              # Production frontend image
│   ├── .dockerignore
│   ├── .env.docker             # Frontend environment variables
│   └── nginx.conf              # Nginx configuration
├── README.docker.md            # This file
└── DATABASE_INSPECTION.md      # Database access guide
```

## Database Inspection

For detailed database inspection methods, see `DATABASE_INSPECTION.md`.

Quick database access:
```bash
# Copy database for local inspection
docker cp expense-tracker-backend:/app/data/database.sqlite ./database.sqlite

# Then open with DB Browser for SQLite or DBeaver
```