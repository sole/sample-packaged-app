window.addEventListener("load", function() {
	var status = document.getElementById('status');
	var items = [];

	items.push(navigator.userAgent);

	status.innerHTML = '<ul>' + items.map(itemise) + '</ul>';

	function itemise(text) {
		return '<li>' + text + '</li>';
	}
});
