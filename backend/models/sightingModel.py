from datetime import datetime, timezone
from extensions import db

# TODO: amend based on data required
class SightingModel(db.Model):
    __tablename__ = 'sightings'
    
    sightingID = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    author = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    sighting_date = db.Column(db.DateTime, nullable=False, default=datetime.now(timezone.utc))

    # foreign key to users table 
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)

    # TODO: work on image recognition in later versions

    def __repr__(self):
        return f"Sighting('{self.title}', '{self.author}', '{self.sighting_date}')"

    # Convert sighting object to dictionary for JSON serialisation
    def to_dict(self):
        return {
            'id': self.sightingID,
            'title': self.title,
            'author': self.author,
            'description': self.description,
            'sighting_date': self.sighting_date.isoformat(),
            'user_id': self.user_id,
        }
