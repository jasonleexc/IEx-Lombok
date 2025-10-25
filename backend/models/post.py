from datetime import datetime
from extensions import db

class Post(db.Model):
    __tablename__ = 'posts'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text, nullable=False)
    date_posted = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    is_published = db.Column(db.Boolean, default=True, nullable=False)
    
    def __repr__(self):
        return f"Post('{self.title}', '{self.date_posted}')"

    # Convert post object to dictionary for JSON serialisation
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'content': self.content,
            'date_posted': self.date_posted.isoformat(),
            'user_id': self.user_id,
            'author': self.author.username if self.author else None,
            'is_published': self.is_published
        }
