from flask import render_template, jsonify, request, redirect
from app import my_app, db
from app.models import Pattern
import json

@my_app.route('/')

@my_app.route('/index')
def index():
    saved_patterns = Pattern.query.all()
    return render_template('index.html', patterns=saved_patterns)

@my_app.route('/save-pattern', methods = ['POST'])
def save_pattern():
    data = request.json
    username = data.get('username')
    pattern_name = data.get('patternName')
    pattern_details = data.get('patternDetails')
    grid_data = data.get('gridData')
    grid_data = json.dumps(grid_data)
    # Create a new Pattern object and add it to the database
    pattern = Pattern(username=username, pattern_name=pattern_name, pattern_details=pattern_details, grid_data=grid_data)
    db.session.add(pattern)
    db.session.commit()

    return redirect('/index')

@my_app.route('/delete_pattern/<id>')
def delete_pattern(id):
    get_pattern = Pattern.query.get_or_404(id)

    try:
        db.session.delete(get_pattern)
        db.session.commit()
        return redirect('/index')
    except:
        return "There was a problem deleting the pattern."