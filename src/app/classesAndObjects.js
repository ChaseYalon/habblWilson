class Clause {
  constructor(leaning, text) {
    this.leaning = leaning;
    this.text = text;
  }
}

class Politician {
  constructor(leaning,body,committee){
    this.leaning=leaning
    this.body=body
    this.committee=committee
  }
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
var senate = {
  senators: [], // put list of senators here
  committees: [], // put list of committees here
  calculateLeaning() {
    var i = 0;
    var leaning = 0;
    while (i < 435) {
      leaning += this.senators[i].leaning;
      i++;
    }
    return leaning;
  },
  get leaning() {
    return this.calculateLeaning();
  }
};
class bill {
  constructor(issue,clauses,body,onePassed,leaning){
    this.issue=issue
    this.clauses=clauses
    this.body=body
    this.onePassed=false
    this.leaning=issue.leaning
  }
  addClause(clause){
    this.clauses.push(clause)
    this.leaning+=clause.leaning
    
  }
  pass(committie,house){
    var compromiseCoeficent=0.1
    if(bill.leaning>0){
      if(committie.leaning>0-compromiseCoeficent){
        console.error('figure out how to pass bills')
      }else {
        console.error('figure out how to not pass bills')
      }
    }else {
      if(committie.leaning<0+compromiseCoeficent){
        console.error('figure out how to pass bills')
      }else {
        console.error('figure out how to not pass bills')
      }
    }
  }
}
// Export all the classes and the object
module.exports = { Clause, Politician, Issue, hor,senate };
