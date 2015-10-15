/*
In the last exercise you used Iterables to generate loops. But the Iterable object did require a lot of overhead. With the new generator syntax its possible to do the same thing with less effort.

Here is an example of the generator syntax:

    let fibonacci = function*(){
      let pre = 0, cur = 1;
      while (pre < 1000) {
        // Here we destruct the former state
        [pre, cur] = [cur, pre + cur];
        // and yield (return) each step
        yield pre;
      }
    }();
    
    for (var n of fibonacci) {
      console.log(n);
    }

The difference to other ways is the function* notation and that you use yield where you would have used return before.

# Exercise

Create the same FizzBuzz algorithm as explained in the last exercise but this time using the new generator syntax.
*/

    const max = process.argv[2];
    let FizzBuzz = function*(){
      let cur = 0;
      // The resulting iterator object has to have a next method:
      while (cur < max) {
        cur++;
        let ret = [];
        if (cur % 3 === 0)
           ret.push('Fizz');
        if (cur % 5 === 0)
           ret.push('Buzz');
        yield ret.join('') || cur;
      }
    }();

    for (var n of FizzBuzz) {
      console.log(n);
    }

