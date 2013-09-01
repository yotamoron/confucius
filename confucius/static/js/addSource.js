function addSource(divId) {
	jQuery('<div/>', {
		id: divId,
		class: 'component window',
		text: 'This test',
		group : 'source',
		type : 'source'
	}).appendTo('#main');
	
}