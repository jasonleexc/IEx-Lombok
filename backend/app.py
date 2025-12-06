from flask import Flask
from flask_cors import CORS
from config import Config

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Make URL routing flexible with or without trailing slashes
    app.url_map.strict_slashes = False
    
    # Enable CORS for React frontend
    CORS(app, origins=['http://localhost:3000'],
    methods=['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allow_headers=['Content-Type', 'Authorization'], 
    supports_credentials=True)

    # db = SQLAlchemy()
    # Initialise extensions
    from extensions import db, migrate, bcrypt, jwt
    db.init_app(app)
    migrate.init_app(app, db)
    bcrypt.init_app(app)
    jwt.init_app(app)

    # Create database tables
    from init_db import init_db
    init_db(app)
    
    # Register blueprints
    from routes.user_routes import userBP
    from routes.sighting_routes import sightingsBP
    
    app.register_blueprint(userBP, url_prefix='/api/users')
    app.register_blueprint(sightingsBP, url_prefix='/api/sightings')
    
    return app

if __name__ == '__main__':
    app = create_app()
    # Only run in debug mode during development phase
    app.run(debug=True, host='0.0.0.0', port=5001)
