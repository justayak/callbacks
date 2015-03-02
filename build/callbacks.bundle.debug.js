!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.Future=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Created by Julian on 3/1/2015.
 */
function Future(obj, maxCount) {
    this.obj = typeof obj === "undefined" ? {} : obj;
    this.successHandler = null;
    this.failureHandler = null;
    this.finallyHandler = null;
    this.finallyCount = 0;
    if (typeof maxCount !== 'undefined') {
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

module.exports.create = function (obj) {
    return new Future(obj);
};
},{}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcQmFrYVxcQXBwRGF0YVxcUm9hbWluZ1xcbnBtXFxub2RlX21vZHVsZXNcXGJyb3dzZXJpZnlcXG5vZGVfbW9kdWxlc1xcYnJvd3Nlci1wYWNrXFxfcHJlbHVkZS5qcyIsImxpYlxcZnV0dXJlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgSnVsaWFuIG9uIDMvMS8yMDE1LlxyXG4gKi9cclxuZnVuY3Rpb24gRnV0dXJlKG9iaiwgbWF4Q291bnQpIHtcclxuICAgIHRoaXMub2JqID0gdHlwZW9mIG9iaiA9PT0gXCJ1bmRlZmluZWRcIiA/IHt9IDogb2JqO1xyXG4gICAgdGhpcy5zdWNjZXNzSGFuZGxlciA9IG51bGw7XHJcbiAgICB0aGlzLmZhaWx1cmVIYW5kbGVyID0gbnVsbDtcclxuICAgIHRoaXMuZmluYWxseUhhbmRsZXIgPSBudWxsO1xyXG4gICAgdGhpcy5maW5hbGx5Q291bnQgPSAwO1xyXG4gICAgaWYgKHR5cGVvZiBtYXhDb3VudCAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICB0aGlzLm1heENvdW50ID0gbWF4Q291bnQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMubWF4Q291bnQgPSAxO1xyXG4gICAgfVxyXG4gICAgdGhpcy50aW1lb3V0VGhyZWFkID0gbnVsbDtcclxufTtcclxuXHJcbkZ1dHVyZS5wcm90b3R5cGUuZXhlY1N1Y2Nlc3MgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAodGhpcy5zdWNjZXNzSGFuZGxlciA9PSBudWxsKSB7XHJcbiAgICAgICAgY29uc29sZS53YXJuKFwic3VjY2VzcyBvbiBmdW5jdGlvbiB3aXRoIG5vIHN1Y2Nlc3MgaGFuZGxlclwiKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5maW5hbGx5Q291bnQgKz0gMTtcclxuICAgICAgICB0aGlzLnN1Y2Nlc3NIYW5kbGVyLmFwcGx5KHRoaXMub2JqLCBhcmd1bWVudHMpO1xyXG4gICAgICAgIGlmICh0aGlzLmZpbmFsbHlDb3VudCA9PSB0aGlzLm1heENvdW50ICYmIHRoaXMuZmluYWxseUhhbmRsZXIgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMudGltZW91dFRocmVhZCk7XHJcbiAgICAgICAgICAgIHRoaXMuZmluYWxseUhhbmRsZXIuY2FsbCh0aGlzLm9iaik7XHJcbiAgICAgICAgICAgIHRoaXMuc3VjY2Vzc0hhbmRsZXIgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLmZhaWx1cmVIYW5kbGVyID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5GdXR1cmUucHJvdG90eXBlLmV4ZWNGYWlsdXJlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKHRoaXMuZmFpbHVyZUhhbmRsZXIgPT0gbnVsbCkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcInVuaGFuZGxlZCBmYWlsdXJlXCIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmZpbmFsbHlDb3VudCArPSAxO1xyXG4gICAgICAgIHRoaXMuZmFpbHVyZUhhbmRsZXIuYXBwbHkodGhpcy5vYmosIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgaWYgKHRoaXMuZmluYWxseUNvdW50ID09IHRoaXMubWF4Q291bnQgJiYgdGhpcy5maW5hbGx5SGFuZGxlciAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy50aW1lb3V0VGhyZWFkKTtcclxuICAgICAgICAgICAgdGhpcy5maW5hbGx5SGFuZGxlci5jYWxsKHRoaXMub2JqKTtcclxuICAgICAgICAgICAgdGhpcy5zdWNjZXNzSGFuZGxlciA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuZmFpbHVyZUhhbmRsZXIgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbkZ1dHVyZS5wcm90b3R5cGUuc3VjY2VzcyA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xyXG4gICAgaWYgKHRoaXMuc3VjY2Vzc0hhbmRsZXIgPT0gbnVsbCkge1xyXG4gICAgICAgIHRoaXMuc3VjY2Vzc0hhbmRsZXIgPSBjYWxsYmFjaztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTGlzdGVuZXIgaXMgYWxyZWFkeSBzZXQhXCIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG5GdXR1cmUucHJvdG90eXBlLmZhaWx1cmUgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcclxuICAgIGlmICh0aGlzLmZhaWx1cmVIYW5kbGVyID09IG51bGwpIHtcclxuICAgICAgICB0aGlzLmZhaWx1cmVIYW5kbGVyID0gY2FsbGJhY2s7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkxpc3RlbmVyIGlzIGFscmVhZHkgc2V0IVwiKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuRnV0dXJlLnByb3RvdHlwZS5maW5hbGx5ID0gZnVuY3Rpb24gKGEsIGIsIGMpIHtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIGlmICh0aGlzLmZpbmFsbHlIYW5kbGVyICE9IG51bGwpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJMaXN0ZW5lciBpcyBhbHJlYWR5IHNldCFcIik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKGEpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZmluYWxseUhhbmRsZXIgPSBhO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9IGVsc2UgaWYgKGlzTnVtYmVyKGEpICYmIGEgPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMubWF4Q291bnQgPSBhO1xyXG4gICAgICAgICAgICBpZiAoaXNOdW1iZXIoYikpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGltZW91dFRocmVhZCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZmluYWxseUhhbmRsZXIuY2FsbChzZWxmLm9iaik7XHJcbiAgICAgICAgICAgICAgICB9LCBiKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInRpbWVvdXQgcGFyYW1ldGVyIGlzIG1pc3NpbmchXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChpc0Z1bmN0aW9uKGMpKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmZpbmFsbHlIYW5kbGVyID0gYztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXRUaHJlYWQpO1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY2FsbGJhY2sgbXVzdCBiZSBhIGZ1bmN0aW9uIVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImZpcnN0IHBhcmFtIG11c3QgYmUgbnVtYmVyIG9yIGZ1bmN0aW9uIVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5mdW5jdGlvbiBpc051bWJlcihuKSB7XHJcbiAgICByZXR1cm4gIWlzTmFOKHBhcnNlRmxvYXQobikpICYmIGlzRmluaXRlKG4pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKGZ1bmN0aW9uVG9DaGVjaykge1xyXG4gICAgdmFyIGdldFR5cGUgPSB7fTtcclxuICAgIHJldHVybiBmdW5jdGlvblRvQ2hlY2sgJiYgZ2V0VHlwZS50b1N0cmluZy5jYWxsKGZ1bmN0aW9uVG9DaGVjaykgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzLmNyZWF0ZSA9IGZ1bmN0aW9uIChvYmopIHtcclxuICAgIHJldHVybiBuZXcgRnV0dXJlKG9iaik7XHJcbn07Il19
