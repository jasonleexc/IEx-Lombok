from flask import Blueprint
from backend.exceptions import AlreadyExistsError, InvalidFieldsError, MissingFieldsError, NotFoundError
from models.userModel import UserModel
from repository.user_repository import (add_user_to_db, 
                                        delete_user_from_db, 
                                        get_user_by_id, 
                                        update_user_in_db)


userBP = Blueprint('user', __name__)

def get_user(id):
    user = get_user_by_id(id)
    if not user:
        raise NotFoundError("User not found")
    return user

def register_user(user_data):
    args = user_data.parse_args()
    user = UserModel(
        username=args['username'], 
        email=args['email'], 
        password=args['password'])
    
    if not user_data or not all(k in user_data for k in ('username', 'email', 'password')):
        raise MissingFieldsError("Missing required fields")
    
    # Check if user already exists 
    if UserModel.query.filter_by(username=user_data['username']).first():
        raise AlreadyExistsError("Username already exists")
    
    if UserModel.query.filter_by(email=user_data['email']).first():
        raise AlreadyExistsError("Email already exists")
    
    add_user_to_db(user)
    return user

def update_user(id, data):
    args = data.parse_args()
    new_data = {
        'username': args['username'],
        'email': args['email'],
        'password': args['password']
    }

    # check if user details already exist
    if 'email' in args:
        existing_user = UserModel.query.filter_by(email=args['email']).first()
        if existing_user and existing_user.id != user.id:
            raise AlreadyExistsError("Email already exists")
        user.email = args['email']
        
    if 'username' in args:
        existing_user = UserModel.query.filter_by(username=args['username']).first()
        if existing_user and existing_user.id != user.id:
            raise AlreadyExistsError("Username already exists")
        user.username = args['username']

    user = get_user_by_id(id)
    if not user:
        raise NotFoundError("User not found")
    
    updated_user = update_user_in_db(user, new_data)
    return updated_user

    
def login_user(data):
    args = data.parse_args()
            
    if not args or not all(k in args for k in ('username', 'password')):
        raise MissingFieldsError("Missing required fields")

    user = get_user_by_id(id)
    if user and user.check_password(args['password']):
        return user
    else:
        raise InvalidFieldsError("Invalid username or password")

def delete_user(id):
    user = get_user_by_id(id)
    if not user:
        raise NotFoundError("User not found")
    delete_user_from_db(user)

# TODO: abstract user validation logic into a separate function
# TODO: implement more user functionality e.g., bio, profile picture, location (reference letterboxd)
# TODO: implement user's personal list of sightings 