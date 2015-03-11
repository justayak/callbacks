!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.Future=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Created by Julian on 3/1/2015.
 */
function Future(obj, maxCount, timeout) {
    this.obj = typeof obj === "undefined" ? {} : obj;
    this.successHandler = null;
    this.failureHandler = null;
    this.finallyHandler = null;
    this.finallyCount = 0;
    this.timeout = 0;
    if (typeof maxCount !== 'undefined') {
        if (typeof timeout === 'undefined') {
            throw new Error('timeout must be defined!');
        }
        this.timeout = timeout;
        this.maxCount = maxCount;
    } else {
        this.maxCount = 1;
    }
    this.timeoutThread = null;
};

Future.prototype.execSuccess = function () {
    var self = this;
    var args = arguments;
    if (this.successHandler === null) {
        // delegate a second try
        setTimeout(function () {
            if (self.successHandler === null) {
                console.warn("success on function with no success handler");
            } else {
                execute(self, "successHandler", args);
            }
        }, 1); // NEXT EXECUTION
    } else {
        execute(this, "successHandler", arguments);
    }
};

function execute(future, handlerName, args) {
    future.finallyCount += 1;
    future[handlerName].apply(future.obj, args);
    if (future.finallyCount === future.maxCount && future.finallyHandler !== null) {
        clearInterval(future.timeoutThread);
        future.finallyHandler.call(future.obj);
        future.successHandler = null;
        future.failureHandler = null;
    }
}

Future.prototype.execFailure = function () {
    var self = this;
    var args = arguments;
    if (this.failureHandler == null) {
        // delegate a second try
        setTimeout(function () {
            if (self.failureHandler === null) {
                throw new Error("unhandled failure");
            } else {
                execute(this, "failureHandler", args);
            }
        }, 1);
    } else {
        execute(this, "failureHandler", arguments);
    }
};

Future.prototype.success = function (callback) {
    if (this.successHandler == null) {
        this.successHandler = callback;
    } else {
        throw new Error("Listener is already set!");
    }
    return this;
};

Future.prototype.failure = function (callback) {
    if (this.failureHandler == null) {
        this.failureHandler = callback;
    } else {
        throw new Error("Listener is already set!");
    }
    return this;
};

Future.prototype.finally = function (a, b, c) {
    var self = this;
    if (this.finallyHandler != null) {
        throw new Error("Listener is already set!");
    } else {
        if (isFunction(a)) {
            this.finallyHandler = a;
            if (this.timeout > 0) {
                this.timeoutThread = setTimeout(function () {
                    self.finallyHandler.call(self.obj);
                }, this.timeout);
            }
            return this;
        } else if (isNumber(a) && a > 0) {
            this.maxCount = a;
            if (isNumber(b)) {
                this.timeoutThread = setTimeout(function () {
                    self.finallyHandler.call(self.obj);
                }, b);
            } else {
                throw new Error("timeout parameter is missing!");
            }
            if (isFunction(c)) {
                self.finallyHandler = c;
            } else {
                clearTimeout(this.timeoutThread);
                throw new Error("callback must be a function!");
            }
        } else {
            throw new Error("first param must be number or function!");
        }
    }
};

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function isFunction(functionToCheck) {
    var getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

module.exports.create = function (obj, i, t) {
    return new Future(obj, i, t);
};
},{}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcQmFrYVxcQXBwRGF0YVxcUm9hbWluZ1xcbnBtXFxub2RlX21vZHVsZXNcXGJyb3dzZXJpZnlcXG5vZGVfbW9kdWxlc1xcYnJvd3Nlci1wYWNrXFxfcHJlbHVkZS5qcyIsImxpYlxcZnV0dXJlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKipcclxuICogQ3JlYXRlZCBieSBKdWxpYW4gb24gMy8xLzIwMTUuXHJcbiAqL1xyXG5mdW5jdGlvbiBGdXR1cmUob2JqLCBtYXhDb3VudCwgdGltZW91dCkge1xyXG4gICAgdGhpcy5vYmogPSB0eXBlb2Ygb2JqID09PSBcInVuZGVmaW5lZFwiID8ge30gOiBvYmo7XHJcbiAgICB0aGlzLnN1Y2Nlc3NIYW5kbGVyID0gbnVsbDtcclxuICAgIHRoaXMuZmFpbHVyZUhhbmRsZXIgPSBudWxsO1xyXG4gICAgdGhpcy5maW5hbGx5SGFuZGxlciA9IG51bGw7XHJcbiAgICB0aGlzLmZpbmFsbHlDb3VudCA9IDA7XHJcbiAgICB0aGlzLnRpbWVvdXQgPSAwO1xyXG4gICAgaWYgKHR5cGVvZiBtYXhDb3VudCAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICBpZiAodHlwZW9mIHRpbWVvdXQgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigndGltZW91dCBtdXN0IGJlIGRlZmluZWQhJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudGltZW91dCA9IHRpbWVvdXQ7XHJcbiAgICAgICAgdGhpcy5tYXhDb3VudCA9IG1heENvdW50O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLm1heENvdW50ID0gMTtcclxuICAgIH1cclxuICAgIHRoaXMudGltZW91dFRocmVhZCA9IG51bGw7XHJcbn07XHJcblxyXG5GdXR1cmUucHJvdG90eXBlLmV4ZWNTdWNjZXNzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XHJcbiAgICBpZiAodGhpcy5zdWNjZXNzSGFuZGxlciA9PT0gbnVsbCkge1xyXG4gICAgICAgIC8vIGRlbGVnYXRlIGEgc2Vjb25kIHRyeVxyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoc2VsZi5zdWNjZXNzSGFuZGxlciA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwic3VjY2VzcyBvbiBmdW5jdGlvbiB3aXRoIG5vIHN1Y2Nlc3MgaGFuZGxlclwiKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGV4ZWN1dGUoc2VsZiwgXCJzdWNjZXNzSGFuZGxlclwiLCBhcmdzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIDEpOyAvLyBORVhUIEVYRUNVVElPTlxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBleGVjdXRlKHRoaXMsIFwic3VjY2Vzc0hhbmRsZXJcIiwgYXJndW1lbnRzKTtcclxuICAgIH1cclxufTtcclxuXHJcbmZ1bmN0aW9uIGV4ZWN1dGUoZnV0dXJlLCBoYW5kbGVyTmFtZSwgYXJncykge1xyXG4gICAgZnV0dXJlLmZpbmFsbHlDb3VudCArPSAxO1xyXG4gICAgZnV0dXJlW2hhbmRsZXJOYW1lXS5hcHBseShmdXR1cmUub2JqLCBhcmdzKTtcclxuICAgIGlmIChmdXR1cmUuZmluYWxseUNvdW50ID09PSBmdXR1cmUubWF4Q291bnQgJiYgZnV0dXJlLmZpbmFsbHlIYW5kbGVyICE9PSBudWxsKSB7XHJcbiAgICAgICAgY2xlYXJJbnRlcnZhbChmdXR1cmUudGltZW91dFRocmVhZCk7XHJcbiAgICAgICAgZnV0dXJlLmZpbmFsbHlIYW5kbGVyLmNhbGwoZnV0dXJlLm9iaik7XHJcbiAgICAgICAgZnV0dXJlLnN1Y2Nlc3NIYW5kbGVyID0gbnVsbDtcclxuICAgICAgICBmdXR1cmUuZmFpbHVyZUhhbmRsZXIgPSBudWxsO1xyXG4gICAgfVxyXG59XHJcblxyXG5GdXR1cmUucHJvdG90eXBlLmV4ZWNGYWlsdXJlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XHJcbiAgICBpZiAodGhpcy5mYWlsdXJlSGFuZGxlciA9PSBudWxsKSB7XHJcbiAgICAgICAgLy8gZGVsZWdhdGUgYSBzZWNvbmQgdHJ5XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChzZWxmLmZhaWx1cmVIYW5kbGVyID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ1bmhhbmRsZWQgZmFpbHVyZVwiKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGV4ZWN1dGUodGhpcywgXCJmYWlsdXJlSGFuZGxlclwiLCBhcmdzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIDEpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBleGVjdXRlKHRoaXMsIFwiZmFpbHVyZUhhbmRsZXJcIiwgYXJndW1lbnRzKTtcclxuICAgIH1cclxufTtcclxuXHJcbkZ1dHVyZS5wcm90b3R5cGUuc3VjY2VzcyA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xyXG4gICAgaWYgKHRoaXMuc3VjY2Vzc0hhbmRsZXIgPT0gbnVsbCkge1xyXG4gICAgICAgIHRoaXMuc3VjY2Vzc0hhbmRsZXIgPSBjYWxsYmFjaztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTGlzdGVuZXIgaXMgYWxyZWFkeSBzZXQhXCIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG5GdXR1cmUucHJvdG90eXBlLmZhaWx1cmUgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcclxuICAgIGlmICh0aGlzLmZhaWx1cmVIYW5kbGVyID09IG51bGwpIHtcclxuICAgICAgICB0aGlzLmZhaWx1cmVIYW5kbGVyID0gY2FsbGJhY2s7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkxpc3RlbmVyIGlzIGFscmVhZHkgc2V0IVwiKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuRnV0dXJlLnByb3RvdHlwZS5maW5hbGx5ID0gZnVuY3Rpb24gKGEsIGIsIGMpIHtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIGlmICh0aGlzLmZpbmFsbHlIYW5kbGVyICE9IG51bGwpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJMaXN0ZW5lciBpcyBhbHJlYWR5IHNldCFcIik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKGEpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZmluYWxseUhhbmRsZXIgPSBhO1xyXG4gICAgICAgICAgICBpZiAodGhpcy50aW1lb3V0ID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50aW1lb3V0VGhyZWFkID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5maW5hbGx5SGFuZGxlci5jYWxsKHNlbGYub2JqKTtcclxuICAgICAgICAgICAgICAgIH0sIHRoaXMudGltZW91dCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfSBlbHNlIGlmIChpc051bWJlcihhKSAmJiBhID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLm1heENvdW50ID0gYTtcclxuICAgICAgICAgICAgaWYgKGlzTnVtYmVyKGIpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWVvdXRUaHJlYWQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmZpbmFsbHlIYW5kbGVyLmNhbGwoc2VsZi5vYmopO1xyXG4gICAgICAgICAgICAgICAgfSwgYik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ0aW1lb3V0IHBhcmFtZXRlciBpcyBtaXNzaW5nIVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoaXNGdW5jdGlvbihjKSkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5maW5hbGx5SGFuZGxlciA9IGM7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0VGhyZWFkKTtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImNhbGxiYWNrIG11c3QgYmUgYSBmdW5jdGlvbiFcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJmaXJzdCBwYXJhbSBtdXN0IGJlIG51bWJlciBvciBmdW5jdGlvbiFcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuZnVuY3Rpb24gaXNOdW1iZXIobikge1xyXG4gICAgcmV0dXJuICFpc05hTihwYXJzZUZsb2F0KG4pKSAmJiBpc0Zpbml0ZShuKTtcclxufVxyXG5cclxuZnVuY3Rpb24gaXNGdW5jdGlvbihmdW5jdGlvblRvQ2hlY2spIHtcclxuICAgIHZhciBnZXRUeXBlID0ge307XHJcbiAgICByZXR1cm4gZnVuY3Rpb25Ub0NoZWNrICYmIGdldFR5cGUudG9TdHJpbmcuY2FsbChmdW5jdGlvblRvQ2hlY2spID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cy5jcmVhdGUgPSBmdW5jdGlvbiAob2JqLCBpLCB0KSB7XHJcbiAgICByZXR1cm4gbmV3IEZ1dHVyZShvYmosIGksIHQpO1xyXG59OyJdfQ==
