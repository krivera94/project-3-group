from flask import Flask, jsonify, render_template
from flask_cors import CORS
from sqlalchemy import create_engine
import json

app = Flask(__name__, template_folder="")

CORS(app, resources={r"/*": {"origins": "*"}})

engine = create_engine("postgresql+psycopg2://postgres:postgres@localhost:5432/babynames")

@app.route('/')
def index():
    return render_template('project3.html')

@app.route('/data')
def get_data():
    with open("data.json", "r") as f:
        data = json.load(f)
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
