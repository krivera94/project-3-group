from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
from flask_cors import CORS

# Create engine

engine = create_engine("postgresql+psycopg2:postgres:Wildcat2023!@localhost:5432/project_3")
