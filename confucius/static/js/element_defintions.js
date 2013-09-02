var LEFT_ANCHOR = 0;
var RIGHT_ANCHOR = 1;
var BOTH_ANCHORS = 2;


// Global fields definitions
var defs = {
	source : {
		anchors : RIGHT_ANCHOR,
		fields : [strParam('service')]
	},
	where : {
		anchors : BOTH_ANCHORS,
		fields : [strParam('where_param')]
	},
	rollup : {
		anchors : BOTH_ANCHORS,
		fields : [intParam('n_events'), intParam('n_seconds')]
	},
	rate : {
		anchors : BOTH_ANCHORS,
		fields : [intParam('interval')]
	},
	email : {
		anchors : LEFT_ANCHOR,
		fields : [strParam('email_to')]
	}
};

function getFieldsToDisplay(type) {
	return defs[type].fields;
}

function getUIType(type) {
	return defs[type].anchors;
}

function strParam(name) {
	return {'name':name, 'type':'string'}
}

function intParam(name) {
	return {'name':name, 'type':'int'}
}
