# project-3-group

app.py code:
from flask import Flask, jsonify, render_template
from flask_cors import CORS
from sqlalchemy import create_engine

app = Flask(__name__, template_folder="")

engine = create_engine("postgresql+psycopg2://postgres:postgres@localhost:5432/babynames")

CORS(app)

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
