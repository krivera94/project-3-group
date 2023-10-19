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

    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Color scales: https://plotly.com/javascript/colorscales/#earth-colorscale

D3 WordCloud: https://d3-graph-gallery.com/wordcloud.html

D3 Stacked Area: https://d3-graph-gallery.com/stackedarea.html

D3 Circular barplot: https://d3-graph-gallery.com/circular_barplot.html


CSV to JSON from LA:
import csv
import json
# Read data from CSV and convert to JSON
csv_file = 'data.csv'
json_file = 'data.json'
data = []
# Read CSV and add rows to the data list
with open(csv_file, 'r') as csvfile:
    csv_reader = csv.DictReader(csvfile)
    for row in csv_reader:
        data.append(row)
# Write data to JSON file
with open(json_file, 'w') as jsonfile:
    jsonfile.write(json.dumps(data, indent=4))
print(f'CSV file "{csv_file}" has been converted to JSON file "{json_file}".')
