class Clause {
  constructor(Name,leaning, text, conflictsWith = [],cost) {
    this.leaning = leaning;
    this.text = text;
    this.conflictsWith = conflictsWith;
    this.Name=name
    this.cost=cost
  }

  checkConflicts(issue) {
    var clauses = issue.clauses;
    for (var i = 0; i < clauses.length; i++) {
      if (Math.abs(this.leaning - clauses[i].leaning) > 0.6) {
        this.conflictsWith.push(clauses[i]);
      }
    }
    return this.conflictsWith;
  }
}
//-1 =MTG (Ultra conservative) 1=Bernnie Sanders (ultra liberal) 0 = Joe Manchien (moderate)
class Politician {
  constructor(leaning, body, committee,name) {
    this.leaning = leaning;
    this.body = body;
    this.committee = committee;
    this.name=name
  }
}

class Issue {
  constructor(name,distribution, clauses, passed) {
    this.distribution = distribution;
    this.clauses = clauses;
    this.passed = passed;
    this.name=name
  }
  addClause(clause){
    this.clauses.push(clause)
  }

}
class commitie {
  constructor(name,members,head,issue,body){
    this.name=name
    this.members=members
    this.head=head
    this.issue=issue
    this.body=body
  }
  asignMembers(members){
    this.members.push(members)
  }
  asignLeader(leader){
    this.leader=leader
  }
}

class Bill {
  constructor(issue, clauses, body, onePassed = false) {
    this.issue = issue;
    this.clauses = clauses;
    this.body = body;
    this.onePassed = onePassed;
    this.leaning = issue.leaning;
  }

  addClause(clause) {
    this.clauses.push(clause);
    this.leaning += clause.leaning;
  }

  findConflictingClauses() {
    var conflicts = [];
    for (var i = 0; i < this.clauses.length; i++) {
      var clauseConflicts = this.clauses[i].checkConflicts(this.issue);
      conflicts = conflicts.concat(clauseConflicts);
    }
    return conflicts;
  }

  pass(committee) {
    var compromiseCoefficient = 0.1;

    if (this.leaning > 0) {
      if (committee.leaning > -compromiseCoefficient) {
        console.log('Figure out how to pass bills');
      } else {
        console.log('Figure out how to not pass bills');
      }
    } else {
      if (committee.leaning < compromiseCoefficient) {
        console.log('Figure out how to pass bills');
      } else {
        console.log('Figure out how to not pass bills');
      }
    }
  }
}

var hor = {
  reps: [], // Put list of reps here
  committees: [], // Put list of committees here
  calculateLeaning() {
    var leaning = 0;
    for (var i = 0; i < this.reps.length; i++) {
      leaning += this.reps[i].leaning;
    }
    return leaning;
  },
  get leaning() {
    return this.calculateLeaning();
  }
};

var senate = {
  senators: [], // Put list of senators here
  committees: [], // Put list of committees here
  calculateLeaning() {
    var leaning = 0;
    for (var i = 0; i < this.senators.length; i++) {
      leaning += this.senators[i].leaning;
    }
    return leaning;
  },
  get leaning() {
    return this.calculateLeaning();
  }
};

// Export all the classes and the object
module.exports = { Clause, Politician, Issue, Bill, hor, senate };
