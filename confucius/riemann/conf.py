
import json

class Stream:
    def __init__(self):
        print "This is a source"

def render_conf(json_representation):
    conf_dict = json.loads(json_representation)

