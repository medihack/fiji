/*
 * ticker_methods.js
 */
(function($) {

module("ticker: methods");

test("init", function() {
	$("<div></div>").appendTo('body').ticker().remove();
	ok(true, '.ticker() called on element');

	$([]).ticker().remove();
	ok(true, '.ticker() called on empty collection');

	$('<div></div>').ticker().remove();
	ok(true, '.ticker() called on disconnected DOMElement - never connected');

	$('<div></div>').appendTo('body').remove().ticker().remove();
	ok(true, '.ticker() called on disconnected DOMElement - removed');

	var el = $('<div></div>').ticker();
	var foo = el.ticker("option", "foo");
	el.remove();
	ok(true, 'arbitrary option getter after init');

	$('<div></div>').ticker().ticker("option", "foo", "bar").remove();
	ok(true, 'arbitrary option setter after init');
});

test("destroy", function() {
	var beforeHtml = $("#ticker").find("div").css("font-style", "normal").end().parent().html();
	var afterHtml = $("#ticker").ticker().ticker("destroy").parent().html();
	equal( afterHtml, beforeHtml );
});

test("initial stop", function() {
	expect(0);
	stop();

	$("#ticker").ticker({
		initialTimeout: 100,
		next: function(lastItem, nextItem) {
			ok(false, "ticker should not scroll after it was stopped");
			nextItem(lastItem);
		}
	});	
	$("#ticker").ticker("stop");
	
	setTimeout(function() { start(); }, 200);
});

test("stop after scroll", function() {
	expect(1);
	stop();
	
	var counter = 0;
	
	$("#ticker").ticker({
		initialTimeout: 0,
		mouseOnTimeout: 100,
		mouseOffTimeout: 100,
		scrollTime: 0,
		fadeTime: 0,
		next: function(lastItem, nextItem) {
			if (counter == 0) {
				ok(true, "ticker scrolled one time");
				$("#ticker").ticker("stop");
				counter++;
				nextItem(lastItem);
			}
			else {
				ok(false, "ticker should not scroll after it was stopped");
				nextItem(lastItem);
			}
		}
	});
	
	setTimeout(function() { start(); }, 300);
});

test("start", function() {
	expect(1);
	stop();
	
	var started = false;
	
	$("#ticker").ticker({
		active: false,
		initialTimeout: 0,
		next: function(lastItem, nextItem) {
			if (started) {
				ok(true, "ticker scrolled after it was started");
				$("#ticker").ticker("stop");
			}
			else {
				ok(false, "ticker scrolled without being started");
			}

		}
	});
	window.setTimeout(function() { started = true; $("#ticker").ticker("start"); }, 200);
	window.setTimeout(function() { start(); }, 600);
});

})(jQuery);
