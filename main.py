import sqlalchemy as sa
import sqlalchemy.orm as so
from app import my_app, db
from app.models import Pattern

@my_app.shell_context_processor
def make_shell_context():
    return {'sa': sa, 'so': so, 'db': db, 'Pattern':Pattern }