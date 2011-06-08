/*
 * jaminari_events.js
 */
(function($) {

	module("jaminari: events");

	test("callback called when clicked on page link", function() {
		expect(1);

		$("#paginate").jaminari({
			currentPage: 6,
			numPages: 11,
			page: function(page) {
				ok(page == 7);
			}
		});

		$('#paginate span.current').next().find("a").click();
	});

	test("page called when clicked on previous", function() {
		expect(1);

		$("#paginate").jaminari({
			currentPage: 6,
			numPages: 11,
			page: function(page) {
				ok(page == 5);
			}
		});

		$('#paginate span.prev a').click();
	});

	test("page called when clicked on next", function() {
		expect(1);

		$("#paginate").jaminari({
			currentPage: 6,
			numPages: 11,
			page: function(page) {
				ok(page == 7);
			}
		});

		$('#paginate span.next a').click();
	});

	test("page called when clicked on first", function() {
		expect(1);

		$("#paginate").jaminari({
			currentPage: 6,
			numPages: 11,
			page: function(page) {
				ok(page == 1);
			}
		});

		$('#paginate span.first a').click();
	});

	test("page called when clicked on last", function() {
		expect(1);

		$("#paginate").jaminari({
			currentPage: 6,
			numPages: 11,
			page: function(page) {
				ok(page == 11);
			}
		});

		$('#paginate span.last a').click();
	});

	test("jaminari rerenders with new current page", function() {
		expect(2);

		$("#paginate").jaminari({
			currentPage: 6,
			numPages: 11,
			page: function(page) {
				return true;
			}
		});

		ok($('#paginate span.current').html() == 6);
		$('#paginate span.current').next().find("a").click();
		ok($('#paginate span.current').html() == 7);
	});

	test("jaminari prevented from rerendering", function() {
		expect(2);

		$("#paginate").jaminari({
			currentPage: 6,
			numPages: 11,
			page: function(page) {
				return false;
			}
		});

		ok($('#paginate span.current').html() == 6);
		$('#paginate span.current').next().find("a").click();
		ok($('#paginate span.current').html() == 6);
	});

})(jQuery);
