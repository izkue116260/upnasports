import flask
from flask import request, jsonify 
from flask_cors import CORS, cross_origin
import sqlite3

# Crea un objeto flask que contiene data y metodos de la aplicacion
app = flask.Flask(__name__)
CORS(app)
## Para debugear
app.config["DEBUG"] = True

def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    print(d)
    return d

## Devuelve la base de datos de actualidad
@app.route('/actualidad', methods=['GET'])
def api_all():
    
    conn = sqlite3.connect('actualidad.db')
    conn.row_factory = dict_factory
    cur = conn.cursor()
    all_noticias = cur.execute('SELECT * FROM noticias;').fetchall()
    return jsonify(all_noticias)

    ## Devuelve la base de datos de actualidad
@app.route('/actividades', methods=['GET'])
def api_all_actividades():
    
    conn = sqlite3.connect('actividades.db')
    conn.row_factory = dict_factory
    cur = conn.cursor()
    all_books = cur.execute('SELECT * FROM actividades;').fetchall()
    return jsonify(all_books)

## Para ejecutar la apliacion
app.run()
