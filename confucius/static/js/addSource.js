function addSource() {
	alert("Add Source");
	jQuery('<div/>', {
		id: 'window3',
		class: 'component window',
		text: 'This test'
	}).appendTo('#main');
	
}