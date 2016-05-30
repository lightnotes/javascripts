/*
 * 	Usage:
 *	// pass a function reference
 *	docReady(fn);
 *
 *	// use an anonymous function
 *	docReady(function() {
 *		// code here
 *	});
 *
 *	// pass a function reference and a context
 *	// the context will be passed to the function as the first argument
 *	docReady(fn, context);
 *
 *	// use an anonymous function with a context
 *	docReady(function(context) {
 *		// code here that can use the context argument that was passed to docReady
 *	}, ctx);
 *
 * 	Supported:
 * 	 - IE6+
 * 	 - FireFox 3.6+
 * 	 - Chrome 14+
 * 	 - Safari 5.1+
 * 	 - Opera 11.6+
 * 	 - Multiple iOS devices
 * 	 - Multiple Android devices
 *
 * 	refer: http://stackoverflow.com/questions/9899372/pure-javascript-equivalent-to-jquerys-ready-how-to-call-a-function-when-the
 */

(function(funcName, baseObj) {
	funcName = funcName || "docReady";
	baseObj = baseObj || window;
	var readyList = [],
		readyFired = false,
		readyEventHandlersInstalled = false;

	function ready() {
		if (!readyFired) {
			readyFired = true;
			//for (var i = 0; i < readyList.length; i++) {
			//	readyList[i].fn.call(window, readyList[i].ctx);
			//}
			//readyList = [];

			readyList.forEach(function(item, index) {
				item.fn.call(window, item.ctx);
				readyList.splice(index, 1);
			});
		}
	}

	function readyStateChange() {
		if (document.readyState === "complete") {
			ready();
		}
	}

	baseObj[funcName] = function(callback, context) {
		if (readyFired) {
			setTimeout(function() {
				callback(context);
			}, 1);
			return;
		} else {
			readyList.push({
				fn: callback,
				ctx: context
			});
		}

		if (document.readyState === "complete") {
			setTimeout(ready, 1);
		} else if (!readyEventHandlersInstalled) {
			if (document.addEventListener) {
				document.addEventListener("DOMContentLoaded", ready, false);
				window.addEventListener("load", ready, false);
			} else {
				document.attachEvent("onreadystatechange", readyStateChange);
				window.attachEvent("onload", ready);
			}
		}
		readyEventHandlersInstalled = true;
	}
})("docReady", window);
