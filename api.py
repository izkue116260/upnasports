import flask
from flask import request, jsonify 
from flask_cors import CORS, cross_origin
from datetime import date
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
    return d

## Devuelve la base de datos de actualidad
@app.route('/actualidad', methods=['GET'])
def api_all():
    conn = sqlite3.connect('actualidad.db')
    conn.row_factory = dict_factory
    cur = conn.cursor()
    all_noticias = cur.execute('SELECT * FROM noticias;').fetchall()
    return jsonify(all_noticias)

## Devuelve la base de datos de actividades
@app.route('/actividades', methods=['GET'])
def api_all_actividades():
    conn = sqlite3.connect('actividades.db')
    conn.row_factory = dict_factory
    cur = conn.cursor()
    all_actividades = cur.execute('SELECT * FROM actividades;').fetchall()
    return jsonify(all_actividades)

## Logo
@app.route('/logo', methods=['GET'])
def api_all_logo():
    conn = sqlite3.connect('logo.db')
    conn.row_factory = dict_factory
    cur = conn.cursor()
    all_logo = cur.execute('SELECT * FROM logo;').fetchall()
    print("hola")
    return jsonify(all_logo)

## Devuelve la base de datos de reservas
@app.route('/reservas', methods=['GET'])
def api_all_reservas():
    args = request.args
    print("hola",args["dia"])
    conn = sqlite3.connect('reservas.db')
    conn.row_factory = dict_factory
    cur = conn.cursor()
    cur.execute('SELECT * FROM reservas WHERE dia = ?',(args["dia"],))
    all_reservas = cur.fetchall()
    print("adios ",all_reservas)
    return jsonify(all_reservas)


@app.route('/formulario-reservas', methods=['POST'])
def api_formulario_reservas():
    reserva = request.get_json()
    sql = "INSERT into reservas (dia,hora,lugar,idUsuario,admitida) VALUES (?,?,?,?,?)"
    valores = (reserva["dia"],reserva["hora"],reserva["lugar"],reserva["idUsuario"],reserva["admitida"])
    conn = sqlite3.connect('reservas.db')
    conn.row_factory = dict_factory
    cur = conn.cursor()
    cur.execute(sql,valores)
    conn.commit()
    return reserva

## Para ejecutar la apliacion
app.run()

