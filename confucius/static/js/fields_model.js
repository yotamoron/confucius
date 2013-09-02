var model = {}

function saveModelValue(id, key, value) {
	if (model[id] === undefined) {
		model[id] = {};
	}
 	model[id][key] = value;	
}

function loadModelValue(id, key) {
	if (model[id] === undefined) {
		return "";
	}
	return model[id][key];
}

function loadValuesToElements() {
	
}