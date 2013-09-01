function addElement(divId, theTitle, elementType) {
	jQuery('<div/>', {
		id: divId,
		class: 'component window',
		text: theTitle,
		group : 'transformer',
		type : elementType
	}).appendTo('#main');
	
}