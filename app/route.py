from flask import render_template
from app import my_app

@my_app.route('/')
def index():
    return render_template('index.html')


