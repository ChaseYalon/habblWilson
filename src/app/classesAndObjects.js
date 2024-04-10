class Clause {
  constructor(leaning, text) {
    this.leaning = leaning;
    this.text = text;
  }
}

class Politician {
  // Add properties and methods as needed
}

class Issue {
  constructor(distribution, clauses, passed) {
    this.distribution = distribution;
    this.clauses = clauses;
    this.passed = passed;
  }
}

var hor = {
  reps: [], // put list of reps here
  committees: [], // put list of committees here
  calculateLeaning() {
    var i = 0;
    var leaning = 0;
    while (i < 435) {
      leaning += this.reps[i].leaning;
      i++;
    }
    return leaning;
  },
  get leaning() {
    return this.calculateLeaning();
  }
};

// Export all the classes and the object
module.exports = { Clause, Politician, Issue, hor };
