!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.Future=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Created by Julian on 3/1/2015.
 */
function Future(obj) {
    this.obj = typeof obj === "undefined" ? {} : obj;
    this.successHandler = null;
    this.failureHandler = null;
    this.finallyHandler = null;
    this.finallyCount = 0;
    this.maxCount = 1;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcQmFrYVxcQXBwRGF0YVxcUm9hbWluZ1xcbnBtXFxub2RlX21vZHVsZXNcXGJyb3dzZXJpZnlcXG5vZGVfbW9kdWxlc1xcYnJvd3Nlci1wYWNrXFxfcHJlbHVkZS5qcyIsImxpYlxcZnV0dXJlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEp1bGlhbiBvbiAzLzEvMjAxNS5cclxuICovXHJcbmZ1bmN0aW9uIEZ1dHVyZShvYmopIHtcclxuICAgIHRoaXMub2JqID0gdHlwZW9mIG9iaiA9PT0gXCJ1bmRlZmluZWRcIiA/IHt9IDogb2JqO1xyXG4gICAgdGhpcy5zdWNjZXNzSGFuZGxlciA9IG51bGw7XHJcbiAgICB0aGlzLmZhaWx1cmVIYW5kbGVyID0gbnVsbDtcclxuICAgIHRoaXMuZmluYWxseUhhbmRsZXIgPSBudWxsO1xyXG4gICAgdGhpcy5maW5hbGx5Q291bnQgPSAwO1xyXG4gICAgdGhpcy5tYXhDb3VudCA9IDE7XHJcbiAgICB0aGlzLnRpbWVvdXRUaHJlYWQgPSBudWxsO1xyXG59O1xyXG5cclxuRnV0dXJlLnByb3RvdHlwZS5leGVjU3VjY2VzcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICh0aGlzLnN1Y2Nlc3NIYW5kbGVyID09IG51bGwpIHtcclxuICAgICAgICBjb25zb2xlLndhcm4oXCJzdWNjZXNzIG9uIGZ1bmN0aW9uIHdpdGggbm8gc3VjY2VzcyBoYW5kbGVyXCIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmZpbmFsbHlDb3VudCArPSAxO1xyXG4gICAgICAgIHRoaXMuc3VjY2Vzc0hhbmRsZXIuYXBwbHkodGhpcy5vYmosIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgaWYgKHRoaXMuZmluYWxseUNvdW50ID09IHRoaXMubWF4Q291bnQgJiYgdGhpcy5maW5hbGx5SGFuZGxlciAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy50aW1lb3V0VGhyZWFkKTtcclxuICAgICAgICAgICAgdGhpcy5maW5hbGx5SGFuZGxlci5jYWxsKHRoaXMub2JqKTtcclxuICAgICAgICAgICAgdGhpcy5zdWNjZXNzSGFuZGxlciA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuZmFpbHVyZUhhbmRsZXIgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbkZ1dHVyZS5wcm90b3R5cGUuZXhlY0ZhaWx1cmUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAodGhpcy5mYWlsdXJlSGFuZGxlciA9PSBudWxsKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidW5oYW5kbGVkIGZhaWx1cmVcIik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuZmluYWxseUNvdW50ICs9IDE7XHJcbiAgICAgICAgdGhpcy5mYWlsdXJlSGFuZGxlci5hcHBseSh0aGlzLm9iaiwgYXJndW1lbnRzKTtcclxuICAgICAgICBpZiAodGhpcy5maW5hbGx5Q291bnQgPT0gdGhpcy5tYXhDb3VudCAmJiB0aGlzLmZpbmFsbHlIYW5kbGVyICE9IG51bGwpIHtcclxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnRpbWVvdXRUaHJlYWQpO1xyXG4gICAgICAgICAgICB0aGlzLmZpbmFsbHlIYW5kbGVyLmNhbGwodGhpcy5vYmopO1xyXG4gICAgICAgICAgICB0aGlzLnN1Y2Nlc3NIYW5kbGVyID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5mYWlsdXJlSGFuZGxlciA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuRnV0dXJlLnByb3RvdHlwZS5zdWNjZXNzID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XHJcbiAgICBpZiAodGhpcy5zdWNjZXNzSGFuZGxlciA9PSBudWxsKSB7XHJcbiAgICAgICAgdGhpcy5zdWNjZXNzSGFuZGxlciA9IGNhbGxiYWNrO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJMaXN0ZW5lciBpcyBhbHJlYWR5IHNldCFcIik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbkZ1dHVyZS5wcm90b3R5cGUuZmFpbHVyZSA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xyXG4gICAgaWYgKHRoaXMuZmFpbHVyZUhhbmRsZXIgPT0gbnVsbCkge1xyXG4gICAgICAgIHRoaXMuZmFpbHVyZUhhbmRsZXIgPSBjYWxsYmFjaztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTGlzdGVuZXIgaXMgYWxyZWFkeSBzZXQhXCIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG5GdXR1cmUucHJvdG90eXBlLmZpbmFsbHkgPSBmdW5jdGlvbiAoYSwgYiwgYykge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgaWYgKHRoaXMuZmluYWxseUhhbmRsZXIgIT0gbnVsbCkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkxpc3RlbmVyIGlzIGFscmVhZHkgc2V0IVwiKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKGlzRnVuY3Rpb24oYSkpIHtcclxuICAgICAgICAgICAgdGhpcy5maW5hbGx5SGFuZGxlciA9IGE7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaXNOdW1iZXIoYSkgJiYgYSA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5tYXhDb3VudCA9IGE7XHJcbiAgICAgICAgICAgIGlmIChpc051bWJlcihiKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50aW1lb3V0VGhyZWFkID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5maW5hbGx5SGFuZGxlci5jYWxsKHNlbGYub2JqKTtcclxuICAgICAgICAgICAgICAgIH0sIGIpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidGltZW91dCBwYXJhbWV0ZXIgaXMgbWlzc2luZyFcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGlzRnVuY3Rpb24oYykpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuZmluYWxseUhhbmRsZXIgPSBjO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dFRocmVhZCk7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjYWxsYmFjayBtdXN0IGJlIGEgZnVuY3Rpb24hXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiZmlyc3QgcGFyYW0gbXVzdCBiZSBudW1iZXIgb3IgZnVuY3Rpb24hXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbmZ1bmN0aW9uIGlzTnVtYmVyKG4pIHtcclxuICAgIHJldHVybiAhaXNOYU4ocGFyc2VGbG9hdChuKSkgJiYgaXNGaW5pdGUobik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzRnVuY3Rpb24oZnVuY3Rpb25Ub0NoZWNrKSB7XHJcbiAgICB2YXIgZ2V0VHlwZSA9IHt9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uVG9DaGVjayAmJiBnZXRUeXBlLnRvU3RyaW5nLmNhbGwoZnVuY3Rpb25Ub0NoZWNrKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMuY3JlYXRlID0gZnVuY3Rpb24gKG9iaikge1xyXG4gICAgcmV0dXJuIG5ldyBGdXR1cmUob2JqKTtcclxufTsiXX0=
