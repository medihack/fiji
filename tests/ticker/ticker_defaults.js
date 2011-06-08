/*
 * ticker_defaults.js
 */

var ticker_defaults = {
	disabled: false,
	active: true,
	initialTimeout: 4000,
	mouseOnTimeout: 8000,
	mouseOffTimeout: 4000,
	scrollTime: 800,
	fadeTime: 1000,
    fixContainer: false,
	next: function(lastItem, nextItem) { nextItem(lastItem); }
};

commonWidgetTests('ticker', { defaults: ticker_defaults });
