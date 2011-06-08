/*
 * jaminari_methods.js
 */
(function($) {

	module("jaminari: methods");

	test("init", function() {
		$("<nav></nav>").appendTo('body').jaminari().remove();
		ok(true, '.jaminari() called on element');

		$([]).jaminari().remove();
		ok(true, '.jaminari() called on empty collection');

		$('<nav></nav>').jaminari().remove();
		ok(true, '.jaminari() called on disconnected DOMElement - never connected');

		$('<nav></nav>').appendTo('body').remove().jaminari().remove();
		ok(true, '.jaminari() called on disconnected DOMElement - removed');

		var el = $('<nav></nav>').jaminari();
		var foo = el.jaminari("option", "foo");
		el.remove();
		ok(true, 'arbitrary option getter after init');

		$('<nav></nav>').jaminari().jaminari("option", "foo", "bar").remove();
		ok(true, 'arbitrary option setter after init');
	});

	test("destroy", function() {
		var beforeHtml = $("#paginate").find("div").css("font-style", "normal").end().parent().html();
		var afterHtml = $("#paginate").jaminari().jaminari("destroy").parent().html();
		equal( afterHtml, beforeHtml );
	});

	test("page", function() {
		expect(2);

		$("#paginate").jaminari({
			currentPage: 6,
			numPages: 11
		});

		ok($('#paginate span.current').html() == 6);
		$('#paginate').jaminari("page", 7);
		ok($('#paginate span.current').html() == 7);
	});

	test("nextPage", function() {
		expect(2);

		$("#paginate").jaminari({
			currentPage: 6,
			numPages: 11
		});

		ok($('#paginate span.current').html() == 6);
		$('#paginate').jaminari("nextPage");
		ok($('#paginate span.current').html() == 7);
	});

	test("previousPage", function() {
		expect(2);

		$("#paginate").jaminari({
			currentPage: 6,
			numPages: 11
		});

		ok($('#paginate span.current').html() == 6);
		$('#paginate').jaminari("prevPage");
		ok($('#paginate span.current').html() == 5);
	});

	test("firstPage", function() {
		expect(2);

		$("#paginate").jaminari({
			currentPage: 6,
			numPages: 11
		});

		ok($('#paginate span.current').html() == 6);
		$('#paginate').jaminari("firstPage");
		ok($('#paginate span.current').html() == 1);
	});

	test("lastPage", function() {
		expect(2);

		$("#paginate").jaminari({
			currentPage: 6,
			numPages: 11
		});

		ok($('#paginate span.current').html() == 6);
		$('#paginate').jaminari("lastPage");
		ok($('#paginate span.current').html() == 11);
	});

})(jQuery);
