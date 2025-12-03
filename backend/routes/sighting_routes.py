from flask import Blueprint, jsonify
from api import sightingFields, sighting_fields
from flask_restful import marshal_with, abort
from backend.exceptions import NotFoundError
from controller.sighting_controller import (get_all_sightings,
                                            add_sighting,
                                            get_sighting,
                                            delete_sighting,
                                            update_sighting
                                        )

# TODO: connect frontend to routes 
# TODO: image uploading 
# TODO: 

sightingsBP = Blueprint('sightings', __name__)

@sightingsBP.route('/sightings', methods=['GET'])
@marshal_with(sightingFields)
def get_all_sightings_route():
    sightings = get_all_sightings()
    return sightings

@marshal_with(sightingFields)
@sightingsBP.route('/sightings', methods=['POST'])
def add_sighting_route():
    args = sighting_fields.parse_args()
    data = {dataType: lineItem for dataType, lineItem in args.items()}
    try:
        sighting = add_sighting(data)   
        return jsonify(sighting.to_dict()), 201 
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@sightingsBP.route('/sightings/<int:id>', methods=['GET'])
@marshal_with(sightingFields)
def get_sighting_route(id):
    try:
        sighting = get_sighting(id)
        return sighting
    except NotFoundError as e:
        abort(404, str(e))

@marshal_with(sightingFields)
@sightingsBP.route('/sightings/<int:id>', methods=['PUT'])
def update_sighting_route(id):
    args = sighting_fields.parse_args()
    sighting = get_sighting(id)
    try:
        updated_sighting = update_sighting(sighting, args)

        return jsonify({
            'message': 'Sighting updated successfully',
            'sighting': updated_sighting.to_dict()
        }), 200
    except NotFoundError as e:
        abort(404, str(e))

@marshal_with(sightingFields)
@sightingsBP.route('/sightings/<int:id>', methods=['DELETE'])
def delete_sighting_route(id):
    sighting = get_sighting(id)
    if not sighting:
        abort(404, "Post not found")
    delete_sighting(sighting)
    return jsonify({'message': 'Sighting deleted successfully'}), 200