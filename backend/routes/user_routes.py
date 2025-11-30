from api import api, user_fields, userFields, db
from repository.user_repository import deleteUserFromDB, addUserToDB
from models.userModel import UserModel
from flask_restful import Resource, marshal_with, abort
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask import request, jsonify, Blueprint

userBP = Blueprint('user_routes', __name__)

# abstract returning to controller layer 
class Users(Resource):
    @marshal_with(userFields)
    def get(self):
        try:
            user = getProfile()
            return user
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    
    @marshal_with(userFields)
    def post(self):
        args = user_fields.parse_args()
        user = UserModel(username=args['username'], email=args['email'])
        addUserToDB(user)
        return user, 201 
    
class User(Resource):
    @userBP.route('/profile', methods=['GET'])
    @jwt_required()
    @marshal_with(userFields)
    def get_profile(self):
        try:
            user = getProfile()
            return user
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    @marshal_with(userFields)
    @userBP.route('/register', methods=['POST'])
    def register(user): 
        try:
            data = request.get_json()

            # Validate required fields
            if not data or not all(k in data for k in ('username', 'email', 'password')):
                return jsonify({'error': 'Missing required fields'}), 400
            
            # Check if user already exists
            if User.query.filter_by(username=data['username']).first():
                return jsonify({'error': 'Username already exists'}), 400
            
            if User.query.filter_by(email=data['email']).first():
                return jsonify({'error': 'Email already exists'}), 400
            
            # Create new user 
            user = User(
                username=data['username'],
                email=data['email'] 

            )
            user.set_password(data['password'])
        
            addUserToDB(user)

            # Generate token
            token = user.generate_token()
            
            return jsonify({
                'message': 'User created successfully',
                'token': token,
                'user': user.to_dict()
            }), 201

        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 500
        
    @userBP.route('/login', methods=['POST'])
    def login():
        try:
            data = request.get_json()
            
            if not data or not all(k in data for k in ('username', 'password')):
                return jsonify({'error': 'Missing username or password'}), 400
            
            user = User.query.filter_by(username=data['username']).first()
            
            if user and user.check_password(data['password']):
                token = user.generate_token()
                return jsonify({
                    'message': 'Login successful',
                    'token': token,
                    'user': user.to_dict()
                }), 200
            else:
                return jsonify({'error': 'Invalid username or password'}), 401
                
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    
    @userBP.route('/profile', methods=['PUT'])
    @jwt_required()
    @marshal_with(userFields)
    def updateUserProfile(self):
        try:
            user = User.query.get(get_jwt_identity())
            if not user:
                abort(404, "User not found")

            data = request.get_json()
            
            if 'email' in data:
                # Check if email is already taken by another user
                existing_user = User.query.filter_by(email=data['email']).first()
                if existing_user and existing_user.id != user.id:
                    return jsonify({'error': 'Email already exists'}), 400
                user.email = data['email']
            
            if 'username' in data:
                # Check if username is already taken by another user
                existing_user = User.query.filter_by(username=data['username']).first()
                if existing_user and existing_user.id != user.id:
                    return jsonify({'error': 'Username already exists'}), 400
                user.username = data['username']
            
            db.session.commit()
            
            return jsonify({
                'message': 'Profile updated successfully',
                'user': user.to_dict()
            }), 200
        
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 500

    
    @marshal_with(userFields)
    def deleteUser(self):
        user = User.query.get(get_jwt_identity())
        if not user:
            abort(404, "User not found")
        deleteUserFromDB(user)
        users = UserModel.query.all()
        return users

def getProfile():
    try:
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        if not user:
            return jsonify({'error': 'User not found'}), 404
        return jsonify({'user': user.to_dict()}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


api.add_resource(Users, '/users')
api.add_resource(User, '/users/<int:id>')
