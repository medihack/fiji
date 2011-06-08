/*!
 * jQuery Fiji Overlay @VERSION
 *
 * Copyright (c) 2011 Kai Schlamp
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * https://github.com/medihack/jquery-fiji
 *
 * Depends:
 *   jquery.ui.core.js
 *   jquery.ui.widget.js
 */
(function($, undefined) {

	$.widget("fiji.overlay", {
		options: {
			overlayClass: "fiji-overlay",
			containerClass: "fiji-overlay-container",
			backgroundColor: "#000000",
			opacity: 0.5,
			zIndex: 1000,
			escapeClose: false,
			position: null
		},

		_create: function() {
			var self = this;

			if (self.element[0] === $(window)[0]) {
				self.windowOverlay = true;
			}
			else if (self.element[0] === $(document)[0]) {
				self.documentOverlay = true;
			}

			self._createOverlay();
			self._addOverlayBindings();
		},

		_init: function() {},

		destroy: function() {
			var self = this;

			self.overlay.remove();
			$(window).unbind("resize.fiji-overlay");
			$(document).unbind("keydown.fiji-overlay");

			if (self.container) {
				self.container.remove();
			}

			if (self.windowOverlay || self.documentOverlay) {
				self.element.unbind("." + self.widgetName);
				self.element.removeData(self.widgetName);	
			}
			else {
				$.Widget.prototype.destroy.call(self);
			}
		},

		_createOverlay: function() {
			var self = this, options = self.options;

			var top = 0, left = 0;
			var offset = self.element.offset();
			if (offset) {
				top = offset.top;
				left = offset.left;
			}

			var position = "absolute";
			if (self.windowOverlay) {
				position = "fixed";
			}

			// create the overlay
			self.overlay = $('<div />')
			.addClass(options.overlayClass)
			.appendTo("body")
			.css({
				opacity: options.opacity,
				backgroundColor: options.backgroundColor,
				zIndex: options.zIndex,
				position: position,
				left: top,
				top: left,
				width: self.element.width(),
				height: self.element.height()
			});
		},

		_addOverlayBindings: function() {
			var self = this, options = self.options;

			$(window).bind('resize.fiji-overlay', function () {
				self.overlay.hide();
				self.overlay.css({
					width: self.element.width(),
					height: self.element.height()
				});
				self.overlay.show();
				
				if (self.windowOverlay && self.container) {
					self._setContainerPosition();
				}
			});

			$(document).bind('keydown.fiji-overlay', function (event) {
				if (event.keyCode === $.ui.keyCode.TAB) {
					if ($(event.target).zIndex() < self.overlay.zIndex()) {
						// find a next element to focus that is on top the overlay
						var focusables = $(":focusable").filter(function(index) {
							return $(this).zIndex() >= self.overlay.zIndex();
						});
						if (focusables.length > 0) {
							var focus = focusables.eq(focusables.index(event.target) + 1);
							if (focus) {
								focus.first().focus();
							}
							else {
								focusables.first().focus();
							}
						}
						event.preventDefault();
					}
				}
				else if (event.keyCode === $.ui.keyCode.ESCAPE) {
					if (options.escapeClose) {
						if (self.container) {
							self.closeContainer();
						}
						self.destroy();
					}
					event.preventDefault();
				}
			});			
		},

		_setOption: function(key, value) {
			var self = this, options = self.options;

			self.options[key] = value;

			if (key === "backgroundColor") {
				self.overlay.css("background-color", options.backgroundColor);
			}
			else if (key === "opacity") {
				self.overlay.css("opacity", options.opacity);
			}
			else if (key === "zIndex") {
				self.overlay.css("zIndex", options.zIndex);
				if (self.container) {
					self.container.css("zIndex", options.zIndex + 1);
				}
			}
			else if (key === "position" && self.container) {
				self._setContainerPosition();
			}
		},

		openContainer: function(content) {
			var self = this, options = self.options;

			if (!content) { content = "" }

			var position = "absolute";
			if (self.windowOverlay) {
				position = "fixed";
			}

			self.container = $('<div />')
			.addClass(options.containerClass)
			.appendTo("body")
			.css({
				zIndex: options.zIndex + 1,
				position: position
			});

			if (content instanceof jQuery) {
				self.container.append(content);
			}
			else {
				self.container.html(content);
			}

			self._setContainerPosition();
		},

		_setContainerPosition: function() {
			var self = this, options = self.options;

			var top = 0, left = 0;
			if (options.position) {
				top = options.position[0];
				left = options.position[1];
			}
			else {
				top = ($(window).height() / 2) - (self.container.height() / 2);
				left = ($(window).width() / 2) - (self.container.width() / 2);
			}

			self.container.css({
				top: top,
				left: left
			});
		},

		closeContainer: function() {
			var self = this;

			self.container.remove();
			self.container = null;
		}
	});

	$.extend($.fiji.overlay, {
		version: "@VERSION"
	});

})(jQuery);
