#!/usr/bin/python

from flask import Flask
from flask import render_template
from flask import request
from flask import Response

import os
from git import *

app = Flask(__name__)

HOST='127.0.0.1'
PORT=10000
REPO_PATH=os.path.expanduser('~/.confucius')
REPO=None

@app.route('/confWiring', methods=['GET', 'POST'])
def confWiring():
    if request.method == 'POST':
        file("%s/%s" % (REPO_PATH, 'someFile'), 'a').write('Another post')
        return Response("", status=200)
    else:
        return Response(file("%s/%s" % (REPO_PATH, 'someFile'), 'r').read(), status=200)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return render_template('index.html')


def init_repo():
    global REPO
    if not os.path.exists(REPO_PATH):
        os.makedirs(REPO_PATH, 0755)
    REPO = Repo(REPO_PATH)

def main():
    init_repo()
    app.run(host=HOST, port=PORT)

if __name__ == "__main__":
    main()

