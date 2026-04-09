# IEx Lombok - Marine Conservation Web App

A full-stack web application for marine conservation and turtle sighting tracking, built with React + TypeScript + TailwindCSS frontend and Flask + PostgreSQL backend.

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

### Frontend
- **React 18** with TypeScript
- **TailwindCSS** for styling
- **React Router** for navigation
- **Axios** for API calls

### Backend
- **Flask** (Python) with RESTful API
- **PostgreSQL** database
- **SQLAlchemy** ORM
- **Flask-JWT-Extended** for authentication
- **Computer Vision** integration for species identification

### Infrastructure
- **Docker** for containerization
- **Docker Compose** for development environment

## Project Structure

```
├── frontend/                 # React + TypeScript frontend
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/          # Page components
│   │   └── App.tsx         # Main app component
│   ├── public/             # Static assets
│   └── package.json        # Frontend dependencies
├── backend/                 # Flask backend
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── extensions.py       # Flask extensions
│   ├── config.py          # Configuration
│   └── requirements.txt   # Python dependencies
├── database/               # Database initialization
├── docker-compose.yml      # Docker services
└── README.md              # This file
```

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

### Local Development (without Docker)

#### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python init_db.py
python run.py
```

#### Frontend Setup
```bash
cd frontend
npm install
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Posts
- `GET /api/posts` - Get all posts
- `GET /api/posts/<id>` - Get specific post
- `POST /api/posts` - Create new post
- `PUT /api/posts/<id>` - Update post
- `DELETE /api/posts/<id>` - Delete post

### Computer Vision
- `POST /api/cv/analyze` - Analyze uploaded image
- `GET /api/cv/sightings` - Get all sightings
- `GET /api/cv/sightings/<id>` - Get specific sighting
- `POST /api/cv/sightings/<id>/verify` - Verify sighting

## Environment Variables

Create a `.env` file in the backend directory:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/iex_lombok
SECRET_KEY=your-secret-key
JWT_SECRET_KEY=your-jwt-secret
CV_API_URL=http://localhost:8000
CV_API_KEY=your-cv-api-key
```

## Database Models

### User
- id, username, email, password_hash
- image_file, created_at, is_active

### Post
- id, title, content, date_posted
- user_id, is_published

### Sighting
- id, species, location, latitude, longitude
- description, image_path, confidence_score
- is_verified, sighting_date, user_id
- ai_species_prediction, ai_confidence, analysis_metadata

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Contact

For questions or support, please contact the development team.
