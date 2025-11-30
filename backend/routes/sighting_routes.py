from flask import Blueprint, jsonify
from api import api, sightingFields, sighting_fields, db
from models.sightingModel import Sighting
from flask_restful import Resource, marshal_with, abort
from repository.sightings_repository import addSightingToDB, deleteSightingFromDB

# abstract returning to controller layer 
sightingsBP = Blueprint('sightings', __name__)

class Sightings(Resource):
    @sightingsBP.route('/sightings', methods=['GET'])
    @marshal_with(sightingFields)
    def getSightings(self):
        sightings = getSighting().all()
        return sightings
    
    @marshal_with(sightingFields)
    def post(self):
        args = sighting_fields.parse_args()
        sighting = Sighting(species=args['species'], location=args['location'], description=args['description'], user_id=args['user_id'])
        addSightingToDB(sighting)
        return sighting, 201
    
class Sighting(Resource):
    @sightingsBP.route('/sightings', methods=['GET'])
    @marshal_with(sightingFields)
    def getSighting(self, id):
        sighting = getSighting().filter(id=id).first()
        if not sighting:
            abort(404, "Post not found")
        return sighting
    
    @marshal_with(sightingFields)
    @sightingsBP.route('/sightings', methods=['PUT'])
    def updateSighting(self, id):
        args = sighting_fields.parse_args()
        sighting = sighting_fields.query.filter(id=id).first()
        if not sighting:
            abort(404, "Post not found")
            sighting.species = args['species']
            sighting.location = args['location']
            sighting.description = args['description']
            
        db.session.commit()
            
        return jsonify({
            'message': 'Profile updated successfully',
            'user': sighting.to_dict()
        }), 200
    
    @marshal_with(sightingFields)
    def deleteSighting(self, id):
        sighting = sighting_fields.query.filter(id=id).first()
        if not sighting:
            abort(404, "Post not found")
        deleteSightingFromDB(sighting)
        return sighting

def getSighting():
    try:
        sighting = Sighting.query.get(id)
        if not sighting:
            return jsonify({'error': 'Sighting not found'}), 404
        return jsonify({'sighting': sighting.to_dict()}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


api.add_resource(Sightings, '/sightings')
api.add_resource(Sighting, '/sightings/<int:id>')