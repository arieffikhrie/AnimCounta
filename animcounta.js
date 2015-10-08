;(function($, window, document, undefined) {
	"use strict";
	var id = 42137;

	var pluginName = "animcounta",
		defaults = {
			count: 100,
			duration: 1500,
			easing: 'swing'
		};

	function Plugin(element, options) {
		this.pluginID = id++;
		this.element = element;
		this.settings = $.extend({}, defaults, options);
		this._defaults = defaults;
		this._name = pluginName;
		this.init();
	}

	function isScrolledIntoView(elem) {
		var win = $(window);
		var docViewTop = win.scrollTop();
		var docViewBottom = docViewTop + win.height();
		var elemTop = elem.offset().top;
		var elemBottom = elemTop + elem.height();
		return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
	}

	$.extend(Plugin.prototype, {
		init: function() {
			var elem = $(this.element),
				win = $(window),
				settings = this.settings,
				pluginID = this.pluginID,
				animateCounter = function() {
					$(window).off('scroll.' + pluginID);
					$({
						counter: parseInt(elem.text(), 10)
					}).animate({
						counter: settings.count
					}, {
						duration: settings.duration,
						easing: settings.easing,
						step: function() {
							elem.text(Math.ceil(this.counter));
						}
					});
				};
			if (isScrolledIntoView(elem)) {
				animateCounter();
			} else {
				win.on('scroll.' + pluginID, function() {
					console.log('run event');
					if (isScrolledIntoView(elem)) {
						animateCounter();
					}
				});
			}
		}
	});

	$.fn[pluginName] = function(options) {
		return this.each(function() {
			if (!$.data(this, "plugin_" + pluginName)) {
				$.data(this, "plugin_" + pluginName, new Plugin(this, options));
			}
		});
	};

})(jQuery, window, document);
$(document).ready(function() {
	$('[data-counter-animate="true"]').each( function(){
		var elem = $(this),
			option = {},
			count = elem.data('counter-animate-count'),
			duration = elem.data('counter-animate-duration'),
			easing = elem.data('counter-animate-easing');

		if( count !== undefined && count !== '' ){
			option['count'] = parseInt(count, 10);
		}
		if( duration !== undefined && duration !== '' ){
			option['duration'] = parseInt(duration, 10);
		}
		if( easing !== undefined && easing !== '' ){
			option['easing'] = easing;
		}
		elem.animcounta(option);
	});
});
