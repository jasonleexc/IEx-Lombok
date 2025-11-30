from flask import Flask
from flask_cors import CORS
from config import Config

app = Flask(__name__)

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)
    
    # Enable CORS for React frontend
    CORS(app, origins=['http://localhost:3000'])

    # Initialise extensions
    from extensions import db, migrate, bcrypt, jwt
    db.init_app(app)
    migrate.init_app(app, db)
    bcrypt.init_app(app)
    jwt.init_app(app)
    
    # Register blueprints
    from routes.auth import auth_bp
    from backend.routes.post_routes import posts_bp
    
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(posts_bp, url_prefix='/api/posts')
    
    return app

if __name__ == '__main__':
    app = create_app()
    # only run in debug mode during development phase, turn to false once application is run
    app.run(debug=True, host='0.0.0.0', port=5000)
