/*
 * jillpaginate_defaults.js
 */

var jillpaginate_defaults = {
	clazz: "pagination",
	disabled: false,
	innerWindow: 4,
	outerWindow: 1,
	previousLabel: '&#8592; Previous',
	nextLabel: 'Next &#8594;',
	separator: ' ',
	currentPage: null,
	totalPages: null,
	willPaginateClasses: true,
	followLink: false,
	page: function(page) {
		return true
	},
	href: function(page) {
		return "javascript:void(0);"
	}
};

commonWidgetTests('jillpaginate', {
	defaults: jillpaginate_defaults
});
