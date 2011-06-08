/*
 * jillpaginate_methods.js
 */
(function($) {

	module("jillpaginate: methods");

	test("init", function() {
		$("<div></div>").appendTo('body').jillpaginate().remove();
		ok(true, '.jillpaginate() called on element');

		$([]).jillpaginate().remove();
		ok(true, '.jillpaginate() called on empty collection');

		$('<div></div>').jillpaginate().remove();
		ok(true, '.jillpaginate() called on disconnected DOMElement - never connected');

		$('<div></div>').appendTo('body').remove().jillpaginate().remove();
		ok(true, '.jillpaginate() called on disconnected DOMElement - removed');

		var el = $('<div></div>').jillpaginate();
		var foo = el.jillpaginate("option", "foo");
		el.remove();
		ok(true, 'arbitrary option getter after init');

		$('<div></div>').jillpaginate().jillpaginate("option", "foo", "bar").remove();
		ok(true, 'arbitrary option setter after init');
	});

	test("destroy", function() {
		var beforeHtml = $("#paginate").find("div").css("font-style", "normal").end().parent().html();
		var afterHtml = $("#paginate").jillpaginate().jillpaginate("destroy").parent().html();
		equal( afterHtml, beforeHtml );
	});

	test("page", function() {
		expect(2);

		$("#paginate").jillpaginate({
			currentPage: 6,
			totalPages: 11
		});

		ok($('#paginate em').html() == 6);
		$('#paginate').jillpaginate("page", 7);
		ok($('#paginate em').html() == 7);
	});

	test("nextPage", function() {
		expect(2);

		$("#paginate").jillpaginate({
			currentPage: 6,
			totalPages: 11
		});

		ok($('#paginate em').html() == 6);
		$('#paginate').jillpaginate("nextPage");
		ok($('#paginate em').html() == 7);
	});

	test("previousPage", function() {
		expect(2);

		$("#paginate").jillpaginate({
			currentPage: 6,
			totalPages: 11
		});

		ok($('#paginate em').html() == 6);
		$('#paginate').jillpaginate("previousPage");
		ok($('#paginate em').html() == 5);
	});

})(jQuery);
