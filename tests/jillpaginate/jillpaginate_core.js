/*
 * jillpaginate_core.js
 */

var el;

(function($) {

	module("jillpaginate: core");

	test("jillpaginate rerenders with new current page", function() {
		expect(2);

		$("#paginate").jillpaginate({
			currentPage: 6,
			totalPages: 11
		});

		ok($('#paginate em').html() == 6);
		$('#paginate em').next().click();
		ok($('#paginate em').html() == 7);
	});

	test("windows merge left", function() {
		expect(4);

		$("#paginate").jillpaginate({
			currentPage: 5,
			totalPages: 10,
			innerWindow: 1
		});

		var nextElements = $('#paginate em').nextAll();
		ok(nextElements.eq(0).is("a"));
		ok(nextElements.eq(1).is("span"));

		var prevElements = $('#paginate em').prevAll();
		ok(prevElements.eq(0).is("a"));
		ok(prevElements.eq(1).is("a"));
	});

	test("windows merge right", function() {
		expect(4);

		$("#paginate").jillpaginate({
			currentPage: 6,
			totalPages: 10,
			innerWindow: 1
		});

		var nextElements = $('#paginate em').nextAll();
		ok(nextElements.eq(0).is("a"));
		ok(nextElements.eq(1).is("a"));

		var prevElements = $('#paginate em').prevAll();
		ok(prevElements.eq(0).is("a"));
		ok(prevElements.eq(1).is("span"));
	});

})(jQuery);
