/*
# Exercise

Create a javascript program that takes the the first command-line argument and
outputs it right after a "Hello " String using ES6 template strings.

# Hints

It is possible to pass command-line arguments to a babel program like this:

    babel-node my-program.js an-argument

To access the arguments you can use the process.argv array.

Important! The process.argv array contains not just the arguments but also the runtime (first variable) and the script file loaded (second variable)!
This means the first argument is stored at the third position:

    process.argv[2]

ES6 template strings are a new way to declare strings using the ``` character. In template strings you can access local variables like this:

    var a = 1;
    console.log(`${a}`);

Read more about template strings here: [http://updates.html5rocks.com/2015/01/ES6-Template-Strings](http://updates.html5rocks.com/2015/01/ES6-Template-Strings)

*/

console.log(`Hello ${process.argv[2]}`);
