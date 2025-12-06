#!/usr/bin/env python3
from extensions import db

def init_db(app):
    
    with app.app_context():
        from models import UserModel, SightingModel

        # db.init_app(app)
        # Create all tables
        db.create_all()
        print("Database tables created successfully!")
        
        # Create a test user if none exists
        if not UserModel.query.first():
            test_user = UserModel(
                username='admin',
                email='admin@iexlombok.com'
            )
            test_user.set_password('admin123')
            db.session.add(test_user)
            db.session.commit()
            print("Test user created: admin/admin123")

if __name__ == '__main__':
    from app import create_app
    app = create_app()
    init_db(app)