const fs = require('fs');
const jsc = require('jsverify');

eval(fs.readFileSync('code.js')+'');

const test =
    jsc.forall("array nat", function(arr) {
        return JSON.stringify(divideAndConquerSum(arr)) == JSON.stringify(arr.reduce(function(a, b) { return a + b; }, 0));
    });
jsc.assert(test);
