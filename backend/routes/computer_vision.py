from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity
from extensions import db
from backend.models.sightingModel import Sighting
from backend.models.userModel import User
import os
import requests
from werkzeug.utils import secure_filename
import uuid

cv_bp = Blueprint('cv', __name__)

def allowed_file(filename):
    """Check if file extension is allowed"""
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in current_app.config['ALLOWED_EXTENSIONS']

@cv_bp.route('/analyze', methods=['POST'])
@jwt_required()
def analyze_image():
    """Analyze uploaded image using computer vision"""
    try:
        user_id = get_jwt_identity()
        
        if 'image' not in request.files:
            return jsonify({'error': 'No image file provided'}), 400
        
        file = request.files['image']
        if file.filename == '':
            return jsonify({'error': 'No image file selected'}), 400
        
        if not allowed_file(file.filename):
            return jsonify({'error': 'Invalid file type'}), 400
        
        # Generate unique filename
        filename = secure_filename(file.filename)
        unique_filename = f"{uuid.uuid4()}_{filename}"
        
        # Create uploads directory if it doesn't exist
        upload_dir = os.path.join(current_app.root_path, current_app.config['UPLOAD_FOLDER'])
        os.makedirs(upload_dir, exist_ok=True)
        
        # Save file
        file_path = os.path.join(upload_dir, unique_filename)
        file.save(file_path)
        
        # Get additional data from form
        location = request.form.get('location', '')
        description = request.form.get('description', '')
        latitude = request.form.get('latitude', type=float)
        longitude = request.form.get('longitude', type=float)
        
        # TODO: Integrate with actual computer vision API
        # For now, return mock analysis
        analysis_result = {
            'species': 'Hawksbill Turtle',
            'confidence': 0.85,
            'metadata': {
                'detected_objects': ['turtle', 'coral'],
                'environment': 'underwater',
                'quality_score': 0.9
            }
        }
        
        # Create sighting record
        sighting = Sighting(
            species=analysis_result['species'],
            location=location,
            latitude=latitude,
            longitude=longitude,
            description=description,
            image_path=file_path,
            confidence_score=analysis_result['confidence'],
            user_id=user_id,
            ai_species_prediction=analysis_result['species'],
            ai_confidence=analysis_result['confidence'],
            analysis_metadata=analysis_result['metadata']
        )
        
        db.session.add(sighting)
        db.session.commit()
        
        return jsonify({
            'message': 'Image analyzed successfully',
            'analysis': analysis_result,
            'sighting': sighting.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@cv_bp.route('/sightings', methods=['GET'])
def get_sightings():
    """Get all sightings"""
    try:
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)
        species_filter = request.args.get('species')
        verified_only = request.args.get('verified', 'false').lower() == 'true'
        
        query = Sighting.query
        
        if species_filter:
            query = query.filter(Sighting.species.ilike(f'%{species_filter}%'))
        
        if verified_only:
            query = query.filter_by(is_verified=True)
        
        sightings = query.order_by(Sighting.sighting_date.desc())\
                        .paginate(page=page, per_page=per_page, error_out=False)
        
        return jsonify({
            'sightings': [sighting.to_dict() for sighting in sightings.items],
            'total': sightings.total,
            'pages': sightings.pages,
            'current_page': page
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@cv_bp.route('/sightings/<int:sighting_id>', methods=['GET'])
def get_sighting(sighting_id):
    """Get a specific sighting by ID"""
    try:
        sighting = Sighting.query.get_or_404(sighting_id)
        return jsonify({'sighting': sighting.to_dict()}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@cv_bp.route('/sightings/<int:sighting_id>/verify', methods=['POST'])
@jwt_required()
def verify_sighting(sighting_id):
    """Verify a sighting (admin function)"""
    try:
        # TODO: Add admin role check
        sighting = Sighting.query.get_or_404(sighting_id)
        sighting.is_verified = True
        db.session.commit()
        
        return jsonify({
            'message': 'Sighting verified successfully',
            'sighting': sighting.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
