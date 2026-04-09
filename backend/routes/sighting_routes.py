from flask import Blueprint, jsonify, request
from flask_restful import abort
from exceptions import NotFoundError
from controller.sighting_controller import (get_all_sightings,
                                            add_sighting,
                                            get_sighting,
                                            delete_sighting,
                                            update_sighting
                                        )

# TODO: image uploading 

sightingsBP = Blueprint('sightings', __name__)

@sightingsBP.route('/', methods=['GET'])
def get_all_sightings_route():
    sightings = get_all_sightings()
    # Convert each SightingModel to dict before returning
    return jsonify([sighting.to_dict() for sighting in sightings])

@sightingsBP.route('/', methods=['POST'])
def add_sighting_route():
    data = request.get_json()
    try:
        sighting = add_sighting(data)   
        return jsonify(sighting.to_dict()), 201 
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@sightingsBP.route('/<int:id>', methods=['GET'])
def get_sighting_route(id):
    try:
        sighting = get_sighting(id)
        return sighting
    except NotFoundError as e:
        abort(404, str(e))

@sightingsBP.route('/<int:id>', methods=['PUT'])
def update_sighting_route(id):
    data = request.get_json()
    sighting = get_sighting(id)
    try:
        updated_sighting = update_sighting(sighting, data)

        return jsonify({
            'message': 'Sighting updated successfully',
            'sighting': updated_sighting.to_dict()
        }), 200
    except NotFoundError as e:
        abort(404, str(e))

@sightingsBP.route('/<int:id>', methods=['DELETE'])
def delete_sighting_route(id):
    sighting = get_sighting(id)
    if not sighting:
        abort(404, "Post not found")
    delete_sighting(id)
    return jsonify({'message': 'Sighting deleted successfully'}), 200