/*
 * jillpaginate_events.js
 */
(function($) {

	module("jillpaginate: events");

	test("callback called when clicked on page link", function() {
		expect(1);

		$("#paginate").jillpaginate({
			currentPage: 6,
			totalPages: 11,
			page: function(page) {
				ok(page == 7);
			}
		});

		$('#paginate em').next().click();
	});

	test("page called when clicked on previous", function() {
		expect(1);

		$("#paginate").jillpaginate({
			currentPage: 6,
			totalPages: 11,
			page: function(page) {
				ok(page == 5);
			}
		});

		$('#paginate a:first').click();
	});

	test("page called when clicked on next", function() {
		expect(1);

		$("#paginate").jillpaginate({
			currentPage: 6,
			totalPages: 11,
			page: function(page) {
				ok(page == 7);
			}
		});

		$('#paginate a:last').click();
	});

	test("jillpaginate rerenders with new current page", function() {
		expect(2);

		$("#paginate").jillpaginate({
			currentPage: 6,
			totalPages: 11,
			page: function(page) {
				return true;
			}
		});

		ok($('#paginate em').html() == 6);
		$('#paginate em').next().click();
		ok($('#paginate em').html() == 7);
	});

	test("jillpaginate prevented from rerendering", function() {
		expect(2);

		$("#paginate").jillpaginate({
			currentPage: 6,
			totalPages: 11,
			page: function(page) {
				return false;
			}
		});

		ok($('#paginate em').html() == 6);
		$('#paginate em').next().click();
		ok($('#paginate em').html() == 6);
	});

	test("href called for each page link", function() {
		expect(2);

		$("#paginate").jillpaginate({
			currentPage: 2,
			totalPages: 3,
			href: function(page) {
				ok(true);
				return "";
			}
		});
	});

	test("href page link is set", function() {
		expect(2);

		var i = 0;

		$("#paginate").jillpaginate({
			currentPage: 2,
			totalPages: 3,
			href: function(page) {
				return "foobar" + i++;
			}
		});

		ok($('#paginate em').prev().attr('href') == "foobar0");
		ok($('#paginate em').next().attr('href') == "foobar1");
	});

	test("next and previous get correct page links", function() {
		expect(2);

		var i = 0;

		$("#paginate").jillpaginate({
			currentPage: 2,
			totalPages: 3,
			href: function(page) {
				return "foobar" + i++;
			}
		});

		ok($('#paginate a:first').attr('href') == "foobar0");
		ok($('#paginate a:last').attr('href') == "foobar1");
	});

})(jQuery);
