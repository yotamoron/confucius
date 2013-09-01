from flask import Flask
from flask import render_template
from flask import request
from flask import Response

from confucius import app

@app.route("/submitData", methods=['POST'])
def submitData():
    return Response("%s %s" % (myconfig.prefix, request.form['data']), status=200 )
