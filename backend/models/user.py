from datetime import datetime
from extensions import db, bcrypt
from flask_jwt_extended import create_access_token

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False, index=True)
    email = db.Column(db.String(120), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(128), nullable=False)
    image_file = db.Column(db.String(20), nullable=False, default='default.jpg')
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    is_active = db.Column(db.Boolean, default=True, nullable=False)
    
    # Relationships
    posts = db.relationship('Post', backref='author', lazy='dynamic', cascade='all, delete-orphan')
    sightings = db.relationship('Sighting', backref='reporter', lazy='dynamic', cascade='all, delete-orphan')
    
    def __repr__(self):
        return f"User('{self.username}', '{self.email}')"
    
    def set_password(self, password):
        """Hash and set the user's password"""
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')
    
    def check_password(self, password):
        """Check if the provided password matches the user's password"""
        return bcrypt.check_password_hash(self.password_hash, password)
    
    def generate_token(self):
        """Generate JWT token for the user"""
        return create_access_token(identity=self.id)
    
    def to_dict(self):
        """Convert user object to dictionary for JSON serialization"""
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'image_file': self.image_file,
            'created_at': self.created_at.isoformat(),
            'is_active': self.is_active
        }
