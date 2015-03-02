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
    if (this.successHandler == null) {
        console.warn("success on function with no success handler");
    } else {
        this.finallyCount += 1;
        this.successHandler.apply(this.obj, arguments);
        if (this.finallyCount == this.maxCount && this.finallyHandler != null) {
            clearInterval(this.timeoutThread);
            this.finallyHandler.call(this.obj);
            this.successHandler = null;
            this.failureHandler = null;
        }
    }
};

Future.prototype.execFailure = function () {
    if (this.failureHandler == null) {
        throw new Error("unhandled failure");
    } else {
        this.finallyCount += 1;
        this.failureHandler.apply(this.obj, arguments);
        if (this.finallyCount == this.maxCount && this.finallyHandler != null) {
            clearInterval(this.timeoutThread);
            this.finallyHandler.call(this.obj);
            this.successHandler = null;
            this.failureHandler = null;
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcQmFrYVxcQXBwRGF0YVxcUm9hbWluZ1xcbnBtXFxub2RlX21vZHVsZXNcXGJyb3dzZXJpZnlcXG5vZGVfbW9kdWxlc1xcYnJvd3Nlci1wYWNrXFxfcHJlbHVkZS5qcyIsImxpYlxcZnV0dXJlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKipcclxuICogQ3JlYXRlZCBieSBKdWxpYW4gb24gMy8xLzIwMTUuXHJcbiAqL1xyXG5mdW5jdGlvbiBGdXR1cmUob2JqLCBtYXhDb3VudCwgdGltZW91dCkge1xyXG4gICAgdGhpcy5vYmogPSB0eXBlb2Ygb2JqID09PSBcInVuZGVmaW5lZFwiID8ge30gOiBvYmo7XHJcbiAgICB0aGlzLnN1Y2Nlc3NIYW5kbGVyID0gbnVsbDtcclxuICAgIHRoaXMuZmFpbHVyZUhhbmRsZXIgPSBudWxsO1xyXG4gICAgdGhpcy5maW5hbGx5SGFuZGxlciA9IG51bGw7XHJcbiAgICB0aGlzLmZpbmFsbHlDb3VudCA9IDA7XHJcbiAgICB0aGlzLnRpbWVvdXQgPSAwO1xyXG4gICAgaWYgKHR5cGVvZiBtYXhDb3VudCAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICBpZiAodHlwZW9mIHRpbWVvdXQgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigndGltZW91dCBtdXN0IGJlIGRlZmluZWQhJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudGltZW91dCA9IHRpbWVvdXQ7XHJcbiAgICAgICAgdGhpcy5tYXhDb3VudCA9IG1heENvdW50O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLm1heENvdW50ID0gMTtcclxuICAgIH1cclxuICAgIHRoaXMudGltZW91dFRocmVhZCA9IG51bGw7XHJcbn07XHJcblxyXG5GdXR1cmUucHJvdG90eXBlLmV4ZWNTdWNjZXNzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKHRoaXMuc3VjY2Vzc0hhbmRsZXIgPT0gbnVsbCkge1xyXG4gICAgICAgIGNvbnNvbGUud2FybihcInN1Y2Nlc3Mgb24gZnVuY3Rpb24gd2l0aCBubyBzdWNjZXNzIGhhbmRsZXJcIik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuZmluYWxseUNvdW50ICs9IDE7XHJcbiAgICAgICAgdGhpcy5zdWNjZXNzSGFuZGxlci5hcHBseSh0aGlzLm9iaiwgYXJndW1lbnRzKTtcclxuICAgICAgICBpZiAodGhpcy5maW5hbGx5Q291bnQgPT0gdGhpcy5tYXhDb3VudCAmJiB0aGlzLmZpbmFsbHlIYW5kbGVyICE9IG51bGwpIHtcclxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnRpbWVvdXRUaHJlYWQpO1xyXG4gICAgICAgICAgICB0aGlzLmZpbmFsbHlIYW5kbGVyLmNhbGwodGhpcy5vYmopO1xyXG4gICAgICAgICAgICB0aGlzLnN1Y2Nlc3NIYW5kbGVyID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5mYWlsdXJlSGFuZGxlciA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuRnV0dXJlLnByb3RvdHlwZS5leGVjRmFpbHVyZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICh0aGlzLmZhaWx1cmVIYW5kbGVyID09IG51bGwpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ1bmhhbmRsZWQgZmFpbHVyZVwiKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5maW5hbGx5Q291bnQgKz0gMTtcclxuICAgICAgICB0aGlzLmZhaWx1cmVIYW5kbGVyLmFwcGx5KHRoaXMub2JqLCBhcmd1bWVudHMpO1xyXG4gICAgICAgIGlmICh0aGlzLmZpbmFsbHlDb3VudCA9PSB0aGlzLm1heENvdW50ICYmIHRoaXMuZmluYWxseUhhbmRsZXIgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMudGltZW91dFRocmVhZCk7XHJcbiAgICAgICAgICAgIHRoaXMuZmluYWxseUhhbmRsZXIuY2FsbCh0aGlzLm9iaik7XHJcbiAgICAgICAgICAgIHRoaXMuc3VjY2Vzc0hhbmRsZXIgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLmZhaWx1cmVIYW5kbGVyID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5GdXR1cmUucHJvdG90eXBlLnN1Y2Nlc3MgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcclxuICAgIGlmICh0aGlzLnN1Y2Nlc3NIYW5kbGVyID09IG51bGwpIHtcclxuICAgICAgICB0aGlzLnN1Y2Nlc3NIYW5kbGVyID0gY2FsbGJhY2s7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkxpc3RlbmVyIGlzIGFscmVhZHkgc2V0IVwiKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuRnV0dXJlLnByb3RvdHlwZS5mYWlsdXJlID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XHJcbiAgICBpZiAodGhpcy5mYWlsdXJlSGFuZGxlciA9PSBudWxsKSB7XHJcbiAgICAgICAgdGhpcy5mYWlsdXJlSGFuZGxlciA9IGNhbGxiYWNrO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJMaXN0ZW5lciBpcyBhbHJlYWR5IHNldCFcIik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbkZ1dHVyZS5wcm90b3R5cGUuZmluYWxseSA9IGZ1bmN0aW9uIChhLCBiLCBjKSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICBpZiAodGhpcy5maW5hbGx5SGFuZGxlciAhPSBudWxsKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTGlzdGVuZXIgaXMgYWxyZWFkeSBzZXQhXCIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAoaXNGdW5jdGlvbihhKSkge1xyXG4gICAgICAgICAgICB0aGlzLmZpbmFsbHlIYW5kbGVyID0gYTtcclxuICAgICAgICAgICAgaWYgKHRoaXMudGltZW91dCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGltZW91dFRocmVhZCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZmluYWxseUhhbmRsZXIuY2FsbChzZWxmLm9iaik7XHJcbiAgICAgICAgICAgICAgICB9LCB0aGlzLnRpbWVvdXQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaXNOdW1iZXIoYSkgJiYgYSA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5tYXhDb3VudCA9IGE7XHJcbiAgICAgICAgICAgIGlmIChpc051bWJlcihiKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50aW1lb3V0VGhyZWFkID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5maW5hbGx5SGFuZGxlci5jYWxsKHNlbGYub2JqKTtcclxuICAgICAgICAgICAgICAgIH0sIGIpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidGltZW91dCBwYXJhbWV0ZXIgaXMgbWlzc2luZyFcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGlzRnVuY3Rpb24oYykpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuZmluYWxseUhhbmRsZXIgPSBjO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dFRocmVhZCk7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjYWxsYmFjayBtdXN0IGJlIGEgZnVuY3Rpb24hXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiZmlyc3QgcGFyYW0gbXVzdCBiZSBudW1iZXIgb3IgZnVuY3Rpb24hXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbmZ1bmN0aW9uIGlzTnVtYmVyKG4pIHtcclxuICAgIHJldHVybiAhaXNOYU4ocGFyc2VGbG9hdChuKSkgJiYgaXNGaW5pdGUobik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzRnVuY3Rpb24oZnVuY3Rpb25Ub0NoZWNrKSB7XHJcbiAgICB2YXIgZ2V0VHlwZSA9IHt9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uVG9DaGVjayAmJiBnZXRUeXBlLnRvU3RyaW5nLmNhbGwoZnVuY3Rpb25Ub0NoZWNrKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMuY3JlYXRlID0gZnVuY3Rpb24gKG9iaiwgaSwgdCkge1xyXG4gICAgcmV0dXJuIG5ldyBGdXR1cmUob2JqLCBpLCB0KTtcclxufTsiXX0=
