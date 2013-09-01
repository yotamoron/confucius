
var exampleColor = '#00f';
var connectorStrokeColor = "rgba(50, 50, 200, 1)";
var connectorHighlightStrokeColor = "rgba(180, 180, 200, 1)";
var hoverPaintStyle = { strokeStyle:"#7ec3d9" };

var overlays = [ ["PlainArrow", { fillStyle:"#09098e", width:25, length:25 } ] ];
var exampleDropOptions = {
		tolerance:'touch',
		hoverClass:'dropHover',
		activeClass:'dragActive'
};
var connector = [ "Bezier", { cssClass:"connectorClass", hoverClass:"connectorHoverClass" } ];
var connectorStyle = {
	gradient:{stops:[[0, exampleColor], [0.5, '#09098e'], [1, exampleColor]]},
	lineWidth:5,
	strokeStyle:exampleColor
};

var endpoint = ["Dot", { cssClass:"endpointClass", radius:10, hoverClass:"endpointHoverClass" } ];
var endpointStyle = { fillStyle:exampleColor };
var sourceEndpoint = {
	endpoint:endpoint,
	paintStyle:endpointStyle,
	hoverPaintStyle:{ fillStyle:"#449999" },
	isSource:true, 
	isTarget:false, 
	maxConnections:-1, 
	connector:connector,
	connectorStyle:connectorStyle,
	connectorHoverStyle:hoverStyle,
	connectorOverlays:overlays
};

var targetEndpoint = {
	endpoint:endpoint,
	paintStyle:endpointStyle,
	hoverPaintStyle:{ fillStyle:"#449999" },
	isSource:false, 
	isTarget:true, 
	maxConnections:-1, 
	connector:connector,
	connectorStyle:connectorStyle,
	connectorHoverStyle:hoverStyle,
	connectorOverlays:overlays
};	
var hoverStyle = {strokeStyle:"#449999"};

var LEFT_ANCHOR = 0
var RIGHT_ANCHOR = 1
var BOTH_ANCHORS = 2

// Main configuration of jsPlumb is done here
function configurePlumba() {

	jsPlumb.importDefaults({
		DragOptions : { cursor: "pointer", zIndex:2000 },
		HoverClass:"connector-hover"
	});

	divsWithWindowClass = $(".window");

	for (var i = 0 ; i < divsWithWindowClass.length; i++) {
		var id = jsPlumb.getId(divsWithWindowClass[i])
		configurePlumbElement(id, BOTH_ANCHORS);
	}		  

	// bind click listener; delete connections on click			
	jsPlumb.bind("click", function(conn) {
		jsPlumb.detach(conn);
	});
	
	// bind beforeDetach interceptor: will be fired when the click handler above calls detach, and the user
	// will be prompted to confirm deletion.
	jsPlumb.bind("beforeDetach", function(conn) {
		return confirm("Delete connection?");
	});
}

function configurePlumbElement(id, anchors) {
    var ret = [];
    if (anchors == BOTH_ANCHORS || anchors == RIGHT_ANCHOR) {
    	var sourceEP = jsPlumb.addEndpoint(id, sourceEndpoint, {anchor:"RightMiddle"});
        ret.push(sourceEP)
    }
    if (anchors == BOTH_ANCHORS || anchors == LEFT_ANCHOR) {
	    var targetEP = jsPlumb.addEndpoint(id, targetEndpoint, {anchor:"LeftMiddle"});
        ret.push(targetEP);
    }
	jsPlumb.draggable($("#" + id));
	return ret;
}

function configurePlumbSource(id) {
    return configurePlumbElement(id, RIGHT_ANCHOR);
}

function getJsonConnections() {
	var elemObjects = []
	$("#main .component").each(function (idx, elem) {
	    var $elem = $(elem);
        var nextElem = {
	    	group : $elem.attr('group'),
	    	type : $elem.attr('type'),
	        id: $elem.attr('id'),
	        title : $elem.text(),
	        fields : {
	        	service:"value",
	        	where_param:"value",
	        	n_events:1,
	        	n_seconds:1,
	        	interval:1,
	        	email_to:"e"
	        },
	        x: parseInt($elem.css("left"), 10),
	        y: parseInt($elem.css("top"), 10)
	    }
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


function loadConnectionsFromJson(jsonData) {
	var data = JSON.parse(jsonData);
	var elements = data.elements;
	var connections = data.connections;

	var createdElementMap = {};

	for (var i = 0 ; i < elements.length; i++) {
		var element = elements[i];
		var divId = element.id;
		var elementType = element.type;
		if (element.group == 'source') {
			addSource(divId, element.title);
			setPosition(divId, element.x, element.y);
			createdElementMap[divId] = configurePlumbSource(divId);
		} else {
			addElement(divId, elementType, element.title);
			setPosition(divId, element.x, element.y);
			createdElementMap[divId] = configurePlumbElement(divId, BOTH_ANCHORS);
		}
	}

	console.log(createdElementMap);
	for (var j = 0 ; j < connections.length; j++) {
		var connection = connections[j];

		var sourceEndpoint = createdElementMap[connection.source][0];
		var targetEndpoint = createdElementMap[connection.target][1];
		jsPlumb.connect({source:sourceEndpoint, target:targetEndpoint});
	}

}

function setPosition(divId, x, y) {
	var myDiv = $("#" + divId);
	myDiv.css("top", y);
	myDiv.css("left", x);
}
