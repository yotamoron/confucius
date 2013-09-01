
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

function setPosition(divId, x, y) {
	var myDiv = $("#" + divId);
	myDiv.css("top", y);
	myDiv.css("left", x);
}
