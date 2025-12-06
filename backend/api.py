from flask_restful import reqparse, fields

user_fields = reqparse.RequestParser()
user_fields.add_argument('username', type=str, required=True, help="Username cannot be blank.")
user_fields.add_argument('email', type=str, required=True, help="Email cannot be blank.")

sighting_fields = reqparse.RequestParser()
sighting_fields.add_argument('title', type=str, required=True, help="Title cannot be blank.")
sighting_fields.add_argument('author', type=str, required=True, help="Author cannot be blank.")
sighting_fields.add_argument('description', type=str, required=True, help="Description cannot be blank.")

userFields = {
    'id': fields.Integer,
    'username': fields.String,
    'email': fields.String
}

sightingFields = {
    'title': fields.String,
    'author': fields.String,
    'description': fields.String,
}