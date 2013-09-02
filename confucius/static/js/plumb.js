
var exampleColor = 'rgb(231, 120, 8)';
var sourceColor = 'rgb(0,0,255)';

var overlays = [ ["PlainArrow", {  width:25, length:25 } ] ];
var exampleDropOptions = {
		tolerance:'touch',
		hoverClass:'dropHover',
		activeClass:'dragActive'
};
var connector = [ "Bezier", { cssClass:"connectorClass", hoverClass:"connectorHoverClass" } ];
var connectorStyle = {
	gradient:{stops:[[0.5, sourceColor], [1, exampleColor]]},
	lineWidth:5,
	strokeStyle:sourceColor
};

var endpoint = ["Dot", { cssClass:"endpointClass", radius:10, hoverClass:"endpointHoverClass" } ];
var endpointStyle = { fillStyle:exampleColor };
var sourceEndpoint = {
	endpoint:endpoint,
	paintStyle:{ fillStyle:sourceColor },
	hoverPaintStyle:{ fillStyle:"#449999" },
	isSource:true, 
	isTarget:false, 
	maxConnections:1, 
	connector:connector,
	connectorStyle:connectorStyle,
	connectorHoverStyle:hoverStyle,
	connectorOverlays:overlays
};

var targetEndpoint = {
	endpoint:endpoint,
	paintStyle:{ fillStyle:exampleColor },
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

	jsPlumb.bind("click", function(conn) {
		jsPlumb.detach(conn);
	});
	
	jsPlumb.bind("beforeDetach", function(conn) {
		return confirm("Delete connection?");
	});
}

function configurePlumbElement(id, anchors) {
    var ret = [];
    var sourceEP = null;
    if (anchors == BOTH_ANCHORS || anchors == RIGHT_ANCHOR) {
    	sourceEP = jsPlumb.addEndpoint(id, sourceEndpoint, {anchor:"RightMiddle"});
    }
    ret.push(sourceEP);

    var targetEP = null;
    if (anchors == BOTH_ANCHORS || anchors == LEFT_ANCHOR) {
	    targetEP = jsPlumb.addEndpoint(id, targetEndpoint, {anchor:"LeftMiddle"});
    }
    ret.push(targetEP);
	jsPlumb.draggable($("#" + id));
	return ret;
}

function configurePlumbSource(id) {
    return configurePlumbElement(id, RIGHT_ANCHOR);
}

function setPosition(divId, x, y) {
	var myDiv = $("#" + divId);
	myDiv.css("top", y);
	myDiv.css("left", x);
}

function deleteEndPoint(id) {
	jsPlumb.detachAllConnections(id);
	jsPlumb.removeAllEndpoints(id);
	jsPlumb.setDraggable(id, false);
	$("#" + id).remove();
}
