# PH12-A06-by-Rizal

Programming Hero Batch 12 Assignment 6 submitted by Salman Bari Rizal

         https://theonlyrizal.github.io/PH12-A06-by-Rizal/

# QnA

---

> _What is the difference between var, let, and const?_

- **var** -> function/global scoped, can be re-declared & updated, hoisted as undefined.  
- **let** -> block scoped, can be updated but not re-declared in same scope, temporal dead zone.  
- **const** -> block scoped, must be initialized, cannot be reassigned (but arrays/objects inside can be mutated).

---

> _What is the difference between map(), forEach(), and filter()?_

- **forEach()** -> loops through items, runs callback, returns undefined.  
- **map()** -> loops, transforms each item, returns new array same length.  
- **filter()** -> loops, keeps only items that pass test, returns new shorter array.

---

> _What are arrow functions in ES6?_

- **Arrow Functions** -> shorter syntax `(a, b) => a + b`, no own `this/arguments`, lexically bound, not usable as constructors.

---

> _How does destructuring assignment work in ES6?_

- **Destructuring** -> extracts values from arrays/objects into variables.  
  Example:  

       const [a, b] = [1, 2];
       const {name, age} = person;

> _Explain template literals in ES6. How are they different from string concatenation?_

- **Template Literals** -> use backticks `...`, support ${expr} interpolation, multiline strings.
- **Different** -> more readable and flexible than 'Hello ' + name + '!' string concatenation.
