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

function loadModel(id) {
    return model[id];
}

function saveModel(id, fields) {
    model[id] = fields;
}


function getSelectService(name) {
    var html = '<select align="right" class="dynamic_field text ui-widget-content ui-corner-all" type="text" id="' + name + '">';
    $.ajax({
        url: '/getServiceNames',
        success: function(result) {
            services = eval(result);
            for (var i = 0; i < services.length; i++) {
                service = services[i];
                html += '<option value="' + service + '">' + service + '</option>';
            }
        },
        async: false
    });
    html += '</select>'
    return html
}

function createForm(type) {
    console.log(type);
	fieldsToDisplay = getFieldsToDisplay(type);
	var html = '<form id="generic_form">';
	html += '<label for="title">Title</label>';
    html += '<input align="right" type="text" name="title" id="title" class="text ui-widget-content ui-corner-all" /><br>';
	html += '<input type="hidden" name="element-id" id="element-id"></input>';
	for (var i = 0; i < fieldsToDisplay.length; i++) {

		html += '<label>' + fieldsToDisplay[i].name + '</label> ';
        if (type == 'source') {
            html += getSelectService(fieldsToDisplay[i].name)
        } else {
    		html += '<input align="right" class="dynamic_field text ui-widget-content ui-corner-all" type="text" id="' + fieldsToDisplay[i].name + '"><br>';
        }

	}
	html += '</form>';
	return html;
}

function fillDynamicValues(id) {
	var type = $("#" + id).attr('type');
	var fieldsToDisplay = getFieldsToDisplay(type);
	for (var i = 0; i < fieldsToDisplay.length; i++) {
		var value = loadModelValue(id, fieldsToDisplay[i].name);
		$("#" + fieldsToDisplay[i].name).val(value);
	}
}
