from sqlalchemy import UniqueConstraint
from app import db

class Pattern(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255))
    pattern_name = db.Column(db.String(255) ) 
    pattern_details = db.Column(db.Text)
    grid_data = db.Column(db.Text)  
    
    # check importance of naming constraints alembic
    __table_args__ = (UniqueConstraint('pattern_name', name='unique_pattern_name_constraint'),)

    def __repr__(self):
        return '<User %r>' % self.username
