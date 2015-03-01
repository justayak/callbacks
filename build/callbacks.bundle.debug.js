!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.Future=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Created by Julian on 3/1/2015.
 */
function Future(obj) {
    this.obj = typeof obj === "undefined" ? {} : obj;
    this.successHandler = null;
    this.failureHandler = null;
};

Future.prototype.execSuccess = function () {
    if (this.successHandler == null) {
        console.warn("success on function with no success handler");
    } else {
        this.successHandler.apply(this.obj, arguments)
    }
};

Future.prototype.execFailure = function () {
    if (this.failureHandler == null) {
        throw new Error("unhandled failure");
    } else {
        this.failureHandler.apply(this.obj, arguments)
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


module.exports.create = function (obj) {
    return new Future(obj);
};
},{}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcQmFrYVxcQXBwRGF0YVxcUm9hbWluZ1xcbnBtXFxub2RlX21vZHVsZXNcXGJyb3dzZXJpZnlcXG5vZGVfbW9kdWxlc1xcYnJvd3Nlci1wYWNrXFxfcHJlbHVkZS5qcyIsImxpYlxcZnV0dXJlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKipcclxuICogQ3JlYXRlZCBieSBKdWxpYW4gb24gMy8xLzIwMTUuXHJcbiAqL1xyXG5mdW5jdGlvbiBGdXR1cmUob2JqKSB7XHJcbiAgICB0aGlzLm9iaiA9IHR5cGVvZiBvYmogPT09IFwidW5kZWZpbmVkXCIgPyB7fSA6IG9iajtcclxuICAgIHRoaXMuc3VjY2Vzc0hhbmRsZXIgPSBudWxsO1xyXG4gICAgdGhpcy5mYWlsdXJlSGFuZGxlciA9IG51bGw7XHJcbn07XHJcblxyXG5GdXR1cmUucHJvdG90eXBlLmV4ZWNTdWNjZXNzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKHRoaXMuc3VjY2Vzc0hhbmRsZXIgPT0gbnVsbCkge1xyXG4gICAgICAgIGNvbnNvbGUud2FybihcInN1Y2Nlc3Mgb24gZnVuY3Rpb24gd2l0aCBubyBzdWNjZXNzIGhhbmRsZXJcIik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuc3VjY2Vzc0hhbmRsZXIuYXBwbHkodGhpcy5vYmosIGFyZ3VtZW50cylcclxuICAgIH1cclxufTtcclxuXHJcbkZ1dHVyZS5wcm90b3R5cGUuZXhlY0ZhaWx1cmUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAodGhpcy5mYWlsdXJlSGFuZGxlciA9PSBudWxsKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidW5oYW5kbGVkIGZhaWx1cmVcIik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuZmFpbHVyZUhhbmRsZXIuYXBwbHkodGhpcy5vYmosIGFyZ3VtZW50cylcclxuICAgIH1cclxufTtcclxuXHJcbkZ1dHVyZS5wcm90b3R5cGUuc3VjY2VzcyA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xyXG4gICAgaWYgKHRoaXMuc3VjY2Vzc0hhbmRsZXIgPT0gbnVsbCkge1xyXG4gICAgICAgIHRoaXMuc3VjY2Vzc0hhbmRsZXIgPSBjYWxsYmFjaztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTGlzdGVuZXIgaXMgYWxyZWFkeSBzZXQhXCIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG5GdXR1cmUucHJvdG90eXBlLmZhaWx1cmUgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcclxuICAgIGlmICh0aGlzLmZhaWx1cmVIYW5kbGVyID09IG51bGwpIHtcclxuICAgICAgICB0aGlzLmZhaWx1cmVIYW5kbGVyID0gY2FsbGJhY2s7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkxpc3RlbmVyIGlzIGFscmVhZHkgc2V0IVwiKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzLmNyZWF0ZSA9IGZ1bmN0aW9uIChvYmopIHtcclxuICAgIHJldHVybiBuZXcgRnV0dXJlKG9iaik7XHJcbn07Il19
