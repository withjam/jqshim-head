(function() {
"use strict";
    var q = [], shim = {}, qfunc, shjq, shjqDone, ind;
    // only do this if jQuery hasn't been loaded yet
    if (!window.jQuery) {
        qfunc = function(f) {
            q.push(f);
        }
        shim.ready = function(f) {
            qfunc(f);
        }
        shjq = window.jQuery = window.$ = function(arg) {
            if (typeof arg == 'function') {
                qfunc(arg);
            }
            return shim;
        }
        window.checkJQ = function() {
            if (!shjqDone()) {
                ind = setTimeout(checkJQ, 100);
            }
        }
        // we will wait for jQuery to exist
        ind = setTimeout(checkJQ, 100);
        shjqDone = function() {
            // only do this if a jQuery other than our's is now present
            if (window.jQuery !== shjq) {
                clearTimeout(ind);
                var f = q.shift();
                // hurray, jQuery is here now! Send our friends over there
                while(f) {
                   jQuery(f);
                   f = q.shift();
                }
                // we are done, clean up
                ind = shim = qfunc = shjq = shjqDone = window.checkJQ = null;
                return true
            }
            return false
        }
    }
})();
