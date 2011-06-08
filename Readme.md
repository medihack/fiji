# jQuery Fiji

## About

The jQuery Fiji project is a repository for widgets built upon the jQuery UI widget library. All widgets were created for our own projects needs in mind, but should be universal applicable. The widgets are fully Unit tested (with qUnit) and easily configurable.

Currently jQuery Fiji contains the following widgets:

* jQuery Fiji Ticker - a Twitter like ticker widget
* jQuery Fiji Overlay - an overlay that can present an optional dialog container
* jQuery Fiji JillPaginate - a pagination widget that is based on the WillPaginate Rails extension
* jQuery Fiji Jaminari - an alternative pagination widget that is based on the Kaminari Rails extension

## Widgets

### jQuery Fiji Ticker

A Twitter (when not logged in on the start page) like Ticker.
Well configurable and fully Unit tested.

[Ticker Demo](http://medihack.github.com/jquery-fiji/demos/ticker/ticker.html)

The ticker must be a attached to an existing ul element:

	<ul id="#ticker">
		<li>Ticker Item 1</li>
		<li>Ticker Item 2</li>
		<li>Ticker Item 3</li>
	</ul>

To start the ticker that just rotates the already included li elements:

    $("#ticker").ticker();

There are several options for configuring the ticker:

    $("#ticker").ticker({
      active: true, // true if the ticker is active (scrolls), false otherwise (default true)
      initialTimeout: 2000,  // the initial timeout (in ms) to start the ticker after the site was loaded (default 4000)
      mouseOnTimeout: 6000,  // the timeout before the next item shows up when the mouse pointer is over the ticker (default 8000)
      mouseOffTimeout: 4000, // the timeout before the next item shows up when the mouse pointer is somewhere else (default 4000)
      scrollTime: 1200,  // the times it takes to scroll down the item list (default 800)
      fadeTime: 1000, // the time it takes to fade in the next item at the top of the item list (default 1000)
      fixContainer: true, // fixes the div by its initial height and sets its overflow to hidden (for sliding out effect) (default false)
      next: function(lastItem, nextItem) {  // this function provides a clone of the last item on the list that will be removed next
		return $("<li>next item</li>"); // the next item for the ticker can be returned
        // or
        nextItem($("<li>next item</li>")); // or be provided to the nextItem function (useful for asynchronous Ajax requests)
      }  // the next item must be wrapped in a <li> tag
    });

If the nextItem function was not called before the next scroll would take place then the next scroll event is passed.
In other words, the ticker will stop until the next callback returns the next item or the provided nextItem function was called.

There are also several events fired:<br>
beforeScroll // directly before the ticker scrolls<br>
afterScroll // directly after the ticker scrolled<br>
afterFade // directly after the new item was faded in<br>

To bind to an event (the common jQuery UI way):

    $("#ticker").ticker({
      nextItem: function(lastItem, nextItem) { nextItem($('<li>TestItem</li>')); },
      beforeScroll: function(event, ui) { // just do what you like to do }
    });

There are also two methods to use:<br>
stop // stop the ticker immediately (respectively after the scrolling/fading is finished)<br>
start // start the ticker again<br>

To call those methods (the common jQuery UI way):

    $("#ticker").ticker("stop");

### JQuery Fiji Overlay

A modal overlay that prevents any user interactions on the below layers.
In contrast to the many other available overlay solutions it does not
make many presumptions about how you would use it. The creation of the
overlay is even separated from the creation of a dialog on top of it.
Another strength is its retention of the natural tab order.

[Overlay Demo](http://medihack.github.com/jquery-fiji/demos/overlay/overlay.html)

To create a window overlay:

	$(window).overlay();

and to remove it again:

	$(window).overlay("destroy");

To add a container (on an existing overlay):

	$(window).overlay("openContainer", "Hello World!");

and to close it again (overlay stays open):

	$(window).overlay("closeContainer");

A window overlay (`$(window).overlay()`) is automatically position
fixed, while a document overlay (`$(document).overlay()`) is position absolute.

There are several configuration options (with below defaults):

	$(window).overlay({
		overlayClass: "fiji-overlay", // the class of the overlay
		containerClass: "fiji-overlay-container", // the class of an added container
		backgroundColor: "#000000", // the background color of the overlay
		opacity: 0.5, // the opacity of the overlay
		zIndex: 1000, // the zIndex of the overlay
		escapeClose: false, // close the overlay on pressing escape key
		position: null // the position of the container as array of top and left (e.g. [100, 300])
					   // will be centered if null
	});

Options can also be set by using `$(window).overlay("option",
"position", [500, 500])` and are mostly updated live.

### jQuery Fiji JillPaginate

A pagination widget that behaves like the [will_paginate](https://github.com/mislav/will_paginate/tree/rails3) (Rails 3 branch) extension.

[JillPaginate Demo](http://medihack.github.com/jquery-fiji/demos/jillpaginate/jillpaginate.html)

JillPaginate can be used on any empty div:

	<div id="#paginate"></div>

Add a simple pagination with 10 pages where the current page is 3:

	$("#paginate").jillpaginate({
		totalPages: 10,
		currentPage: 3
	});

Several configuration options:

	$("#paginate").jillpaginate({
		currentPage: 3, // the current page (required to set by user!)
		totalPages: 10, // the total page count (required to set by user!)
		clazz: "pagination", // a class that is automatically added to the widget (default: pagination)
		innerWindow: 3, // the size of the inner window (default: 4)
		outerWindow: 2, // the size of the outer window (default: 1)
		previousLabel: "<-", // the previous label (default: &#8592; Previous)
		nextLabel: "->", // the next label (default: Next &#8594)
		willPaginateClasses: false, // add the same classes as will_paginate to the widget (default: true)
		followLink: false, // follow the href link when a page was clicked (default: false)
		page: function(page) {
			// do something when a page was clicked 
			// the page variable contains the page that was clicked
			// return true allow the clicked page to become the new current page
			return true; // <- default
		},
		href: function(page) {
			// allows to set custom hrefs for each page link
			return "javascript:void(0);" // <- default
		}
	})

For more information about those options also see the [will_paginate options](https://github.com/mislav/will_paginate/blob/rails3/lib/will_paginate/view_helpers.rb).

### jQuery Fiji Jaminari

Another pagination widget that behaves like the [Kaminari](https://github.com/amatsuda/kaminari) Rails extension.

[Jaminari Demo](http://medihack.github.com/jquery-fiji/demos/jaminari/jaminari.html)

Jaminari can be used on an empty element, like this (could also be a
normal div):

	<nav id="#paginate"></nav>

Add a simple pagination with 10 pages where the current page is 3:

	$("#paginate").jaminari({
		currentPage: 3,
		numPages: 10
	});

There are several configuration options:

	$("#paginate").jaminari({
		currentPage: 3, // the current page (required to set by user!)
		numPages: 10, // the total page count (required to set by user!)
		clazz: "pagination", // a class that is automatically added to the widget (default: pagination)
		window: 3, // the size of the inner window (default: 4)
		outerWindow: 2, // the size of the outer window (default: 0)
		left: 3, // an explicit left outer window that overwrites outerWindow (default: 0)
		right: 2, // an explicit right outer window that overwrites outerWindow (default: 0)
		first: '&laquo; First', // label for the first link
		prev: '&lsaquo; Prev', // label for previous link
		next: 'Next &rsaquo;', // label for next link
		last: 'Last &raquo;', // label for last link
		truncate: '...', // label for gap
		kaminariClasses: true, // use CSS classes of Kaminari
		page: function(page) {
			// do something when a page was clicked 
			// the page variable contains the page number that was clicked
			// returning true allows the clicked page to become the new current page
			// false will cancel the switch to the new page
			return true; // (return true is default)
		}
	})

## License

Dual licensed under the MIT and GPL licenses:
http://www.opensource.org/licenses/mit-license.php
http://www.gnu.org/licenses/gpl.html

Copyright(c) 2011 Kai Schlamp
