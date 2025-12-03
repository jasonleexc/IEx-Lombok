from api import db
from backend.models.userModel import UserModel
    
def get_user_by_id(id):
    user = UserModel.query.get(id)
    return user
    
def add_user_to_db(user):
    db.session.add(user)
    db.session.commit()
    return user
    
def update_user_in_db(user, updates):
    for key, value in updates.items(): 
        setattr(user, key, value)
    db.session.commit()
    return user

def rollback_db():
    db.rollback()
    
def delete_user_from_db(user):
    db.session.delete(user)
    db.session.commit()