/*!
 * jQuery Fiji Jaminari @VERSION
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

	var CONTAINER_CLASSES = "fiji-jaminari"
	var PAGE_CLASSES = "fiji-jaminari-page";
	var CURRENT_PAGE_CLASSES = "fiji-jaminari-current";
	var GAP_CLASSES = "fiji-jaminari-gap";
	var FIRST_PAGE_CLASSES = "fiji-jaminari-first";
	var PREV_PAGE_CLASSES = "fiji-jaminari-previous";
	var NEXT_PAGE_CLASSES = "fiji-jaminari-next";
	var LAST_PAGE_CLASSES = "fiji-jaminari-last";
	var HOVER_CLASSES = "fiji-jaminari-hover";

	var PageProxy = function(options, page) {
		this.isCurrent = function() { return page == options.currentPage }
		this.isFirst = function() { return page == 1 }
		this.isLast = function() { return page == options.numPages }
		this.isPrev = function() { return page == (options.currentPage - 1) }
		this.isNext = function() { return page == (options.currentPage + 1) }
		this.isLeftOuter = function() { return page <= (options.left || options.outerWindow) }
		this.isRightOuter = function() { return (options.numPages - page) < (options.right || options.outerWindow) }
		this.isInsideWindow = function() { return Math.abs(options.currentPage -page) <= options.window }
		this.number = function() { return page }
	}

	var View = {
		firstPage: function(self, options, currentPageProxy) {
			var span = $('<span>').addClass(FIRST_PAGE_CLASSES);
			if (!currentPageProxy.isFirst()) {
				span.append(function() {
					return $('<a href="javascript:void(0);">')
					.html(options.first)
					.bind('click.jaminari', function() {
						self.firstPage();
						return false;
					});
				});
			}
			return span;
		},

		gap: function(self, options) {
			return $('<span>').addClass(GAP_CLASSES).html(options.truncate);
		},

		lastPage: function(self, options, currentPageProxy) {
			var span = $('<span>').addClass(LAST_PAGE_CLASSES);
			if (!currentPageProxy.isLast()) {
				span.append(function() {
					return $('<a href="javascript:void(0);">')
					.html(options.last)
					.bind('click.jaminari', function() {
						self.lastPage();
						return false;
					});
				});
			}
			return span;
		},

		nextPage: function(self, options, currentPageProxy) {
			var span = $('<span>').addClass(NEXT_PAGE_CLASSES);
			if (!currentPageProxy.isLast()) {
				span.append(function() {
					return $('<a href="javascript:void(0);">')
					.attr("rel", "next")
					.html(options.next)
					.bind('click.jaminari', function() {
						self.nextPage();
						return false;
					});
				});
			}
			return span;
		},

		page: function(self, options, pageProxy) {
			var span = $('<span>');
			if (!pageProxy.isCurrent()) {
				span.addClass(PAGE_CLASSES)
				.append(function() {
					var link = $('<a href="javascript:void(0);">');
					if (pageProxy.isNext()) { link.attr("rel", "next") }
					if (pageProxy.isPrev()) { link.attr("rel", "prev") }
					link.html(pageProxy.number());
					link.bind('click.jaminari', function() {
						self.page(pageProxy.number());
						return false;
					});
					return link;
				});
			}
			else {
				span.addClass(CURRENT_PAGE_CLASSES)
				.html(pageProxy.number());
			}
			return span;
		},

		prevPage: function(self, options, currentPageProxy) {
			var span = $('<span>').addClass(PREV_PAGE_CLASSES);
			if (!currentPageProxy.isFirst()) {
				span.append(function() {
					return $('<a href="javascript:void(0);">')
					.attr("rel", "prev")
					.html(options.prev)
					.bind('click.jaminari', function() {
						self.prevPage();
						return false;
					});
				});
			}
			return span;
		},
	}

	$.widget("fiji.jaminari", {
		options: {
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
		},
	
		_create: function() {
			var self = this;

			self.element.addClass(CONTAINER_CLASSES);

			if (self.options.clazz) {
				self.element.addClass(self.options.clazz);
			}

			if (self.options.kaminariClasses) {
				FIRST_PAGE_CLASSES += " first";
				PREV_PAGE_CLASSES += " prev";
				PAGE_CLASSES += " page";
				CURRENT_PAGE_CLASSES += " page current";
				NEXT_PAGE_CLASSES += " next";
				LAST_PAGE_CLASSES += " last";
				GAP_CLASSES += " page gap";
			}

			self._render();
		},
	
		_init: function() {},

		destroy: function() {
			var self = this;
		
			self.element.empty();

			self.element.removeClass(CONTAINER_CLASSES);

			if (self.options.clazz) {
				self.element.removeClass(self.options.clazz);
			}

			return $.Widget.prototype.destroy.call(self);
		},
	
		page: function(page, numPages) {
			var self = this, options = self.options;
      
			if (numPages === undefined) {
				numPages = options.numPages;
			}

			if (page > 0 && page <= numPages) {
				if (options.page(page)) {
					self.element.empty();
					options.currentPage = page;
					options.numPages = numPages;
					self._render();
				}
			}

			return false;
		},

		firstPage: function() {
			var self = this;
			return self.page(1);
		},

		lastPage: function() {
			var self = this, options = self.options;
			return self.page(options.numPages)
		},

		nextPage: function() {
			var self = this, options = self.options;
			return self.page(options.currentPage + 1);
		},

		prevPage: function() {
			var self = this, options = self.options;
			return self.page(options.currentPage - 1);
		},

		_render: function () {
			var self = this, options = self.options;

			var currentPageProxy = new PageProxy(options, options.currentPage);

			if (!currentPageProxy.isFirst()) {
				self.element.append(View.firstPage(self, options, currentPageProxy));
				self.element.append("\n");
				self.element.append(View.prevPage(self, options, currentPageProxy));
				self.element.append("\n");
			}

			var wasTruncated = false;
			for (var i = 1, length = options.numPages; i <= length; i++) {
				var pageProxy = new PageProxy(options, i);
				if (pageProxy.isLeftOuter() || pageProxy.isRightOuter() || pageProxy.isInsideWindow()) {
					self.element.append(View.page(self, options, pageProxy));
					self.element.append("\n");
					wasTruncated = false;
				}
				else {
					if (!wasTruncated) {
						self.element.append(View.gap(self, options));
						self.element.append("\n");
						wasTruncated = true;
					}
				}
			}

			if (!currentPageProxy.isLast()) {
				self.element.append(View.nextPage(self, options, currentPageProxy));
				self.element.append("\n");
				self.element.append(View.lastPage(self, options, currentPageProxy));
				self.element.append("\n");
			}
		}
	});

	$.extend($.fiji.jaminari, {
		version: "@VERSION"
	});

})(jQuery);
