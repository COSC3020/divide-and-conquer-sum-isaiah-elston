# Divide and Conquer Sum

In the lectures, we've covered merge sort, which uses a divide-and-conquer
approach to sort an array of values. There are many more algorithms that take
such an approach. Implement a function that computes the sum of an array of
integers using divide and conquer, using the template in `code.js`. Test your
new function; I've provided some basic testing code that uses
[jsverify](https://jsverify.github.io/) in `code.test.js`.

The recursive calls sum up the numbers in the base case, and "merges" the sums
of the recursive calls otherwise. For example, the return value for the array `a
= [1,5,-1,4]` is `9`.

To make it a bit more interesting, instead of splitting into two sub-arrays like
in merge sort, I want you to split into *three* sub-arrays at each divide step.

Hint: Like in the implementation of merge sort, you may need a helper function
that does the actual recursion.

## Runtime Analysis

What is the runtime of the algorithm that you implemented? Provide a recurrence
relation for $T(n)$ as we did for merge sort (you can ignore constant factors)
and solve it as we did in the lectures. Give the final $\Theta$ complexity.

Describe your reasoning and the conclusion you've come to. Your reasoning is the
most important part. Add your answer to this markdown file.

### Implementation with Step Labels

```javascript

function divideAndConquerSum(a) {
    if (a.length == 0) { // T(1) = 1
        return 0; // T(1) = 1
    } else if (a.length > 1) { // T(1) = 1
        let netSum = 0; // T(1) = 1
        let firstThird = Math.floor(a.length * (1/3)); // T(1) = 1
        let finalThird = Math.floor(a.length * (2/3)); // T(1) = 1
        return netSum += divideAndConquerSum(a.slice(0, firstThird--)) + // T(n/3)
                         divideAndConquerSum(a.slice(firstThird, finalThird)) + // T(n/3)
                         divideAndConquerSum(a.slice(finalThird++, a.length)); // T(n/3)
    } else if (a.length == 1) {  // T(1) = 1
        return a[0]; // T(1) = 1
    }
}

```

### Recurrence Relation

$$
\mathrm{T}(n) = \begin{cases}
1 & \text{if} & n \leq 1 \\
3\mathrm{T}(\frac{n}{3}) + 4 & \text{if} & n > 1
\end{cases}
$$

The only non-constant steps in my implementation are the recursive calls that divide up the input array. If we label the arbitrary input size as "$n$," we can derive that the input size of each recursive call will be $\frac{n}{3}$ since this algorithm divides each input into thirds. Because each recursion calls `divideAndConquerSum` three times, we must incorporate the leading coefficent of $3$. The recursion will continue until it hits the base case where $n = 1$ which will always resolve in constant time.

#### Discerning the pattern...

$$
\begin{align}
& \mathrm{T}(n) = 3\mathrm{T}(\frac{n}{3}) + 4 \\
\implies & \mathrm{T}(n) = 3(3\mathrm{T}(\frac{n}{9}) + \frac{4}{3}) + 4 \\
\implies & \mathrm{T}(n) = 9\mathrm{T}(\frac{n}{9}) + 8 \\
\implies & \mathrm{T}(n) = 9(3\mathrm{T}(\frac{n}{27}) + 4) + 8 \\
\implies & \mathrm{T}(n) = 27\mathrm{T}(\frac{n}{27}) + 12 \\
\vdots   & \\
\implies & \mathrm{T}(n) = 3^{i}\mathrm{T}(\frac{n}{3^{i}}) + 4i \\
\end{align}
$$

Now that I have a generalized pattern for the recurrence relation I can determine that, based on an arbitrary input size "$n$," the amount of steps required to reach the base case of $n \leq 1$ will always be $\log_{3}(n)$. The reason it is $\log_{3}(n)$ is because the recursive division of the input array can be modeled as a ternary tree where the height is the number of steps it takes to get from the initial length "$n$" to either $n = 1$ or $n = 0$.

Now, let's substitute $i$ with $\log_{3}(n)$ to finish deriving the $\Theta$ runtime bound...

$$
\begin{align}
\implies & \mathrm{T}(n) = 3^{\log_{3}(n)}\mathrm{T}(\frac{n}{3^{\log_{3}(n)}}) + 4\log_{3}(n) \\
\implies & \mathrm{T}(n) = 3^{\log_{3}(n)}(1) + 4\log_{3}(n) \\
\implies & \mathrm{T}(n) = n(1) + 4\log_{3}(n) \\
\implies & \mathrm{T}(n) \in \mathrm{\Theta}(n)
\end{align}
$$