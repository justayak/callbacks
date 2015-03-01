# Simple Future implementation.

## success
```javascript
/**
 * Simple async function
 */
function test1() {
    var future = Future.create();
    setTimeout(function () {
        future.execSuccess("a", "B", 2);
    }, 1000);
    return future;
}


test1().success(function(a, b, c) {
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
function test1() {
    var future = Future.create();
    setTimeout(function () {
        future.execFailure("a", "B", 2);
    }, 1000);
    return future;
}


test1().failure(function(a, b, c) {
    console.log(a); // "a"
    console.log(b); // "B"
    console.log(c); // 2
});

```