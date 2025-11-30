from api import api, user_fields, userFields, db
from models.userModel import UserModel
from flask_restful import Resource, marshal_with, abort

from backend.models.userModel import User

class Users(Resource):
    @marshal_with(userFields)
    def get(self):
        users = User.query.all()
        return users
    
    @marshal_with(userFields)
    def post(self):
        args = user_fields.parse_args()
        user = UserModel(username=args['username'], email=args['email'])
        db.session.add(user)
        db.session.commit()
        return user, 201
    
class User(Resource):
    @marshal_with(userFields)
    def get(self, id):
        user = User.query.filter(id=id).first()
        if not user:
            abort(404, "User not found")
        return user
    
    @marshal_with(userFields)
    def patch(self, id):
        args = user_fields.parse_args()
        user = User.query.filter(id=id).first()
        if not user:
            abort(404, "User not found")
        user.username = args['username']
        user.email = args['email']
        db.session.commit()
        return user
    
    @marshal_with(userFields)
    def delete(self, id):
        user = User.query.filter(id=id).first()
        if not user:
            abort(404, "User not found")
        db.session.delete(user)
        db.session.commit()
        users = UserModel.query.all()
        return users



api.add_resource(Users, '/users')
api.add_resource(User, '/users/<int:id>')
