/*
 * ticker_core.js
 */

var el;

(function($) {

module("ticker: core");

test("next called", function() {
	expect(2);
	stop();

	$("#ticker").ticker({
		initialTimeout: 0,
		scrollTime: 0,
		fadeTime: 0,
		next: function(lastItem) {
			ok(true, "next called");
		}
	});

	window.setTimeout(function() {
		equals($("#ticker li:first").text(), "Item1", "ticker has not scrolled");
		start();
	}, 100);
});

test("last item clone retains data and bindings", function() {
	expect(3);
	stop();

	$("#ticker li:last")
		.data("test", "123")
		.bind("click", function() {});

	$("#ticker").ticker({
		initialTimeout: 0,
		scrollTime: 0,
		fadeTime: 0,
		next: function(lastItem) {
			ok(true, "next called");
			equals(lastItem.data("test"), "123", "last item clone retains data");
			ok(lastItem.data("events") != null, "last item clone retains events");
		}
	});

	window.setTimeout(function() { start(); }, 200);
});

test("next item can be provided by returning it in method next", function() {
	expect(1);
	stop();

	$("#ticker").ticker({
		initialTimeout: 0,
		scrollTime: 0,
		fadeTime: 0,
		next: function(lastItem) {
			return $("<li>Next Item</li>");
		}
	});

	window.setTimeout(function() {
		equals($("#ticker li:first").text(), "Next Item", "ticker has not scrolled");
		start();
	}, 100);
});

test("next item can be provided by calling nextItem method", function() {
	expect(1);
	stop();

	$("#ticker").ticker({
		initialTimeout: 0,
		scrollTime: 0,
		fadeTime: 0,
		next: function(lastItem, nextItem) {
			nextItem($("<li>Next Item</li>"));
		}
	});

	window.setTimeout(function() {
		equals($("#ticker li:first").text(), "Next Item", "ticker has not scrolled");
		start();
	}, 100);
});

test("next not called when not ready for next", function() {
	expect(1);
	stop();

	$("#ticker").ticker({
		initialTimeout: 0,
		scrollTime: 0,
		fadeTime: 0,
		next: function(lastItem, nextItem) {
			ok(true, "next called");
		}
	});

	window.setTimeout(function() {
		start();
	}, 1000);
});

test("next called when ready for next", function() {
	expect(1);
	stop();

	var counter = 0;

	$("#ticker").ticker({
		initialTimeout: 0,
		scrollTime: 0,
		fadeTime: 0,
		next: function(lastItem, nextItem) {
			ok(true, "next is called")
			if (counter == 1) {
				stop();
			}
			counter++;
			nextItem(lastItem);
		}
	});

	window.setTimeout(function() {
		start();
	}, 1000);
});

})(jQuery);
