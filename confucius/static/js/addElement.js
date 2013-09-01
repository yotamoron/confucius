function addElement(divId, elementType) {
	jQuery('<div/>', {
		id: divId,
		class: 'component window',
		text: 'Type : ' + elementType,
		group : 'transformer',
		type : elementType
	}).appendTo('#main');
	
}