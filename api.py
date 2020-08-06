import flask
from flask import request, jsonify 
from flask_cors import CORS, cross_origin

# Crea un objeto flask que contiene data y metodos de la aplicacion
app = flask.Flask(__name__)
CORS(app)
## Para debugear
app.config["DEBUG"] = True

## Diccionario de libros
books = [
    {'id': 0,
     'title': 'A Fire Upon the Deep',
     'author': 'Vernor Vinge',
     'image': 'aforo.jpg'},
    {'id': 1,
     'title': 'The Ones Who Walk Away From Omelas',
     'author': 'Ursula K. Le Guin',
     'image': 'aforo.jpg'},
    {'id': 2,
     'title': 'Dhalgren',
     'author': 'Samuel R. Delany',
     'image': 'aforo.jpg'}
]

## Devuelve todo el cat
@app.route('/books', methods=['GET'])
def api_all():
    return jsonify(books)

## Para ejecutar la apliacion
app.run()
