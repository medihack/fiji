/*
 * overlay_core.js
 */
(function($) {

	module("overlay: core");

	test("window gets fixed overlay", function() {
		expect(4);

		$(window).overlay();
		ok($("body").has(".fiji-overlay").length > 0);
		ok($(".fiji-overlay").css("position") == "fixed");
		ok($(".fiji-overlay").height() == $(window).height());
		ok($(".fiji-overlay").width() == $(window).width());

		$(window).overlay("destroy");
	});

	test("document gets absolute overlay", function() {
		expect(4);

		$(document).overlay();
		ok($("body").has(".fiji-overlay").length > 0);
		ok($(".fiji-overlay").css("position") == "absolute");
		ok($(".fiji-overlay").height() == $(document).height());
		ok($(".fiji-overlay").width() == $(document).width());

		$(document).overlay("destroy");
	});

})(jQuery);
