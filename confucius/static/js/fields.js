// Global fields definitions
var fields_def = {};

fields_def['source'] = [strParam('service')];
fields_def['where'] = [strParam('where_param')];
fields_def['rollup'] = [intParam('n_events'), intParam('n_seconds')];
fields_def['rate'] = [intParam('interval')];
fields_def['email'] = [strParam('email_to')];

function strParam(name) {
	return {'name':name, 'type':'string'}
}

function intParam(name) {
	return {'name':name, 'type':'int'}
}