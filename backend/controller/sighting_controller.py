from flask import Blueprint
from backend.exceptions import NotFoundError
from models.sightingModel import SightingModel
from backend.repository.sighting_repository import (add_sighting_to_db, 
                                             delete_sighting_from_db, 
                                             get_all_sightings, 
                                             get_sighting_by_id, update_sighting_in_db)


sightingsBP = Blueprint('sightings', __name__)

# TODO: measurements analytics functions
# TODO: user-specific sightings functions e.g., a user should be able to get his own sightings, update user's sightings
# TODO: implement image uploading functionality
# TODO: use user authorisation checks from user_controller.py 

def get_all_sightings():
    sightings = get_all_sightings()
    return sightings

def add_sighting(sighting_data):
    args = sighting_data.parse_args()
    sighting = SightingModel(
        species=args['species'], 
        location=args['location'], 
        description=args['description'], 
        user_id=args['user_id'])
    add_sighting_to_db(sighting)
    return sighting

def get_sighting(id):
    sighting = get_sighting_by_id(id)
    if not sighting:
        raise NotFoundError("Sighting not found")
    return sighting

# TODO: include user authorisation checks 
def update_sighting(id, data):
    args = data.parse_args()
    new_data = {
        'species': args['species'],
        'location': args['location'],
        'description': args['description']
    }
    sighting = get_sighting_by_id(id)
    if not sighting:
        raise NotFoundError("Sighting not found")
    updated_sighting = update_sighting_in_db(sighting, new_data)

    return updated_sighting

def delete_sighting(id):
    sighting = get_sighting_by_id(id)
    if not sighting:
        raise NotFoundError("Sighting not found")
    delete_sighting_from_db(sighting)
    return sighting