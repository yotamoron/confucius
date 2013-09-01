function addSource(divId, theTitle) {
	jQuery('<div/>', {
		id: divId,
		class: 'component window',
		text: theTitle,
		group : 'source',
		type : 'source'
	}).appendTo('#main');
	
}