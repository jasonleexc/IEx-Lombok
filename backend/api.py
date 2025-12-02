from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api, reqparse, fields

app = Flask(__name__)
api = Api(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:my_password@localhost:5432/turtledb' 
db = SQLAlchemy(app)

user_fields = reqparse.RequestParser()
user_fields.add_argument('username', type=str, required=True, help="Username cannot be blank.")
user_fields.add_argument('email', type=str, required=True, help="Email cannot be blank.")

sighting_fields = reqparse.RequestParser()
sighting_fields.add_argument('species', type=str, required=True, help="Species cannot be blank.")
sighting_fields.add_argument('location', type=str, required=True, help="Location cannot be blank.")
sighting_fields.add_argument('description', type=str, required=True, help="Description cannot be blank.")
sighting_fields.add_argument('sighting_date', type=str, required=True, help="Sighting date cannot be blank.")

userFields = {
    'id': fields.Integer,
    'username': fields.String,
    'email': fields.String
}

sightingFields = {
    'id': fields.Integer,
    'species': fields.String,
    'location': fields.String,
    'description': fields.String,
    'sighting_date': fields.String,
    'user_id': fields.Integer
}

# All routes here 
@app.route('/')
def home():
    return "IEx Lombok Backend is running."