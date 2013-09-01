#!/usr/bin/python
import os;
from confucius import app


HOST='127.0.0.1'
PORT=10000
REPO_PATH=os.path.expanduser('~/.confucius')
REPO=None



def init_repo():
    global REPO
    if not os.path.exists(REPO_PATH):
        os.makedirs(REPO_PATH, 0755)

def main():
    init_repo()
    app.run(host=HOST, port=PORT, debug=True)

if __name__ == "__main__":
    main()

