/*
 * jaminari_core.js
 */

var el;

(function($) {

	module("jaminari: core");

	test("jaminari rerenders with new current page", function() {
		expect(2);

		$("#paginate").jaminari({
			currentPage: 6,
			numPages: 11
		});

		ok($('#paginate span.current').html() == 6);
		$('#paginate span.current').next().find("a").click();
		ok($('#paginate span.current').html() == 7);
	});

	test("windows merge left", function() {
		expect(4);

		$("#paginate").jaminari({
			currentPage: 2,
			numPages: 4,
			window: 1
		});

		var nextElements = $('#paginate span.current').nextAll();
		ok(nextElements.eq(0).is("span.page"));
		ok(nextElements.eq(1).is("span.gap"));

		var prevElements = $('#paginate span.current').prevAll();
		ok(prevElements.eq(0).is("span.page"));
		ok(prevElements.eq(1).is("span.prev"));
	});

	test("windows merge right", function() {
		expect(4);

		$("#paginate").jaminari({
			currentPage: 3,
			numPages: 4,
			window: 1
		});

		var nextElements = $('#paginate span.current').nextAll();
		ok(nextElements.eq(0).is("span.page"));
		ok(nextElements.eq(1).is("span.next"));

		var prevElements = $('#paginate span.current').prevAll();
		ok(prevElements.eq(0).is("span.page"));
		ok(prevElements.eq(1).is("span.gap"));
	});

})(jQuery);
