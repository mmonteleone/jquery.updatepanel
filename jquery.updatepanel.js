/**
 * jQuery.updatepanel
 * Kind of like a BMW Taurus.  A somewhat useful example
 * of exposing ASP.NET AJAX events as native jQuery events
 *
 * version 0.1.0
 *
 * http://michaelmonteleone.net/projects
 * http://github.com/mmonteleone/jquery.updatepanel
 *
 * Copyright (c) 2010 Michael Monteleone
 * Licensed under terms of the MIT License (README.markdown)
 */
 (function ($) {
     // list of all events this will wrap
     var events = 'initializeRequest beginRequest endRequest pageLoading pageLoaded';
     $.each(events.split(' '), function (i, name) {
         // make a new camel-cased public 'atlas*' name for the event
         var mappedName = 'atlas' + name.substring(0, 1).toUpperCase() + name.substring(1),
             // build a callback for PageRequestManager's event
             handler = function (sender, args) {
                 $(document).trigger(mappedName, { sender: sender, args: args });
             };
        
         // Whenever the atlas* event is first bound or last unbound,
         // set up the callback with the PageRequestManager's version of the event
         $.event.special[mappedName] = {
             setup: function () { requestManage('add_' + name, handler); },
             teardown: function () { requestManage('remove_' + name, handler); }
         };

         // also build a shortcut jquery plugin method for binding or triggering the event
         $.fn[mappedName] = function (fn) {
             return fn ? this.bind(mappedName, fn) : this.trigger(mappedName);
         };
     });

     /**
      * Calls a given event-handling setup method on the PageRequestManager
      * if there currently is one.  Rewrites self to save performance on subsequent
      * calls.
      * @param {String} method The name of the method to call on the PageRequestManager
      * @param {Function} handler callback to pass as arg to the method
      */
     var requestManage = function (method, handler) {
         var prm = 'Sys' in window && 'WebForms' in window.Sys &&
                 'PageRequestManager' in window.Sys.WebForms ?
                 Sys.WebForms.PageRequestManager.getInstance() : null,
            bind = function (method, handler) {
                 if (prm !== null) {
                     prm[method](handler);
                 }
             };
         // go ahead and bind no this first use
         bind(method, handler);
         // rewrite this method so that on subsequent calls,
         // since don't need to rebuild bind and prm variables.
         requestManage = function (method, handler) {
             bind(method, handler);
         };
     };
 })(jQuery);