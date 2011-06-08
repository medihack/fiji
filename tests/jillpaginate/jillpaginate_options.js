/*
 * jillpaginate_options.js
 */
(function($) {

	module("jillpaginate: options");

	test("next and previous configureable", function() {
		expect(2);

		$("#paginate").jillpaginate({
			currentPage: 6,
			totalPages: 11,
			previousLabel: "Foo",
			nextLabel: "Bar"
		});

		equals($('#paginate a:first').html(), "Foo");
		equals($('#paginate a:last').html(), "Bar");
	});

	test("current page", function() {
		expect(2);

		$("#paginate").jillpaginate({
			currentPage: 5,
			totalPages: 11
		});

		equals($("#paginate em").html(), "5", "current page is em");
		equals($("#paginate em").length, 1, "only one current page");
	});

	test("inner window and outer window 0", function() {
		expect(8);

		$("#paginate").jillpaginate({
			currentPage: 6,
			totalPages: 11,
			innerWindow: 0,
			outerWindow: 0
		});

		var nextElements = $('#paginate em').nextAll();
		ok(nextElements.length == 3);
		ok(nextElements.eq(0).is("span"));
		ok(nextElements.eq(1).is("a"));
		ok(nextElements.eq(2).is("a"));

		var prevElements = $('#paginate em').prevAll();
		ok(prevElements.length == 3);
		ok(prevElements.eq(0).is("span"));
		ok(prevElements.eq(1).is("a"));
		ok(prevElements.eq(2).is("a"));
	});

	test("inner window", function() {
		expect(4);

		$("#paginate").jillpaginate({
			currentPage: 6,
			totalPages: 11,
			innerWindow: 1
		});

		var nextElements = $('#paginate em').nextAll();
		ok(nextElements.eq(0).is("a"));
		ok(nextElements.eq(1).is("span"));

		var prevElements = $('#paginate em').prevAll();
		ok(prevElements.eq(0).is("a"));
		ok(prevElements.eq(1).is("span"));
	});

	test("outer window", function() {
		expect(10);

		$("#paginate").jillpaginate({
			currentPage: 6,
			totalPages: 11,
			outerWindow: 1,
			innerWindow: 0
		});

		var nextElements = $('#paginate em').nextAll();
		ok(nextElements.eq(0).is("span"));
		ok(nextElements.eq(1).is("a"));
		ok(nextElements.eq(1).html() == 10);
		ok(nextElements.eq(2).is("a"));
		ok(nextElements.eq(2).html() == 11);

		var prevElements = $('#paginate em').prevAll();
		ok(prevElements.eq(0).is("span"));
		ok(prevElements.eq(1).is("a"));
		ok(prevElements.eq(1).html() == 2);
		ok(prevElements.eq(2).is("a"));
		ok(prevElements.eq(2).html() == 1);
	});

	test("no outer window", function() {
		expect(6);

		$("#paginate").jillpaginate({
			currentPage: 6,
			totalPages: 11,
			outerWindow: -1,
			innerWindow: 0
		});

		var nextElements = $('#paginate em').nextAll();
		ok(nextElements.eq(0).is("span"));
		ok(nextElements.eq(1).is("a"));
		ok(nextElements.eq(1).html().match(/Next/));

		var prevElements = $('#paginate em').prevAll();
		ok(prevElements.eq(0).is("span"));
		ok(prevElements.eq(1).is("a"));
		ok(prevElements.eq(1).html().match(/Previous/));
	});

})(jQuery);
