# Simple Future implementation.

## success
```javascript
/**
 * Simple async function
 */
function test() {
    var future = Future.create();
    setTimeout(function () {
        future.execSuccess("a", "B", 2);
    }, 1000);
    return future;
}


test().success(function(a, b, c) {
    console.log(a); // "a"
    console.log(b); // "B"
    console.log(c); // 2
});

```

## failure
```javascript
/**
 * Simple async function
 */
function test() {
    var future = Future.create();
    setTimeout(function () {
        future.execFailure("a", "B", 2);
    }, 1000);
    return future;
}


test().failure(function(a, b, c) {
    console.log(a); // "a"
    console.log(b); // "B"
    console.log(c); // 2
});

```

## finally
```javascript
/**
 * Simple async function
 */
function test() {
    var future = Future.create();
    setTimeout(function () {
        future.execSuccess();
    }, 100);
    setTimeout(function () {
        future.execSuccess();
    }, 200);
    setTimeout(function () {
        future.execSuccess();
    }, 300);
    setTimeout(function () {
        future.execSuccess();
    }, 400);
    setTimeout(function () {
        future.execSuccess();
    }, 500);
    return future;
}

test().success(function() {
    console.log("succ");
}).finally(5, 1000, function() {
    // gets called when success got called 5 times or the function times out after 1000 ms
    console.log("finally");
});

```