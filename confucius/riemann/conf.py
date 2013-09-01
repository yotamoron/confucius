
import json



class BaseElement(object):
    def __init__(self, grp, t, raw):
        self.group = grp
        self.type = t
        self.id = raw['id']

    def set_child(self, child):
        self.child = child

class Source(BaseElement):
    def __init__(self, raw):
        super(Source, self).__init__('source', 'source', raw)
        self.service = raw['fields']['service']

class Email(BaseElement):
    def __init__(self, raw):
        super(Email, self).__init__('transformer', 'email', raw)
        self.email_address = raw['fields']['email_to']

class Rollup(BaseElement):
    def __init__(self, raw):
        super(Rollup, self).__init__('transformer', 'rollup', raw)
        self.n_events = raw['fields']['n_events']
        self.n_seconds = raw['fields']['n_seconds']

class Where(BaseElement):
    def __init__(self, raw):
        super(Where, self).__init__('transformer', 'where', raw)
        self.exp = raw['fields']['where_param']

class Rate(BaseElement):
    def __init__(self, raw):
        super(Rate, self).__init__('transformer', 'rate', raw)
        self.interval = raw['fields']['interval']

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
