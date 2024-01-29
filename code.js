function divideAndConquerSum (a) {
    if (a.length <= 0) {
        return 0;
    } else if (a.length > 1) {
        let firstThird = Math.floor(a.length * (1/3));
        let secondThird = Math.floor(a.length * (2/3));
        return divideAndConquerSum(a.slice(0, firstThird)) +
               divideAndConquerSum(a.slice(firstThird++, secondThird)) +
               divideAndConquerSum(a.slice(secondThird++, a.length));
    } else if (a.length == 1) {
        return a[0];
    }
}