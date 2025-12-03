from api import db
from backend.models.sightingModel import SightingModel

def get_all_sightings():
    sightings = SightingModel.query.all()
    return sightings

def get_sighting_by_id(id):
    sighting = SightingModel.query.get(id)
    return sighting

def add_sighting_to_db(sighting):
    db.session.add(sighting)
    db.session.commit()
    return sighting
    
def update_sighting_in_db(sighting, new_data):
    for key, value in new_data.items(): 
        setattr(sighting, key, value)
    db.session.commit()
    return sighting

def rollback_db():
    db.rollback()
    
def delete_sighting_from_db(sighting):
    db.session.delete(sighting)
    db.session.commit()