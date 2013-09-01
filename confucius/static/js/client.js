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
			loadConnectionsFromJson(result);
		},
	});
}


function saveModelToServer() {
	var jsonData = getJsonConnections();
	$.ajax({
		url:"/submitData",
		method:"POST",
		data: jsonData,
		contentType: 'application/json',
		dataType: 'json'

	});
}
