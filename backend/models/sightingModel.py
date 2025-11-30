from datetime import datetime
from extensions import db

# TODO: amend based on data required
class Sighting(db.Model):
    __tablename__ = 'sightings'
    
    id = db.Column(db.Integer, primary_key=True)
    species = db.Column(db.String(50), nullable=False)
    location = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=True)
    sighting_date = db.Column(db.DateTime, nullable=False, default=datetime.now(datetime.timezone.utc))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    # TODO: work on image recognition in later versions
    # Computer vision analysis results
    # ai_species_prediction = db.Column(db.String(50), nullable=True)
    # ai_confidence = db.Column(db.Float, nullable=True)
    # analysis_metadata = db.Column(db.JSON, nullable=True)  # Store additional AI analysis data

    def __repr__(self):
        return f"Sighting('{self.species}', '{self.location}', '{self.sighting_date}')"

    # Convert sighting object ot dictionary for JSON serialisation
    def to_dict(self):
        return {
            'id': self.id,
            'species': self.species,
            'location': self.location,
            'description': self.description,
            'sighting_date': self.sighting_date.isoformat(),
            'user_id': self.user_id,
            
            # TODO: add in later on once image recognition software is up
            # 'ai_species_prediction': self.ai_species_prediction,
            # 'ai_confidence': self.ai_confidence,
            # 'analysis_metadata': self.analysis_metadata
        }
