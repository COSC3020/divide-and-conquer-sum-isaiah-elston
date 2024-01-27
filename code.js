function divideAndConquerSum(a) {
    if (a.length == 0) {
        return 0;
    } else if (a.length > 1) {
        let netSum = 0;
        let firstThird = Math.floor(a.length * (1/3));
        let finalThird = Math.floor(a.length * (2/3));
        return netSum += divideAndConquerSum(a.slice(0, firstThird--)) +
                         divideAndConquerSum(a.slice(firstThird, finalThird)) +
                         divideAndConquerSum(a.slice(finalThird++, a.length));
    } else if (a.length == 1) {
        return a[0];
    }
}
