const messageConfig = {
  frontContent: "Happy Birthday, Odin One-Eye!",
  insideContent: "From Asgard to Nifelheim, you're the best all-father ever.\n\nLove,",
  closing: {
      "Thor": "Admiration, respect, and love",
      "Loki": "Your son"
  },
  signatories: [
      "Thor",
      "Loki"
  ]
};

// "this" is lost in the forEach function
const printCard = function () {
    console.log(this.frontContent);
    console.log(this.insideContent);

    console.log('Debug Before forEach: ' + this)
    this.signatories.forEach(function (signatory) {
      console.log('Debug Inside: ' + this)
      const message = `${this.closing[signatory]}, ${signatory}`;
      console.log(message);
    });
  };
  
  printCard.call(messageConfig);

  // Keep context using thisArg on the forEach:
  const printCardWithThisArg = function () {
    console.log(this.frontContent);
    console.log(this.insideContent);
  
    this.signatories.forEach(function (signatory) {
      const message = `${this.closing[signatory]}, ${signatory}`;
      console.log(message);
    }, this); // <--
  };

  // Keep context using bind:
  const printCardWithBind = function () {
    console.log(this.frontContent);
    console.log(this.insideContent);
    const contextBoundForEachExpr = function (signatory) {
      const message = `${this.closing[signatory]}, ${signatory}`;
      console.log(message);
    }.bind(this); // <--
  
    this.signatories.forEach(contextBoundForEachExpr);
  };
  
  // **MOST PREFERRED: Arrow function!
  // The `const greeter` is merely the assignment, the expression begins after the `=`
const greeter = (nameToGreet) => {
    const message = `Good morning ${nameToGreet}`;
    console.log(message);
    return "Greeted: " + nameToGreet;
  };
  const result = greeter("Max"); //=> "Greeted: Max"
  /*
    Arrow functions are much more predictable since they do not create their
    own "this" during execution and instead "absorb" the context of their
    enclosing environment.
  */

    // Most elegant solution:
    const printCardArrowFunction = function () {
        console.log(this.frontContent);
        console.log(this.insideContent);
        // Wow! Elegant! And notice the arrow function's `this` is the same `this`
        // that printCard has; specifically, the `thisArg` that was passed to it
        this.signatories.forEach((signatory) =>
          console.log(`${this.closing[signatory]}, ${signatory}`)
        );
      };
      
      printCard.call(messageConfig);