/*
 * overlay_defaults.js
 */
var overlay_defaults = {
	overlayClass: "fiji-overlay",
	containerClass: "fiji-overlay-container",
	backgroundColor: "#000000",
	opacity: 0.5,
	zIndex: 1000,
	escapeClose: false,
	position: null,
	disabled: false
};

commonWidgetTests('overlay', {
	defaults: overlay_defaults
});
