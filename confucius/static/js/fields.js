




function createForm(type) {
	fieldsToDisplay = getFieldsToDisplay(type);
	var html = '<form id="generic_form">';
	html += '<label for="title">Title</label>';
    html += '<input align="right" type="text" name="title" id="title" class="text ui-widget-content ui-corner-all" /><br>';
	html += '<input type="hidden" name="element-id" id="element-id"></input>';
	for (var i = 0; i < fieldsToDisplay.length; i++) {

		html += '<label>' + fieldsToDisplay[i].name + '</label> ';
		html += '<input align="right" class="dynamic_field text ui-widget-content ui-corner-all" type="text" id="' + fieldsToDisplay[i].name + '"><br>';

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