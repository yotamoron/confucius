var LEFT_ANCHOR = 0;
var RIGHT_ANCHOR = 1;
var BOTH_ANCHORS = 2;

var GROUP_SOURCE = "source";
var GROUP_TRANSFORMER = "transformer";

// Global fields definitions
var defs = {
	source : {
		group : GROUP_SOURCE,
		anchors : RIGHT_ANCHOR,
		fields : [strParam('service')]
	},
	where : {
		group : GROUP_TRANSFORMER,
		anchors : BOTH_ANCHORS,
		fields : [strParam('where_param')]
	},
	rollup : {
		group : GROUP_TRANSFORMER,
		anchors : BOTH_ANCHORS,
		fields : [intParam('n_events'), intParam('n_seconds')]
	},
	rate : {
		group : GROUP_TRANSFORMER,
		anchors : BOTH_ANCHORS,
		fields : [intParam('interval')]
	},
	email : {
		group : GROUP_TRANSFORMER,
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

function getGroupName(type) {
	return defs[type].group;
}

function strParam(name) {
	return {'name':name, 'type':'string'}
}

function intParam(name) {
	return {'name':name, 'type':'int'}
}
