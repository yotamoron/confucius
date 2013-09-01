from flask import Flask
from flask import render_template
from flask import request
from flask import Response

from confucius import app

import os

from confucius.riemann import conf

JSON = os.path.expanduser('~/.riemann.json')
CONFIG = os.path.expanduser('~/.riemann.config')

@app.route("/submitData", methods=['POST'])
def submitData():
    json_model = request.data
    config = conf.render_conf(json_model)
    file(JSON, 'w').write(json_model)
    file(CONFIG, 'w').write(config)
    return Response("", status=200 )

@app.route("/getJsonModel", methods=['GET'])
def getModel():
    json_model = file(JSON, 'r').read()
    return Response(json_model, status=200)
