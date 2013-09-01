function addElement(divId) {
	jQuery('<div/>', {
		id: divId,
		class: 'component window',
		text: 'This test'
	}).appendTo('#main');
}