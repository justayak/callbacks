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