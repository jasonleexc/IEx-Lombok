#!/bin/bash

# IEx Lombok Setup Script
echo "Setting up IEx Lombok development environment..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "Docker is not installed. Please install Docker first."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Create necessary directories
echo "Creating directories..."
mkdir -p backend/uploads
mkdir -p database

# Copy environment file if it doesn't exist
if [ ! -f backend/.env ]; then
    echo "Creating environment file..."
    cp backend/env.example backend/.env
    echo "Please edit backend/.env with your configuration"
fi

# Build and start services
echo "Building and starting Docker services..."
docker-compose up --build -d

# Wait for database to be ready
echo "Waiting for database to be ready..."
sleep 10

# Initialise database
echo "Initializing database..."
docker-compose exec backend python init_db.py

echo "Setup complete!"
echo "Frontend: http://localhost:3000"
echo "Backend API: http://localhost:5000"
echo "Database: localhost:5432"
