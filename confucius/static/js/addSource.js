function addSource(divId) {
	alert("Add Source");
	jQuery('<div/>', {
		id: divId,
		class: 'component window',
		text: 'This test'
	}).appendTo('#main');
	
}