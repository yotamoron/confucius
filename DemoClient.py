#!/usr/bin/python

from optparse import OptionParser
import socket
import time
import bernhard
from bernhard import Event

def set_options(parser):
    parser.add_option("-o", "--host", dest="host", default=socket.gethostname())
    parser.add_option("-s", "--service", dest="service", default='www')
    parser.add_option("-t", "--state", dest="state", default='OK')
    parser.add_option("-i", "--time", dest="time", default=int(time.time()))
    parser.add_option("-d", "--description", dest="desc", default="Welcome to Jamaica, Have A Nice Day!")
    parser.add_option("-g", "--tags", dest="tags", default=[])
    parser.add_option("-m", "--metric", dest="metric", default=100)
    parser.add_option("-l", "--ttl", dest="ttl", default=100.0)

def main():
    parser = OptionParser()
    set_options(parser)
    (options, args) = parser.parse_args()
    e = vars(options)
    print e
    riemann = bernhard.Client()
    riemann.send(e)
    print riemann.query('true')

if __name__ == "__main__":
    main()

