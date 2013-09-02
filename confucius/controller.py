from flask import Flask
from flask import render_template
from flask import request
from flask import Response
from confucius import app
import os
from confucius.riemann import conf
from confucius import services;
import psutil
import signal

RIEMANN_BASE = os.environ['RIEMANN_BASE']

JSON = os.path.expanduser('~/.riemann.json')
CONFIG = os.path.expanduser('~/.riemann.config')

def reconf(config):
    file(RIEMANN_BASE + '/etc/riemann.config', 'w').write(config)
    for l in psutil.get_process_list():
        if 'riemann' in ' '.join(l.cmdline):
            l.send_signal(signal.SIGHUP)
            return


@app.route("/submitData", methods=['POST'])
def submitData():
    json_model = request.data
    config = conf.render_conf(json_model)
    file(JSON, 'w').write(json_model)
    file(CONFIG, 'w').write(config)
    reconf(config)
    return Response("", status=200 )

@app.route("/getJsonModel", methods=['GET'])
def getModel():
    json_model = file(JSON, 'r').read()
    return Response(json_model, status=200)

@app.route("/getServiceNames")
def getServiceNames():
    return Response("%s" % services.getOBServices(), status=200)