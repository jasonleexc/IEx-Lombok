from datetime import datetime, timezone
from extensions import db, bcrypt
from flask_jwt_extended import create_access_token

class UserModel(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False, index=True)
    email = db.Column(db.String(120), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(128), nullable=False)
    image_file = db.Column(db.String(20), nullable=False, default='default.jpg')
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now(timezone.utc))
    is_active = db.Column(db.Boolean, default=True, nullable=False)
    
    # Relationships
    posts = db.relationship('Post', backref='author', lazy='dynamic', cascade='all, delete-orphan')
    sightings = db.relationship('Sighting', backref='reporter', lazy='dynamic', cascade='all, delete-orphan')
    
    def __repr__(self):
        return f"User('{self.username}', '{self.email}')"

    # Hash and set user's password
    def set_password(self, password):
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    # Check if the provided password matches user's password
    def check_password(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)

    # Generate JWT token for user
    def generate_token(self):
        return create_access_token(identity=self.id)

    # Convert user object to dictionary for JSON serialisation
    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'image_file': self.image_file,
            'created_at': self.created_at.isoformat(),
            'is_active': self.is_active
        }
