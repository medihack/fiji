/*
 * ticker_events.js
 */
(function($) {

module("ticker: events");

test("beforeScroll", function() {
	expect(4);
	stop();

	$("#ticker").ticker({
		initialTimeout: 0,
		scrollTime: 0,
		fadeTime: 0,
		next: function(lastItem, nextItem) { nextItem($('<li>TestItem</li>')); },
		beforeScroll: function(event, ui) {
			ok(true, 'before scrolling fires beforeScroll callback');
			equals($("#ticker li").length, 6, "list does have all items");
			equals($("#ticker li:first").text(), "Item1", "Item1 still on first position");
			equals($("#ticker li:last").text(), "Item6", "last item still in the list");
		}
	});
	
	window.setTimeout(function() { start(); }, 100);
});

test("afterScroll", function() {
	expect(5);
	stop();

	$("#ticker").ticker({
		initialTimeout: 0,
		scrollTime: 0,
		fadeTime: 10000,
		next: function(lastItem, nextItem) { nextItem($('<li>TestItem</li>')); },
		afterScroll: function(event, ui) { 
			ok(true, 'after scrolling fires afterScroll callback');
			equals($("#ticker li").length, 6, "list does have all items");
			equals($("#ticker li:first").text(), "TestItem", "TestItem is first list item");
			ok($("#ticker li:first").css("opacity") < 1, "TestItem is not fully visible yet");
			equals($("#ticker li:last").text(), "Item5", "Item5 is last list item");
		}
	});
	
	window.setTimeout(function() { start(); }, 100);
});

test("afterFade", function() {
	expect(5);
	stop();

	$("#ticker").ticker({
		initialTimeout: 0,
		scrollTime: 0,
		fadeTime: 100,
		next: function(lastItem, nextItem) { nextItem($('<li>TestItem</li>')); },
		afterFade: function(event, ui) {
			ok(true, 'after fade fires afterFade callback');
			equals($("#ticker li").length, 6, "list does have all items");
			equals($("#ticker li:first").text(), "TestItem", "TestItem is first list item");
			ok($("#ticker li:first").css("opacity") == 1, "TestItem is fully visible");
			equals($("#ticker li:last").text(), "Item5", "Item5 is last list item");
		}
	});
	
	window.setTimeout(function() { start(); }, 300);
});

test("correct order of next called and events", function() {
	expect(4);
	stop();

	var counter = 0;

	$("#ticker").ticker({
		initialTimeout: 0,
		scrollTime: 50,
		fadeTime: 50,
		next: function(lastItem, nextItem) {
			if (counter == 0) {
				ok(true, "next was called first")
			}
			nextItem($('<li>TestItem</li>'));
		},
		beforeScroll: function(event, ui) {
			if (counter == 0) {
				ok(true, "beforeScroll was called second")
			}
		},
		afterScroll: function(event, ui) {
			if (counter == 0) {
				ok(true, "afterScroll was called third")
			}
		},
		afterFade: function(event, ui) {
			if (counter == 0) {
				ok(true, "afterFade was called fourth")
			}
		}
	});

	window.setTimeout(function() { start(); }, 500);
});

})(jQuery);
