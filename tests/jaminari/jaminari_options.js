/*
 * jaminari_options.js
 */
(function($) {

	module("jaminari: options");

	test("next, previous, first and last configureable", function() {
		expect(4);

		$("#paginate").jaminari({
			currentPage: 6,
			numPages: 11,
			prev: "Foo",
			next: "Bar",
			first: "Loo",
			last: "Mar"
		});

		equals($('#paginate span.prev a').html(), "Foo");
		equals($('#paginate span.next a').html(), "Bar");
		equals($('#paginate span.first a').html(), "Loo");
		equals($('#paginate span.last a').html(), "Mar");
	});

	test("current page", function() {
		expect(2);

		$("#paginate").jaminari({
			currentPage: 5,
			numPages: 11
		});

		equals($("#paginate span.current").html(), "5");
		equals($("#paginate span.current").length, 1);
	});

	test("inner window and outer window 0", function() {
		expect(8);

		$("#paginate").jaminari({
			currentPage: 6,
			numPages: 11,
			window: 0
			// outerWindow is by default 0
		});

		var nextElements = $('#paginate span.current').nextAll();
		ok(nextElements.length == 3);
		ok(nextElements.eq(0).is("span.gap"));
		ok(nextElements.eq(1).is("span.next"));
		ok(nextElements.eq(2).is("span.last"));

		var prevElements = $('#paginate span.current').prevAll();
		ok(prevElements.length == 3);
		ok(prevElements.eq(0).is("span.gap"));
		ok(prevElements.eq(1).is("span.prev"));
		ok(prevElements.eq(2).is("span.first"));
	});

	test("inner window", function() {
		expect(4);

		$("#paginate").jaminari({
			currentPage: 6,
			numPages: 11,
			window: 1
		});

		var nextElements = $('#paginate span.current').nextAll();
		ok(nextElements.eq(0).is("span.page"));
		ok(nextElements.eq(1).is("span.gap"));

		var prevElements = $('#paginate span.current').prevAll();
		ok(prevElements.eq(0).is("span.page"));
		ok(prevElements.eq(1).is("span.gap"));
	});

	test("outer window", function() {
		expect(8);

		$("#paginate").jaminari({
			currentPage: 6,
			numPages: 11,
			outerWindow: 1,
			window: 0
		});

		var nextElements = $('#paginate span.current').nextAll();
		ok(nextElements.eq(0).is("span.gap"));
		ok(nextElements.eq(1).is("span.page"));
		ok(nextElements.eq(1).find("a").html() == 11);
		ok(nextElements.eq(2).is("span.next"));

		var prevElements = $('#paginate span.current').prevAll();
		ok(prevElements.eq(0).is("span.gap"));
		ok(prevElements.eq(1).is("span.page"));
		ok(prevElements.eq(1).find("a").html() == 1);
		ok(prevElements.eq(2).is("span.prev"));
	});

	test("left", function() {
		expect(6);

		$("#paginate").jaminari({
			currentPage: 6,
			numPages: 11,
			window: 0,
			left: 1
		});

		var nextElements = $('#paginate span.current').nextAll();
		ok(nextElements.eq(0).is("span.gap"));
		ok(nextElements.eq(1).is("span.next"));

		var prevElements = $('#paginate span.current').prevAll();
		ok(prevElements.eq(0).is("span.gap"));
		ok(prevElements.eq(1).is("span.page"));
		ok(prevElements.eq(1).find("a").html() == 1);
		ok(prevElements.eq(2).is("span.prev"));
	});

	test("right", function() {
		expect(6);

		$("#paginate").jaminari({
			currentPage: 6,
			numPages: 11,
			window: 0,
			right: 1
		});

		var prevElements = $('#paginate span.current').nextAll();
		ok(prevElements.eq(0).is("span.gap"));
		ok(prevElements.eq(1).is("span.page"));
		ok(prevElements.eq(1).find("a").html() == 11);
		ok(prevElements.eq(2).is("span.next"));

		var nextElements = $('#paginate span.current').prevAll();
		ok(nextElements.eq(0).is("span.gap"));
		ok(nextElements.eq(1).is("span.prev"));
	});

})(jQuery);
