// //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Closure~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
// function outer(){
//     let count = 0;
//     function inner(){
//         count++;
//         console.log(count);
//     }
//     return inner;
// }
// // when outer() is invoked, it already completed the execution
// // which's returning the inner function, so a has the function
// // therefore it can re-used for the inner function hence closure 
// // the count variable can still be accessed!
// let a = outer();
// a();
// a();
// //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//



// //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*Currying~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
// // transform function of multiple arguments into
// // a sequence of nesting functions to take one
// // argument at a time f(a, b, c) => f(a)(b)(c)
// function sum(a,b,c){
//     return a+b+c;
// }

// function curry(fn){
//     return function(a){
//         return function (b){
//             return function(c){
//                 return fn(a, b, c);
//             }
//         }
//     }
// }
// const curriedSum = curry(sum);
// // console.log(curriedSum(2)(3)(5));

// const add2 = curriedSum(2);
// const add3 = add2(3);
// const add5 = add3(5);
// console.log(add5);
// // can be used to call the function an argument at
// // a time instead of all arguments at once
// // currying doesn't call a function, it transforms it
// //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//



// //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~this~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
// function sayMyName(name){
//     console.log(`My name is ${name}`)
// }

// //imblicit binding
// const person = {
//     name: 'Jeff',
//     sayMyName: function(){
//         console.log(`My name is ${this.name}`);
//         // person.name
//     }
// }
// person.sayMyName();

// //explicit binding
// function sayMyName(){
//     console.log(`My name is ${this.name}`)
// }
// sayMyName.call(person); // the call function to reference the person/object

// //new binding
// function Person(name){
//     this.name = name; //this.name = {} an empty object
// } // similar to constructors
// const p1 = new Person('Jeeeefff');
// console.log(p1.name);

// //default binding
// globalThis.name = 'Urgh';
// sayMyName()
// //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//



// //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~prototyping~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
// function Person(fname, lname){
//     this.firstName = fname;
//     this.lastName = lname;
// }
// const person1 = new Person('Goose', 'Whine');
// const person2 = new Person('Whine', 'Goose');
// person1.getFullName = function () {
//     return this.firstName + ' ' + this.lastName;
// }
// console.log(person1.getFullName());
// // what if we wanted to use the function on every person
// // not just person one instead of re-writting it?
// // this is where prototyping comes
// Person.prototype.getFullName = function () {
//     return this.firstName + ' ' + this.lastName;
// }
// console.log(person1.getFullName());
// console.log(person2.getFullName());
// // now you've added a new property to the constructor
// // there's also inheritance
// //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//