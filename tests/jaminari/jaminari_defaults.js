/*
 * jaminari_defaults.js
 */

var jaminari_defaults = {
	disabled: false,
	currentPage: null,
	numPages: null,
	clazz: "pagination",
	window: 4,
	outerWindow: 0,
	left: 0,
	right: 0,
	paramName: "page",
	first: '&laquo; First',
	prev: '&lsaquo; Prev',
	next: 'Next &rsaquo;',
	last: 'Last &raquo;',
	truncate: '...',
	kaminariClasses: true,
	page: function(page) {
		return true
	}
};

commonWidgetTests('jaminari', {
	defaults: jaminari_defaults
});
