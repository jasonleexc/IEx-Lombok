#!/usr/bin/env python3
"""
Database initialization script for IEx Lombok
"""
from app import create_app
from extensions import db
from models import User, Post, Sighting

def init_db():
    """Initialize the database with tables"""
    app = create_app()
    
    with app.app_context():
        # Create all tables
        db.create_all()
        print("Database tables created successfully!")
        
        # Create a test user if none exists
        if not User.query.first():
            test_user = User(
                username='admin',
                email='admin@iexlombok.com'
            )
            test_user.set_password('admin123')
            db.session.add(test_user)
            db.session.commit()
            print("Test user created: admin/admin123")

if __name__ == '__main__':
    init_db()
