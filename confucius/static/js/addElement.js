function addElement(divId, theTitle, elementType, groupName) {
	jQuery('<div/>', {
		id: divId,
		class: 'component window',
		text: theTitle,
		group : groupName,
		type : elementType,
		style : "font-size:20px;",
	}).appendTo('#main');
	
}