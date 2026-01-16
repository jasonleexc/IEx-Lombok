# IEx Lombok - Marine Conservation Web App

A full-stack web application for sea turtle tracking & documentation.

## Tech Stack

## About
This platform enables users to:
- Report sea turtle sightings with detailed measurements for analysis & tracking.
- View recent sightings from the community.

## Quick Start 

### Pre-requisites

- **Docker Desktop** installed and running
- **Git** for cloning the repository

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <IEx-Lombok>
   cd "Y2S1 Materials/IEx Lombok/Web App"
   ```

2. **Start the application:**
   ```bash
   docker-compose up --build
   ```
   
   This will:
   - Build the frontend and backend containers
   - Start PostgreSQL database & initialise database tables

3. **Access the application:**
   - **Frontend:** http://localhost:3000

### Stopping the Application

```bash
# Stop containers
docker-compose down

```

## User Guide

### Logging a New Sighting

1. Click **"Log New Sighting"** button on the home page
2. Fill in the sighting form:
   - **Author:** Your name
   - **Title:** Title of your post
   - **Description:** Observation with actions of turtle sighted (e.g., "Hawksbill Turtle sighted at Turtle Haven nearby Gili Trawangan.")
3. Click **Submit**
4. Your sighting appears at the top of the list

### Deleting a Sighting

1. Find the sighting you want to remove
2. Click the red **"Delete"** button
3. The sighting is immediately removed from the list


## Project Structure

```
Web App/
├── frontend/                   # React TypeScript frontend
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   └── SightingCard.tsx  # Form for creating sightings
│   │   ├── pages/             # Page components
│   │   │   ├── Home.tsx       # Main page with sighting list
│   │   │   ├── Sighting.tsx   # Individual sighting card
│   │   │   └── SightingsList.tsx  # List container
│   │   ├── types/             # TypeScript type definitions
│   │   ├── utils/             # API utilities and axios config
│   │   └── App.tsx            # Root component
│   └── package.json
│
├── backend/                    # Flask Python backend
│   ├── models/                # Database models
│   │   ├── userModel.py       # User schema
│   │   └── sightingModel.py   # Sighting schema
│   ├── routes/                # API endpoints
│   │   ├── user_routes.py     # User CRUD routes
│   │   └── sighting_routes.py # Sighting CRUD routes
│   ├── controller/            # Business logic
│   │   └── sighting_controller.py
│   ├── repository/            # Database operations
│   │   └── sighting_repository.py
│   ├── extensions.py          # Flask extensions (db, jwt, bcrypt)
│   ├── config.py              # App configuration
│   ├── init_db.py             # Database initialization
│   ├── app.py                 # Flask app factory
│   └── requirements.txt
│
├── docker-compose.yml         # Docker services configuration
└── README.md                  # This file
```

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **TailwindCSS** for styling
- **Axios** for HTTP requests
- **React Hooks** for state management

### Backend
- **Flask** - Python web framework
- **PostgreSQL** - Relational database
- **SQLAlchemy** - ORM for database operations
- **Flask-CORS** - Cross-origin resource sharing
- **Flask-JWT-Extended** - JWT authentication
- **Bcrypt** - Password hashing

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration

## Features

- **User Authentication**: Registration, login, JWT-based auth
- **Marine Life Tracking**: Report and track marine life sightings
- **Computer Vision**: AI-powered species identification
- **Community Platform**: Share sightings and conservation updates
- **Data Visualization**: Interactive maps and charts
- **Admin Panel**: Manage users and verify sightings

## Getting Started

### Prerequisites

- Docker and Docker Compose
- Node.js 18+ (for local development)
- Python 3.11+ (for local development)
- PostgreSQL (for local development)

### Development Setup

1. **Clone and navigate to the project:**
   ```bash
   cd "Y2S1 Materials/IEx Lombok/Web App"
   ```

2. **Start the development environment:**
   ```bash
   docker-compose up --build
   ```

3. **Initialize the database:**
   ```bash
   # Access the backend container
   docker-compose exec backend python init_db.py
   ```

4. **Access the applications:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - Database: localhost:5432
   - To note, the application is yet to be deployed, so it can only still be run on your local machine

## Future Enhancements

- [ ] Image upload for sightings
- [ ] Image AI measurement tool
- [ ] User authentication and profiles
- [ ] Interactive map with sighting locations
- [ ] Data export for research
