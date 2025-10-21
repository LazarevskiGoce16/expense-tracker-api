# Docker Setup Guide

This guide will help you run the Expense Tracker application using Docker.

## Prerequisites

- Docker Desktop installed and running
- Docker Compose (included with Docker Desktop)

## Quick Start

### Production Build

To run the entire application in production mode:

```bash
docker-compose up --build
```

This will:
- Start SQL Server Express database
- Build and run the backend API on port 5000
- Build and run the frontend on port 80

Access the application at: http://localhost

### Development Mode

For development with hot reloading:

```bash
docker-compose -f docker-compose.dev.yml up --build
```

This will:
- Start SQL Server Express database
- Run backend in development mode on port 5000 (with nodemon)
- Run frontend in development mode on port 3000 (with Vite dev server)

Access the application at: http://localhost:3000

## Services

### Database
- **Image**: Microsoft SQL Server 2022 Express
- **Port**: 1433
- **Credentials**: 
  - Username: `sa`
  - Password: `ExpenseTracker123!`
- **Database**: `ExpenseTracker`

### Backend API
- **Port**: 5000
- **Environment**: Node.js with Express
- **Health Check**: http://localhost:5000/health (if endpoint exists)

### Frontend
- **Port**: 80 (production) / 3000 (development)
- **Environment**: React with Vite
- **Built with**: Nginx (production)

## Environment Variables

### Backend (.env.docker)
```env
DB_HOST=database
DB_PORT=1433
DB_NAME=ExpenseTracker
DB_USER=sa
DB_PASSWORD=ExpenseTracker123!
DB_ENCRYPT=false
DB_TRUST_CERT=true
PORT=5000
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key-here-change-in-production
FRONTEND_URL=http://localhost
```

### Frontend (.env.docker)
```env
VITE_API_URL=http://localhost:5000
```

## Docker Commands

### Build and start all services
```bash
docker-compose up --build
```

### Start services in background
```bash
docker-compose up -d
```

### Stop all services
```bash
docker-compose down
```

### View logs
```bash
# All services
docker-compose logs

# Specific service
docker-compose logs backend
docker-compose logs frontend
docker-compose logs database
```

### Rebuild specific service
```bash
docker-compose build backend
docker-compose build frontend
```

### Access database directly
```bash
docker exec -it expense-tracker-db /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P ExpenseTracker123!
```

## Troubleshooting

### Database Connection Issues
If you see database connection errors:
1. Wait for SQL Server to fully start (can take 1-2 minutes on first run)
2. Check if the database container is running: `docker ps`
3. Check database logs: `docker-compose logs database`

### Port Conflicts
If ports are already in use:
- Backend (5000): Change the port mapping in docker-compose.yml
- Frontend (80/3000): Change the port mapping in docker-compose.yml
- Database (1433): Change the port mapping in docker-compose.yml

### Build Issues
If builds fail:
1. Clean Docker cache: `docker system prune -a`
2. Remove volumes: `docker-compose down -v`
3. Rebuild: `docker-compose up --build`

### Database Persistence
Data is persisted in a Docker volume named `mssql_data`. To reset the database:
```bash
docker-compose down -v
docker volume rm expense-tracker-api_mssql_data
```

## Production Deployment

For production deployment:
1. Change default passwords in docker-compose.yml
2. Update JWT_SECRET with a secure random key
3. Set NODE_ENV=production
4. Consider using Docker secrets for sensitive data
5. Set up proper SSL/TLS termination
6. Configure proper backup strategies for the database

## File Structure

```
expense-tracker-api/
├── docker-compose.yml          # Production configuration
├── docker-compose.dev.yml      # Development configuration
├── backend/
│   ├── Dockerfile              # Production backend image
│   ├── Dockerfile.dev          # Development backend image
│   ├── .dockerignore
│   └── .env.docker             # Backend environment variables
├── frontend/
│   ├── Dockerfile              # Production frontend image
│   ├── Dockerfile.dev          # Development frontend image
│   ├── .dockerignore
│   ├── .env.docker             # Frontend environment variables
│   └── nginx.conf              # Nginx configuration
└── README.docker.md            # This file
```