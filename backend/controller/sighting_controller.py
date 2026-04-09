from flask import Blueprint
from exceptions import NotFoundError
from models.sightingModel import SightingModel
from repository.sighting_repository import (
    add_sighting_to_db,
    delete_sighting_from_db,
    get_all_sightings_from_db,
    get_sighting_by_id,
    update_sighting_in_db,
)

from datetime import datetime


sightingsBP = Blueprint('sightings', __name__)

# TODO: measurements analytics functions
# TODO: user-specific sightings functions e.g., a user should be able to get his own sightings, update user's sightings
# TODO: implement image uploading functionality
# TODO: use user authorisation checks from user_controller.py 

def get_all_sightings():
    sightings = get_all_sightings_from_db()
    return sightings

def add_sighting(sighting_data):
    data = sighting_data.parse_args() if hasattr(sighting_data, "parse_args") else (sighting_data or {})

    title = data.get('title')
    author = data.get('author')  
    description = data.get('description')
    user_id = data.get('user_id')
    sighting_date = data.get('sighting_date')

    if not title or not description:
        raise ValueError("Missing required fields: title and description required")

    if author:
        description = f"{description}"

    parsed_date = None
    if sighting_date:
        try:
            # Parse date string like "2024-12-07" and set time to midnight UTC
            parsed_date = datetime.strptime(sighting_date, '%Y-%m-%d').replace(hour=0, minute=0, second=0, microsecond=0)
        except (ValueError, AttributeError):
            raise ValueError("Invalid date format. Use YYYY-MM-DD format")  

    sighting = SightingModel(
        title=title,
        author=author,
        description=description,
        user_id=user_id,
        sighting_date=parsed_date
    )
        
    created = add_sighting_to_db(sighting)
    return created

def get_sighting(id):
    sighting = get_sighting_by_id(id)
    if not sighting:
        raise NotFoundError("Sighting not found")
    return sighting

# TODO: include user authorisation checks 
def update_sighting(id, data):
    payload = data.parse_args() if hasattr(data, "parse_args") else (data or {})

    updates = {}
    if 'title' in payload:
        updates['title'] = payload.get('title')
    if 'description' in payload:
        updates['description'] = payload.get('description')
    if 'sighting_date' in payload:
        try:
            updates['sighting_date'] = datetime.strptime(payload.get('sighting_date'), '%Y-%m-%d').replace(hour=0, minute=0, second=0, microsecond=0)
        except (ValueError, AttributeError):
            raise ValueError("Invalid date format. Use YYYY-MM-DD format")

    sighting = get_sighting_by_id(id)
    if not sighting:
        raise NotFoundError("Sighting not found")

    # if author provided and no user_id, append to description when not explicitly updating description
    if payload.get('author') and 'description' not in updates and not sighting.user_id:
        updates['description'] = (sighting.description or '') + f"\n\nAuthor: {payload.get('author')}"

    updated_sighting = update_sighting_in_db(sighting, updates)
    return updated_sighting

def delete_sighting(id):
    sighting = get_sighting_by_id(id)
    if not sighting:
        raise NotFoundError("Sighting not found")
    delete_sighting_from_db(sighting)
    return sighting