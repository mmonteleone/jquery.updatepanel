jQuery.updatepanel
==================
Kind of like a BMW Taurus  
[http://github.com/mmonteleone/jquery.updatepanel][0]  

What?
-----

A plugin and example of proxying ASP.NET AJAX client-side events that occur around usage of UpdatePanels as native jQuery events via the jQuery Special Events API.  

So, instead of having to do:

    Sys.WebForms.PageRequestManager.getInstance().add_endRequest(function(sender, args) {
        console.log('update panel just finished');
    });
    
You can stay "jQuery-native" with:

    $(document).bind('atlasEndRequest', function(){
        console.log('update panel just finished');
    });
    
And you can even use a shortcut alias:

    $(document).atlasEndRequest(function(){
        console.log('update panel just finished');
    });    
    
It also still passes in the sender and args, if you're interested:

    $(document).bind('atlasEndRequest', function(e, data){
        console.log(data.sender);
        console.log(data.args);
    });
    
### Exposed events:

The following PageRequestManager events are wrapped/exposted as jQuery-native events.

 * [initializeRequest](http://msdn.microsoft.com/en-us/library/bb397460.aspx) as `atlasInitializeRequest`
 * [beginRequest](http://msdn.microsoft.com/en-us/library/bb397432.aspx) as `atlasBeginRequest`
 * [endRequest](http://msdn.microsoft.com/en-us/library/bb383810.aspx) as `atlasEndRequest`
 * [pageLoading](http://msdn.microsoft.com/en-us/library/bb383832.aspx) as `atlasPageLoading`
 * [pageLoaded](http://msdn.microsoft.com/en-us/library/bb397523.aspx) as `atlasPageLoaded`

More information available here:  
[http://michaelmonteleone.net/2010/07/09/proxying-asp.net-ajax-events-with-jquery/](http://michaelmonteleone.net/2010/07/09/proxying-asp.net-ajax-events-with-jquery/)

Requirements, installation, and notes
-------------------------------------

jQuery.updatepanel requires [jquery][3] 1.3.2 or greater and can be installed thusly 

    <script type="text/javascript" src="jquery-1.4.2.min.js"></script>
    <script type="text/javascript" src="jquery.updatepanel.min.js"></script>

jQuery.updatepanel includes a full unit test suite, and has been verified to work against Firefox 3.5, Safari 4, Internet Explorer 6,7,8, Chrome, and Opera 9 and 10.  Please feel free to test its suite against other browsers.

Changelog
---------

* 0.1.0 - Initial Release

License
-------

The MIT License

Copyright (c) 2010 Michael Monteleone, http://michaelmonteleone.net

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[0]: http://github.com/mmonteleone/jquery.updatepanel "jQuery.updatepanel"
[1]: http://michaelmonteleone.net "Michael Monteleone"
[3]: http://jquery.com "jQuery"
[4]: http://github.com/mmonteleone/pavlov "Pavlov"
[6]: http://code.google.com/p/js-test-driver/ "JsTestDriver"