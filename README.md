jqshim-head
===========

A simple shim for jQuery designed to load in the head while allowing you to easily move the real scripts to the bottom of the body.  Useful for WordPress and other open CMS platforms where plugins often sprinkle jQuery ready calls through the body content.

What It Does
------------

It does two simple things really.  It defines both window.jQuery and window.$ so that implementors can continue to reference $( <func> ) or $(document).ready( <func> ) or the same with jQuery() spelled out directly.  Any calls to jQuery() return an object with a single 'ready' property.  If a function is passed into the jQuery() call it will queue that function and return the shim object.

Next, it sets up a timer to check for the existence of the real jQuery object in the document.  Once found, it invokes the true jQuery( <func> ) with each function it has queued - which allows them to proceed along the normal isDOMReady process flow provided by jQuery.

How To Use It
-------------

 1. Include jqShim.min.js directly in your HEAD tag or, *even better*, **inline** it so that there is no download.  This should be easy to do in your template files.  
 * Use jQuery( <func> ) or jQuery(document).ready( <func> ) as normal throughout the body
 * Move your jQuery.min.js script src to the bottom of the BODY to speed up the loading of your page.

Special Notes
-----------------

 1. Make sure you include your jQuery plugins *after* your jQuery source file.  jqShim does not provide any functionality outside of queuing functions to be invoked on DOM Ready!
 * Do NOT put the jqShim in the bottom of your body.  If you can do that successfully then you don't need the shim! Just use jQuery as normal.
 * It does not attempt to replace either the jQuery or window.$ properties.  jqShim expects that jQuery will do this on it's own, otherwise you wouldn't be concerned with those global properties to begin with.
