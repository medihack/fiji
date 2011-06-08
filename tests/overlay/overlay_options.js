/*
 * overlay_options.js
 */
(function($) {

	module("overlay: options");

	test("uses default options", function() {
		expect(9);

		$(window).overlay().overlay("openContainer", "Hello World");

		ok($("body").has(".fiji-overlay").length > 0);
		ok($("body").has(".fiji-overlay-container").length > 0);
		ok($(".fiji-overlay").css("backgroundColor") == "rgb(0, 0, 0)");
		ok($(".fiji-overlay").css("opacity") == 0.5);
		ok($(".fiji-overlay").css("zIndex") == 1000);
		ok($(".fiji-overlay-container").css("zIndex") == 1001);

		var container = $(".fiji-overlay-container");
		top = ($(window).height() / 2) - (container.height() / 2);
		left = ($(window).width() / 2) - (container.width() / 2);
		ok((top - container.offset().top) < 1); // fuzzy test as of unprecise pixel calculations
		ok((left - container.offset().left) < 1);

		$(document).simulate("keydown", {keyCode: $.ui.keyCode.ESCAPE});
		ok($("body").has(".fiji-overlay").length > 0);

		$(window).overlay("destroy");
	});

	test("uses custom options", function() {
		expect(9);

		$(window).overlay({
			overlayClass: "test-overlay",
			containerClass: "test-container",
			backgroundColor: "#CCCCCC",
			opacity: 0.2,
			zIndex: 5000,
			escapeClose: true,
			position: [50, 30]
		}).overlay("openContainer", "Hello World");

		ok($("body").has(".test-overlay").length > 0);
		ok($("body").has(".test-container").length > 0);
		ok($(".test-overlay").css("backgroundColor") == "rgb(204, 204, 204)");
		ok($(".test-overlay").css("opacity") == 0.2);
		ok($(".test-overlay").css("zIndex") == 5000);
		ok($(".test-container").css("zIndex") == 5001);

		var container = $(".test-container");
		ok((container.offset().top - 50) < 1);
		ok((container.offset().left - 30) < 1);

		$(document).simulate("keydown", {keyCode: $.ui.keyCode.ESCAPE});
		ok($("body").has(".test-overlay").length == 0);

		$(window).overlay("destroy");
	});

	test("sets live options", function() {

		$(window).overlay().overlay("openContainer", "Hello World");
		
		$(window).overlay("option", "backgroundColor", "#CCCCCC");
		ok($(".fiji-overlay").css("backgroundColor") == "rgb(204, 204, 204)");

		$(window).overlay("option", "opacity", 0.2);
		ok($(".fiji-overlay").css("opacity") == 0.2);

		$(window).overlay("option", "zIndex", 5000);
		ok($(".fiji-overlay").css("zIndex") == 5000);
		ok($(".fiji-overlay-container").css("zIndex") == 5001);

		$(window).overlay("option", "position", [50, 30]);
		var container = $(".fiji-overlay-container");
		ok((container.offset().top - 50) < 1);
		ok((container.offset().left - 30) < 1);

		$(window).overlay("destroy");
	});

})(jQuery);
