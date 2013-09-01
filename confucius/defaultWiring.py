from flask import Flask
from flask import render_template
from flask import request
from flask import Response

from confucius import app

#Default wirings


@app.route('/confWiring', methods=['GET', 'POST'])
def confWiring():
    if request.method == 'POST':
        file("%s/%s" % (REPO_PATH, 'someFile'), 'a').write('Another post')
        return Response("", status=200)
    else:
        return Response(file("%s/%s" % (REPO_PATH, 'someFile'), 'r').read(), status=200)



@app.route('/', defaults={'path': 'index.html'})
@app.route('/<path:path>')
def catch_all(path):
    return render_template(path)

