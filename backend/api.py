from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api, reqparse, fields

app = Flask(__name__)
api = Api(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db' # change to postgres connection string 
db = SQLAlchemy(app)

user_fields = reqparse.RequestParser()
user_fields.add_argument('username', type=str, required=True, help="Username cannot be blank.")
user_fields.add_argument('email', type=str, required=True, help="Email cannot be blank.")

userFields = {
    'id': fields.Integer,
    'username': fields.String,
    'email': fields.String
}

# All routes here 
@app.route('/')
def home():
    return "IEx Lombok Backend is running."