/*!
 * jQuery Fiji JillPaginate @VERSION
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

	var CONTAINER_CLASSES = "fiji-jillpaginate"
	var PAGE_CLASSES = "fiji-jillpaginate-page";
	var CURRENT_PAGE_CLASSES = "fiji-jillpaginate-current";
	var GAP_CLASSES = "fiji-jillpaginate-gap";
	var PREVIOUS_PAGE_CLASSES = "fiji-jillpaginate-previous";
	var NEXT_PAGE_CLASSES = "fiji-jillpaginate-next";
	var DISABLED_CLASSES = "fiji-jillpaginate-disabled";

	var GAP = "gap";
	var PREVIOUS_PAGE = "previous_page";
	var NEXT_PAGE = "next_page";

	$.widget("fiji.jillpaginate", {
		options: {
			clazz: "pagination",
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
		},
	
		_create: function() {
			var self = this;

			self.element.addClass(CONTAINER_CLASSES);

			if (self.options.clazz) {
				self.element.addClass(self.options.clazz);
			}

			if (self.options.willPaginateClasses) {
				PREVIOUS_PAGE_CLASSES += " previous_page";
				NEXT_PAGE_CLASSES += " next_page";
				DISABLED_CLASSES += " disabled";
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
	
		page: function(page, totalPages) {
			var self = this, options = self.options;
      
			if (totalPages === undefined) {
				totalPages = options.totalPages;
			}

			if (page > 0 && page <= totalPages) {
				if (options.page(page)) {
					self.element.empty();
					options.currentPage = page;
					options.totalPagtes = totalPages;
					self._render();
				}
			}

			return false;
		},

		nextPage: function() {
			var self = this;

			var nextPage = self._nextPageNumber();
			if (nextPage) {
				return self.page(nextPage);
			}

			return false
		},

		previousPage: function() {
			var self = this;

			var previousPage = self._previousPageNumber();
			if (previousPage) {
				return self.page(previousPage);
			}

			return false;
		},

		_render: function () {
			var self = this, options = self.options;

			var pagination = self._pagination();

			for (var i=0; i < pagination.length; i++) {
				if (i > 0) {
					self.element.append(options.separator);
				}

				var item = pagination[i];

				if (item === GAP) {
					$('<span>&hellip;</span>')
					.addClass(GAP_CLASSES)
					.appendTo(self.element);
				}
				else if (item === NEXT_PAGE) {
					if (self._nextPageNumber()) {
						$('<a />').html(options.nextLabel)
						.addClass(NEXT_PAGE_CLASSES)
						.bind('click.jillpaginate', function() {
							return (self.nextPage() && options.followLink);
						})
						.appendTo(self.element);
					}
					else {
						$('<span />').html(options.nextLabel)
						.addClass(NEXT_PAGE_CLASSES + ' ' + DISABLED_CLASSES)
						.appendTo(self.element);
					}
				}
				else if (item === PREVIOUS_PAGE) {
					if (self._previousPageNumber()) {
						$('<a />').html(options.previousLabel)
						.addClass(PREVIOUS_PAGE_CLASSES)
						.bind('click.jillpaginate', function() {
							return (self.previousPage() && options.followLink);
						})
						.appendTo(self.element);
					}
					else {
						$('<span />').html(options.previousLabel)
						.addClass(PREVIOUS_PAGE_CLASSES + ' ' + DISABLED_CLASSES)
						.appendTo(self.element);
					}
				}
				else { // page number
					if (item !== options.currentPage) {
						$('<a />').html(item)
						.data('page', item)
						.attr('href', options.href(item))
						.attr('rel', self._relValue(item))
						.bind('click.jillpaginate', function() {
							return (self.page($(this).data('page')) && options.followLink);
						})
						.addClass(PAGE_CLASSES)
						.appendTo(self.element);
					}
					else {
						$('<em />').html(item)
						.addClass(CURRENT_PAGE_CLASSES)
						.appendTo(self.element);
					}
				}
			}

			// adapt href of previous page and next page
			var prevHref = self.element.find('a[rel~="prev"]').attr('href');
			self.element.find('.fiji-jillpaginate-previous').attr('href', prevHref);
			var nextHref = self.element.find('a[rel~="next"]').attr('href');
			self.element.find('.fiji-jillpaginate-next').attr('href', nextHref);
		},

		_pagination: function() {
			var self = this, options = self.options;

			var links = self._windowedPageNumbers();

			if (options.totalPages) {
				links.unshift(PREVIOUS_PAGE);
				links.push(NEXT_PAGE);
			}

			return links;
		},

		/*
     * Calculates the visible page number using the inner window and
     * outer window options.
     */
		_windowedPageNumbers: function() {
			var self = this, options = self.options, i;

			var windowFrom = options.currentPage - options.innerWindow;
			var windowTo = options.currentPage + options.innerWindow;

			// adjust lower or upper limit if other is out of bounds
			if (windowTo > options.totalPages) {
				windowFrom = Math.max(0, windowFrom - (windowTo - options.totalPages));
				windowTo = options.totalPages;
			}
			if (windowFrom < 1) {
				windowTo = Math.min(options.totalPages, windowTo + (1 - windowFrom));
				windowFrom = 1;
			}

			// these are always visible
			var middle = []
			for (i = windowFrom; i <= windowTo; i++) {
				middle.push(i);
			}

			// left outer window
			var left = [];
			if (options.outerWindow + 3 < middle[0]) { // there is a gap
				for (i = 1; i <= options.outerWindow + 1; i++) {
					left.push(i);
				}
				left.push(GAP);
			}
			else { // runs into visible pages
				for (i = 1; i < middle[0]; i++) { // TODO: possible bug in will paginate
					left.push(i);
				}
			}

			// right outer window
			var right = [];
			if (options.totalPages - options.outerWindow - 2 > middle[middle.length - 1]) { // gap
				for (i = options.totalPages - options.outerWindow; i <= options.totalPages; i++) {
					right.push(i);
				}
				right.unshift(GAP)
			}
			else {
				for (i = middle[middle.length - 1] + 1; i <= options.totalPages; i++) {
					right.push(i);
				}
			}

			return left.concat(middle).concat(right);
		},

		_relValue: function(page) {
			var self = this;

			switch (page) {
				case self._previousPageNumber():
					return 'prev' + (page == 1 ? ' start' : '');
				case self._nextPageNumber():
					return 'next';
				case 1:
					return 'start';
				default:
					return '';
			}
		},

		_nextPageNumber: function() {
			var self = this, options = self.options;

			return options.currentPage < options.totalPages ? (options.currentPage + 1) : null;
		},

		_previousPageNumber: function() {
			var self = this, options = self.options;

			return options.currentPage > 1 ? (options.currentPage - 1) : null;
		}
	});

	$.extend($.fiji.jillpaginate, {
		version: "@VERSION"
	});

})(jQuery);
