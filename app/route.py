from flask import render_template, jsonify, request
from app import my_app, db
from app.models import Pattern
import json

@my_app.route('/')
def index():
    return render_template('index.html')

@my_app.route('/save-pattern', methods = ['POST'])
def save_pattern():
    data = request.json
    username = data.get('username')
    pattern_name = data.get('patternName')
    pattern_details = data.get('patternDetails')
    grid_data = data.get('gridData')
    grid_data = json.dumps(grid_data)
    print(grid_data)
    # Create a new Pattern object and add it to the database
    pattern = Pattern(username=username, pattern_name=pattern_name, pattern_details=pattern_details, grid_data=grid_data)
    db.session.add(pattern)
    db.session.commit()

    return jsonify({'message': 'Pattern saved Succesfully' }), 200
