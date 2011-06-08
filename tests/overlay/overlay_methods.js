/*
 * overlay_methods.js
 */
(function($) {

	module("overlay: methods");

	test("openContainer with html", function() {
		expect(2);

		$(window).overlay().overlay("openContainer", '<div class="message">Hello World!</div>');
		ok($("body").has(".fiji-overlay-container").length > 0);
		ok($(".fiji-overlay-container").has(".message").length > 0);
		
		$(window).overlay("destroy");
	});

	test("openContainer with jquery object", function() {
		expect(2);

		$(window).overlay().overlay("openContainer", $('<div class="message">Hello World!</div>'));
		ok($("body").has(".fiji-overlay-container").length > 0);
		ok($(".fiji-overlay-container").has(".message").length > 0);
		
		$(window).overlay("destroy");
	});

	test("closeContainer", function() {
		expect(1);

		$(window).overlay().overlay("openContainer", '<div class="message">Hello World!</div>');
		$(window).overlay("closeContainer");
		ok($("body").has(".fiji-overlay-container").length == 0);
		
		$(window).overlay("destroy");
	});
	
	test("destroy", function() {
		expect(1);
		var beforeHtml = $("body").html();
		$(window).overlay();
		$(window).overlay("destroy");
		var afterHtml = $("body").html();
		equals(afterHtml, beforeHtml);
	});

})(jQuery);
