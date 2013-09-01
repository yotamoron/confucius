
import json

CONF_PREFIX = """
; -*- mode: clojure; -*-
; vim: filetype=clojure

(def email (mailer {:from "ops@outbrain.com"}))

;(logging/init :file "/var/log/riemann/riemann.log")

; Listen on the local interface over TCP (5555), UDP (5555), and websockets
; (5556)
(let [host "127.0.0.1"]
  (tcp-server :host host)
  (udp-server :host host)
  (ws-server  :host host))

; Expire old events from the index every 5 seconds.
(periodically-expire 5)

; Keep events in the index for 5 minutes by default.
(let [index (default :ttl 300 (update-index (index)))]

  ; Inbound events will be passed to these streams:
  (streams


"""

CONF_SUFFIX = """
))
"""

class DummyChild:
    def render(self, indent):
        return ""

class BaseElement(object):
    def __init__(self, grp, t, raw):
        self.group = grp
        self.type = t
        self.id = raw['id']
        self.child = DummyChild()

    def set_child(self, child):
        self.child = child

class Source(BaseElement):
    def __init__(self, raw):
        super(Source, self).__init__('source', 'source', raw)
        self.service = raw['fields']['service']

    def render(self, indent):
        child_conf = self.child.render(indent + 2)
        conf = ' '*indent + '(where (service "' + self.service + '")\n'
        conf += child_conf
        conf += ' '*indent +')\n'
        return conf

class Email(BaseElement):
    def __init__(self, raw):
        super(Email, self).__init__('transformer', 'email', raw)
        self.email_address = raw['fields']['email_to']

    def render(self, indent):
        conf = ' '*indent + '(email "' + self.email_address + '")\n'
        return conf

class Rollup(BaseElement):
    def __init__(self, raw):
        super(Rollup, self).__init__('transformer', 'rollup', raw)
        self.n_events = raw['fields']['n_events']
        self.n_seconds = raw['fields']['n_seconds']

    def render(self, indent):
        child_conf = self.child.render(indent + 2)
        conf = ' '*indent + '(rollup ' + "%s" % self.n_events + ' ' + "%s" % self.n_seconds + '\n'
        conf += child_conf
        conf += ' '*indent +')\n'
        return conf

class Where(BaseElement):
    def __init__(self, raw):
        super(Where, self).__init__('transformer', 'where', raw)
        self.exp = raw['fields']['where_param']

    def render(self, indent):
        child_conf = self.child.render(indent + 2)
        conf = ' '*indent + '(where (' + self.exp + ')\n'
        conf += child_conf
        conf += ' '*indent +')\n'
        return conf

class Rate(BaseElement):
    def __init__(self, raw):
        super(Rate, self).__init__('transformer', 'rate', raw)
        self.interval = raw['fields']['interval']

    def render(self, indent):
        child_conf = self.child.render(indent + 2)
        conf = ' '*indent + '(rate ' + "%s" % self.interval + '\n'
        conf += child_conf
        conf += ' '*indent +')\n'
        return conf

def get_raw_transformers_by_type(type, raw_transformers):
    return [t for t in raw_transformers if t['type'] == type]

def to_sources(raw_sources):
    sources = []
    for raw_source in raw_sources:
        sources.append(Source(raw_source))
    return sources

def to_emails(raw_emails):
    emails = []
    for raw_email in raw_emails:
        emails.append(Email(raw_email))
    return emails

def to_rollups(raw_rollups):
    rollups = []
    for raw_rollup in raw_rollups:
        rollups.append(Rollup(raw_rollup))
    return rollups

def to_wheres(raw_wheres):
    wheres = []
    for raw_where in raw_wheres:
        wheres.append(Where(raw_where))
    return wheres

def to_rates(raw_rates):
    rates = []
    for raw_rate in raw_rates:
        rates.append(Rate(raw_rate))
    return rates

def to_transformers_objects(raw_transformers):
    raw_emails = get_raw_transformers_by_type('email', raw_transformers)
    emails = to_emails(raw_emails)
    raw_rollups = get_raw_transformers_by_type('rollup', raw_transformers)
    rollups = to_rollups(raw_rollups)
    raw_wheres = get_raw_transformers_by_type('where', raw_transformers)
    wheres = to_wheres(raw_wheres)
    raw_rates = get_raw_transformers_by_type('rate', raw_transformers)
    rates = to_rates(raw_rates)
    return emails + rollups + wheres + rates

def build_elements(elements_list):
    raw_sources = [s for s in elements_list if s['group'] == 'source']
    sources = to_sources(raw_sources)
    raw_transformers = [s for s in elements_list if s['group'] == 'transformer']
    transformers = to_transformers_objects(raw_transformers)
    all_elements = sources + transformers
    elements_dict = {}
    for e in all_elements:
        elements_dict[e.id] = e

    return elements_dict

def link_elements(elems, conns):
    for conn in conns:
        source_id = conn['source']
        source = elems[source_id]
        target_id = conn['target']
        target = elems[target_id]
        source.child = target

def get_sourcs(elems):
    sources = {}
    for k, v in elems.iteritems():
        if v.group == 'source':
            sources[k] = v
    return sources

def render_from_sources(sources):
    conf = ""
    for k, v in sources.iteritems():
        conf += v.render(4)
    return CONF_PREFIX + conf + CONF_SUFFIX


def render_conf(json_representation):
    conf_dict = json.loads(json_representation)
    elements = build_elements(conf_dict['elements'])
    connections = conf_dict['connections']
    link_elements(elements, connections)
    sources = get_sourcs(elements)
    conf = render_from_sources(sources)

    return conf

if __name__ == "__main__":
    test_conf = file("../../json_example.txt", 'r').read()
    rendered_conf = render_conf(test_conf)
    print rendered_conf
