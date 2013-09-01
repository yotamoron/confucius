$(document).ready(function() {
	$("#btnSave").click(function(){
		saveModelToServer();
	});
	loadModelFromServer();
});


function loadModelFromServer() {
	$.ajax({
		url:"/getJsonModel",
		success: function(result) {
			if (result == '') {
				return;
			}
			load_model(result);
		},
	});
}


function saveModelToServer() {
	var jsonData = dump_model();
	$.ajax({
		url:"/submitData",
		method:"POST",
		data: jsonData,
		contentType: 'application/json',
		dataType: 'json'

	});
}
