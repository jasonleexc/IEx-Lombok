from api import userFields
from backend.exceptions import NotFoundError, AlreadyExistsError, MissingFieldsError, InvalidFieldsError
from flask_restful import marshal_with, abort
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask import request, jsonify, Blueprint
from controller.user_controller import (get_user, 
                                        add_user,
                                        update_user,
                                        login_user,
                                        delete_user)

userBP = Blueprint('user', __name__)

# TODO: connect frontend to routes 

@userBP.route('/user', methods=['GET'])
@marshal_with(userFields)
def get_user_route():
    try:
        user = get_user(get_jwt_identity())
        return user
    except NotFoundError as e:
        abort(404, str(e))

@userBP.route('/users/register', methods=['POST'])
@marshal_with(userFields)
def register_user_route(): 
    data = request.get_json()
        
    try:
        user = add_user(data)
        token = user.generate_token()
        return jsonify({
        'message': 'User created successfully',
        'token': token,
        'user': user.to_dict()
    }), 201
    except MissingFieldsError() as e:
        abort(400, str(e))
    except AlreadyExistsError() as e:
        abort(409, str(e))


    
@userBP.route('/users/login', methods=['POST'])
@marshal_with(userFields)
def login_route():
    try:
        data = request.get_json()
        user = login_user(data)
        return jsonify({
        'message': 'Login successful',
        'user': user.to_dict()
    }), 200
    except MissingFieldsError as e:
        abort(400, str(e))
    except InvalidFieldsError as e:
        abort(401, str(e))

# TODO: logout route
    
@userBP.route('/users/profile', methods=['PUT'])
@jwt_required()
@marshal_with(userFields)
def update_user_profile_route():
    try:
        user = get_user(get_jwt_identity())
        if not user:
            abort(404, "User not found")

        data = request.get_json()
        update_user(user, data)
        
        return jsonify({
            'message': 'Profile updated successfully',
            'user': user.to_dict()
        }), 200
    
    except AlreadyExistsError as e:
        abort(409, str(e))
    except NotFoundError as e:
        abort(404, str(e))
    

@userBP.route('/users/profile', methods=['DELETE'])
@marshal_with(userFields)
def delete_user_route():
    try:
        user = get_user(get_jwt_identity())
        delete_user(user)
        return jsonify({
            'message': 'User deleted successfully',
            'user': user.to_dict()
        }), 200
    except NotFoundError as e:
        abort(404, str(e))