// Main configuration of jsPlumb is done here
function configurePlumba() {

	jsPlumb.importDefaults({
		DragOptions : { cursor: "pointer", zIndex:2000 },
		HoverClass:"connector-hover"
	});

	//var sourceAnchors = [[0.2, 0, 0, -1, 0, 0, "foo"], [1, 0.2, 1, 0, 0, 0, "bar"], [0.8, 1, 0, 1, 0, 0, "baz"], [0, 0.8, -1, 0, 0, 0, "qux"] ];
	var sourceAnchors = [[0.2, 0, 0, -1, 0, 0, "foo"]];
	var targetAnchors = [[0.6, 0, 0, -1], [1, 0.6, 1, 0], [0.4, 1, 0, 1], [0, 0.4, -1, 0] ];

	var exampleColor = '#00f';
	var connectorStrokeColor = "rgba(50, 50, 200, 1)";
	var connectorHighlightStrokeColor = "rgba(180, 180, 200, 1)";
	var hoverPaintStyle = { strokeStyle:"#7ec3d9" };
	var w23Stroke = "rgb(189,11,11)"; 

	var overlays = [ ["Diamond", { fillStyle:"#09098e", width:25, length:25 } ] ];
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
	var endpoints = {};
	divsWithWindowClass = $(".window");

	// add endpoints to all of these - one for source, and one for target, configured so they don't sit
	// on top of each other.
	for (var i = 0 ; i < divsWithWindowClass.length; i++) {
		console.log(i);
		var id = jsPlumb.getId(divsWithWindowClass[i]);
		endpoints[id] = [
			// note the three-arg version of addEndpoint; lets you re-use some common settings easily.
			jsPlumb.addEndpoint(id, sourceEndpoint, {anchor:"RightMiddle"}),
			jsPlumb.addEndpoint(id, targetEndpoint, {anchor:"LeftMiddle"})
		];
	}		  

	jsPlumb.draggable($(".window"));
	
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