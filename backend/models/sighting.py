from datetime import datetime
from extensions import db

class Sighting(db.Model):
    __tablename__ = 'sightings'
    
    id = db.Column(db.Integer, primary_key=True)
    species = db.Column(db.String(50), nullable=False)
    location = db.Column(db.String(100), nullable=False)
    latitude = db.Column(db.Float, nullable=True)
    longitude = db.Column(db.Float, nullable=True)
    description = db.Column(db.Text, nullable=True)
    image_path = db.Column(db.String(200), nullable=True)
    confidence_score = db.Column(db.Float, nullable=True)  # AI confidence score
    is_verified = db.Column(db.Boolean, default=False, nullable=False)
    sighting_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    
    # Computer vision analysis results
    ai_species_prediction = db.Column(db.String(50), nullable=True)
    ai_confidence = db.Column(db.Float, nullable=True)
    analysis_metadata = db.Column(db.JSON, nullable=True)  # Store additional AI analysis data
    
    def __repr__(self):
        return f"Sighting('{self.species}', '{self.location}', '{self.sighting_date}')"
    
    def to_dict(self):
        """Convert sighting object to dictionary for JSON serialization"""
        return {
            'id': self.id,
            'species': self.species,
            'location': self.location,
            'latitude': self.latitude,
            'longitude': self.longitude,
            'description': self.description,
            'image_path': self.image_path,
            'confidence_score': self.confidence_score,
            'is_verified': self.is_verified,
            'sighting_date': self.sighting_date.isoformat(),
            'user_id': self.user_id,
            'reporter': self.reporter.username if self.reporter else None,
            'ai_species_prediction': self.ai_species_prediction,
            'ai_confidence': self.ai_confidence,
            'analysis_metadata': self.analysis_metadata
        }
