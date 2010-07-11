/**
 * Fake PageRequestManager, ready to be mocked out
 * by various tests
 */
var pageRequestManagerInstance = {
    add_initializeRequest: function(){},
    add_beginRequest: function(){},
    add_endRequest: function(){},
    add_pageLoaded: function(){},
    remove_initializeRequest: function(){},
    remove_beginRequest: function(){},
    remove_endRequest: function(){},
    remove_pageLoaded: function(){}
};
/* fake namespace and singleton wrapper around
 * the fake request manager with same api as
 * ASP.NET Ajax's
 */
window.Sys = {
    WebForms: {
        PageRequestManager: {
            getInstance: function() {
                return pageRequestManagerInstance;
            }
        }
    }
};

// custom assertion which checks whether an item is a function
QUnit.specify.extendAssertions({
    isFunction: function(actual, message) {
        ok($.isFunction(actual), message);
    }
});

QUnit.specify("jQuery.updatepanel", function() {

    var specification = function() {
        // capture local references to current jquery objects
        // since the globals may get out of sync in the async
        // test runner
        var $ = window.$,
            jQuery = window.jQuery;

        /**
         * Generalized.  Mocks a function with a custom mocked handler for the duration
         * of the execution of a context function
         * @param {Object} parent the parent scope of the function being mocked
         * @param {String} functionName the name of the function being mocked
         * @param {Function} mockedFunction replacement function to use as the mocked function
         * @param {Function} context code to execute while function is mocked
         */
        var mock = function(parent, functionName, mockedFunction, context) {
            var nativeFunction = parent[functionName];
            try {
                parent[functionName] = mockedFunction;
                context();
            } finally {
                parent[functionName] = nativeFunction;
            }
        };

        /**
         * Specific mocker, which wraps mocking of the page request manager instance
         * @param {String} functionName the name of the function being mocked
         * @param {Function} mockedFunction replacement function to use as the mocked function
         * @param {Function} context code to execute while function is mocked
         */
        var mockRequestManager = function(functionName, mockedFunction, context) {
            mock(pageRequestManagerInstance, functionName, mockedFunction, context);
        };

        describe("updatepanel events", function(){
            before(function(){
                $(document).unbind('.spec');
            });
            describe("atlasInitializeRequest", function(){
                it("should be triggered on document when handler called", function(){
                    var capturedHandler;
                    mockRequestManager("add_initializeRequest", function(handler){
                        capturedHandler = handler;
                    }, function(){
                        var callCount = 0;
                        // bind a handler to the initializeRequest event
                        $(document).bind('atlasInitializeRequest.spec', function(){
                            callCount++;
                        });
                        // call the handler that the page request manager
                        // would.  we're not testing that *it* works, just that
                        // the plugin's handler does the right thing when called.
                        capturedHandler();
                        capturedHandler();
                        capturedHandler();
                        assert(callCount).equals(3);
                    });
                });
                describe("upon binding", function(){
                    it("should register the callback with manager", function(){
                        mockRequestManager("add_initializeRequest", function(handler) {
                            assert(handler).isFunction();
                        }, function(){
                            $(document).bind('atlasInitializeRequest.spec', function(){});
                        });
                    });
                    it("should only register the callback on the first bind", function(){
                        var callCount = 0;
                        mockRequestManager("add_initializeRequest", function(handler){
                            callCount++;
                        }, function(){
                            // bind 4 times.  should only set up event once
                            $(document).bind('atlasInitializeRequest.spec', function(){});
                            $(document).bind('atlasInitializeRequest.spec', function(){});
                            $(document).bind('atlasInitializeRequest.spec', function(){});
                            $(document).bind('atlasInitializeRequest.spec', function(){});
                        });
                        assert(callCount).equals(1);
                    });
                });
                describe("upon unbinding", function(){
                    it("it should unregister the callback with manager", function(){
                        mockRequestManager("remove_initializeRequest", function(handler) {
                            assert(handler).isFunction();
                        }, function(){
                            var handler = function(){};
                            $(document).bind('atlasInitializeRequest.spec', handler);
                            $(document).unbind('atlasInitializeRequest.spec', handler);
                        });
                    });
                    it("it should not unregister callback if not last call to unbind", function(){
                        var callCount = 0;
                        mockRequestManager("remove_initializeRequest", function(handler) {
                            callCount++;
                        }, function(){
                            var handler = function(){}
                            // bind three times
                            $(document).bind('atlasInitializeRequest.spec', handler);
                            $(document).bind('atlasInitializeRequest.spec', function(){});
                            $(document).bind('atlasInitializeRequest.spec', function(){});
                            // only unbind twice, so shouldn't tear down event yet
                            $(document).unbind('atlasInitializeRequest.spec', handler);
                        });
                        assert(callCount).equals(0);
                    });
                });
            });
            describe("atlasBeginRequest", function(){
                it("should be triggered on document when handler called", function(){
                    var capturedHandler;
                    mockRequestManager("add_beginRequest", function(handler){
                        capturedHandler = handler;
                    }, function(){
                        var callCount = 0;
                        // bind a handler to the beginRequest event
                        $(document).bind('atlasBeginRequest.spec', function(){
                            callCount++;
                        });
                        // call the handler that the page request manager
                        // would.  we're not testing that *it* works, just that
                        // the plugin's handler does the right thing when called.
                        capturedHandler();
                        capturedHandler();
                        capturedHandler();
                        assert(callCount).equals(3);
                    });
                });
                describe("upon binding", function(){
                    it("should register the callback with manager", function(){
                        mockRequestManager("add_beginRequest", function(handler) {
                            assert(handler).isFunction();
                        }, function(){
                            $(document).bind('atlasBeginRequest.spec', function(){});
                        });
                    });
                    it("should only register the callback on the first bind", function(){
                        var callCount = 0;
                        mockRequestManager("add_beginRequest", function(handler){
                            callCount++;
                        }, function(){
                            // bind 4 times.  should only set up event once
                            $(document).bind('atlasBeginRequest.spec', function(){});
                            $(document).bind('atlasBeginRequest.spec', function(){});
                            $(document).bind('atlasBeginRequest.spec', function(){});
                            $(document).bind('atlasBeginRequest.spec', function(){});
                        });
                        assert(callCount).equals(1);
                    });
                });
                describe("upon unbinding", function(){
                    it("it should unregister the callback with manager", function(){
                        mockRequestManager("remove_beginRequest", function(handler) {
                            assert(handler).isFunction();
                        }, function(){
                            var handler = function(){};
                            $(document).bind('atlasBeginRequest.spec', handler);
                            $(document).unbind('atlasBeginRequest.spec', handler);
                        });
                    });
                    it("it should not unregister callback if not last call to unbind", function(){
                        var callCount = 0;
                        mockRequestManager("remove_beginRequest", function(handler) {
                            callCount++;
                        }, function(){
                            var handler = function(){}
                            // bind three times
                            $(document).bind('atlasBeginRequest.spec', handler);
                            $(document).bind('atlasBeginRequest.spec', function(){});
                            $(document).bind('atlasBeginRequest.spec', function(){});
                            // only unbind twice, so shouldn't tear down event yet
                            $(document).unbind('atlasBeginRequest.spec', handler);
                        });
                        assert(callCount).equals(0);
                    });
                });
            });
            describe("atlasEndRequest", function(){
                it("should be triggered on document when handler called", function(){
                    var capturedHandler;
                    mockRequestManager("add_endRequest", function(handler){
                        capturedHandler = handler;
                    }, function(){
                        var callCount = 0;
                        // bind a handler to the endRequest event
                        $(document).bind('atlasEndRequest.spec', function(){
                            callCount++;
                        });
                        // call the handler that the page request manager
                        // would.  we're not testing that *it* works, just that
                        // the plugin's handler does the right thing when called.
                        capturedHandler();
                        capturedHandler();
                        capturedHandler();
                        assert(callCount).equals(3);
                    });
                });
                describe("upon binding", function(){
                    it("should register the callback with manager", function(){
                        mockRequestManager("add_endRequest", function(handler) {
                            assert(handler).isFunction();
                        }, function(){
                            $(document).bind('atlasEndRequest.spec', function(){});
                        });
                    });
                    it("should only register the callback on the first bind", function(){
                        var callCount = 0;
                        mockRequestManager("add_endRequest", function(handler){
                            callCount++;
                        }, function(){
                            // bind 4 times.  should only set up event once
                            $(document).bind('atlasEndRequest.spec', function(){});
                            $(document).bind('atlasEndRequest.spec', function(){});
                            $(document).bind('atlasEndRequest.spec', function(){});
                            $(document).bind('atlasEndRequest.spec', function(){});
                        });
                        assert(callCount).equals(1);
                    });
                });
                describe("upon unbinding", function(){
                    it("it should unregister the callback with manager", function(){
                        mockRequestManager("remove_endRequest", function(handler) {
                            assert(handler).isFunction();
                        }, function(){
                            var handler = function(){};
                            $(document).bind('atlasEndRequest.spec', handler);
                            $(document).unbind('atlasEndRequest.spec', handler);
                        });
                    });
                    it("it should not unregister callback if not last call to unbind", function(){
                        var callCount = 0;
                        mockRequestManager("remove_endRequest", function(handler) {
                            callCount++;
                        }, function(){
                            var handler = function(){}
                            // bind three times
                            $(document).bind('atlasEndRequest.spec', handler);
                            $(document).bind('atlasEndRequest.spec', function(){});
                            $(document).bind('atlasEndRequest.spec', function(){});
                            // only unbind twice, so shouldn't tear down event yet
                            $(document).unbind('atlasEndRequest.spec', handler);
                        });
                        assert(callCount).equals(0);
                    });
                });
            });
            describe("atlasPageLoaded", function(){
                it("should be triggered on document when handler called", function(){
                    var capturedHandler;
                    mockRequestManager("add_pageLoaded", function(handler){
                        capturedHandler = handler;
                    }, function(){
                        var callCount = 0;
                        // bind a handler to the pageLoaded event
                        $(document).bind('atlasPageLoaded.spec', function(){
                            callCount++;
                        });
                        // call the handler that the page request manager
                        // would.  we're not testing that *it* works, just that
                        // the plugin's handler does the right thing when called.
                        capturedHandler();
                        capturedHandler();
                        capturedHandler();
                        assert(callCount).equals(3);
                    });
                });
                describe("upon binding", function(){
                    it("should register the callback with manager", function(){
                        mockRequestManager("add_pageLoaded", function(handler) {
                            assert(handler).isFunction();
                        }, function(){
                            $(document).bind('atlasPageLoaded.spec', function(){});
                        });
                    });
                    it("should only register the callback on the first bind", function(){
                        var callCount = 0;
                        mockRequestManager("add_pageLoaded", function(handler){
                            callCount++;
                        }, function(){
                            // bind 4 times.  should only set up event once
                            $(document).bind('atlasPageLoaded.spec', function(){});
                            $(document).bind('atlasPageLoaded.spec', function(){});
                            $(document).bind('atlasPageLoaded.spec', function(){});
                            $(document).bind('atlasPageLoaded.spec', function(){});
                        });
                        assert(callCount).equals(1);
                    });
                });
                describe("upon unbinding", function(){
                    it("it should unregister the callback with manager", function(){
                        mockRequestManager("remove_pageLoaded", function(handler) {
                            assert(handler).isFunction();
                        }, function(){
                            var handler = function(){};
                            $(document).bind('atlasPageLoaded.spec', handler);
                            $(document).unbind('atlasPageLoaded.spec', handler);
                        });
                    });
                    it("it should not unregister callback if not last call to unbind", function(){
                        var callCount = 0;
                        mockRequestManager("remove_pageLoaded", function(handler) {
                            callCount++;
                        }, function(){
                            var handler = function(){}
                            // bind three times
                            $(document).bind('atlasPageLoaded.spec', handler);
                            $(document).bind('atlasPageLoaded.spec', function(){});
                            $(document).bind('atlasPageLoaded.spec', function(){});
                            // only unbind twice, so shouldn't tear down event yet
                            $(document).unbind('atlasPageLoaded.spec', handler);
                        });
                        assert(callCount).equals(0);
                    });
                });
            });
        });
        describe("jQuery.fn.atlasInitializeRequest", function(){
            describe("when passed a function", function(){
                it("it should bind handler to atlasInitializeRequest event", function(){
                    var doc = $(document),
                        callBack = function(){},
                        capturedCallback,
                        event;
                    mock(doc, 'bind', function(eventName, handler) {
                        event = eventName;
                        capturedCallback = handler;
                    }, function(){
                        doc.atlasInitializeRequest(callBack);
                    });
                    assert(capturedCallback).equals(callBack);
                    assert(event).equals('atlasInitializeRequest');
                });
            });
            describe("when not passed a function", function(){
                it("it should trigger the event", function(){
                    var callCount = 0;
                    $(document).bind('atlasInitializeRequest', function(){
                        callCount++;
                    });
                    $(document).atlasInitializeRequest();
                    assert(callCount).equals(1);
                });
            });
        });
        describe("jQuery.fn.atlasBeginRequest", function(){
            describe("when passed a function", function(){
                it("it should bind handler to atlasBeginRequest event", function(){
                    var doc = $(document),
                        callBack = function(){},
                        capturedCallback,
                        event;
                    mock(doc, 'bind', function(eventName, handler) {
                        event = eventName;
                        capturedCallback = handler;
                    }, function(){
                        doc.atlasBeginRequest(callBack);
                    });
                    assert(capturedCallback).equals(callBack);
                    assert(event).equals('atlasBeginRequest');
                });
            });
            describe("when not passed a function", function(){
                it("it should trigger the event", function(){
                    var callCount = 0;
                    $(document).bind('atlasBeginRequest', function(){
                        callCount++;
                    });
                    $(document).atlasBeginRequest();
                    assert(callCount).equals(1);
                });
            });
        });
        describe("jQuery.fn.atlasEndRequest", function(){
            describe("when passed a function", function(){
                it("it should bind handler to atlasEndRequest event", function(){
                    var doc = $(document),
                        callBack = function(){},
                        capturedCallback,
                        event;
                    mock(doc, 'bind', function(eventName, handler) {
                        event = eventName;
                        capturedCallback = handler;
                    }, function(){
                        doc.atlasEndRequest(callBack);
                    });
                    assert(capturedCallback).equals(callBack);
                    assert(event).equals('atlasEndRequest');
                });
            });
            describe("when not passed a function", function(){
                it("it should trigger the event", function(){
                    var callCount = 0;
                    $(document).bind('atlasEndRequest', function(){
                        callCount++;
                    });
                    $(document).atlasEndRequest();
                    assert(callCount).equals(1);
                });
            });
        });
        describe("jQuery.fn.atlasPageLoaded", function(){
            describe("when passed a function", function(){
                it("it should bind handler to atlasPageLoaded event", function(){
                    var doc = $(document),
                        callBack = function(){},
                        capturedCallback,
                        event;
                    mock(doc, 'bind', function(eventName, handler) {
                        event = eventName;
                        capturedCallback = handler;
                    }, function(){
                        doc.atlasPageLoaded(callBack);
                    });
                    assert(capturedCallback).equals(callBack);
                    assert(event).equals('atlasPageLoaded');
                });
            });
            describe("when not passed a function", function(){
                it("it should trigger the event", function(){
                    var callCount = 0;
                    $(document).bind('atlasPageLoaded', function(){
                        callCount++;
                    });
                    $(document).atlasPageLoaded();
                    assert(callCount).equals(1);
                });
            });
        });
    };


    /**
     * naive replication of $.each since
     * jquery is not defined at this point
     */
    var each = function(items, fn) {
        for(var i=0;i<items.length;i++) {
            var item = items[i];
            fn(item);
        };
    };

    /**
     * run entire test suite against multiple loaded versions
     * of jquery.
     *
     * Assumes they have each been loaded and set to notConflict(true)
     * aliased as jq14, jq13, etc.
     */
    each(["1.3.2","1.4.0","1.4.1","1.4.2"], function(version) {
        describe("in jQ " + version, function(){
            $ = jQuery = window['jq_' + version.replace(/\./g,'_')];
            specification();
        });
    });
});

