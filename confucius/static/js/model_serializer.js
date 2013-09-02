function dump_model() {
	var elemObjects = []
	$("#main .component").each(function (idx, elem) {
	    var $elem = $(elem);
        var nextElem = {
	    	group : $elem.attr('group'),
	    	type : $elem.attr('type'),
	        id: $elem.attr('id'),
	        title : $elem.text(),
	        fields : {},
	        x: parseInt($elem.css("left"), 10),
	        y: parseInt($elem.css("top"), 10)
	    }
	    nextElem.fields = loadModel(nextElem.id);
	    elemObjects.push(nextElem);
	});

	var connObjects = [];
	$.each(jsPlumb.getConnections(), function (idx, connection) {
	    connObjects.push({
	        id: connection.id,
	        source: connection.sourceId,
	        target: connection.targetId
	    });
	});

	return JSON.stringify({
		elements : elemObjects,
		connections : connObjects
	});
}

function load_model(jsonData) {
	var data = JSON.parse(jsonData);
	var elements = data.elements;
	var connections = data.connections;

	var createdElementMap = {};

	for (var i = 0 ; i < elements.length; i++) {
		var element = elements[i];
		var divId = element.id;
		var elementType = element.type;

		addElement(divId, element.title, elementType, element.group);
		setPosition(divId, element.x, element.y);
		createdElementMap[divId] = configurePlumbElement(divId, getUIType(elementType));
	
		saveModel(divId, element.fields);
	}

	for (var j = 0 ; j < connections.length; j++) {
		var connection = connections[j];

		var sourceEndpoint = createdElementMap[connection.source][0];
		var targetEndpoint = createdElementMap[connection.target][1];
		jsPlumb.connect({source:sourceEndpoint, target:targetEndpoint});
	}
}

