class Clause {
  constructor(Name, leaning, text, conflictsWith = [], cost) {
    this.leaning = leaning;
    this.text = text;
    this.conflictsWith = conflictsWith;
    this.Name = Name; // Fixed case to match the parameter Name
    this.cost = cost;
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

class Politician {
  constructor(leaning, body, committee, name) {
    this.leaning = leaning;
    this.body = body;
    this.committee = committee;
    this.name = name;
  }
}

class Issue {
  constructor(name, distribution, clauses, passed) {
    this.distribution = distribution;
    this.clauses = clauses;
    this.passed = passed;
    this.name = name;
  }

  addClause(clause) {
    this.clauses.push(clause);
  }
}

class Committee {
  constructor(name, members, head, issue, body, legeslation) {
    this.name = name;
    this.members = members;
    this.head = head;
    this.issue = issue;
    this.body = body;
    this.legeslation=legeslation
  }

  assignMembers(members) {
    this.members.push(members);
  }

  assignLeader(leader) {
    this.leader = leader;
  }
  giveLeislation(bill){
    this.legeslation+=bill
  }
}

class Bill {
  constructor(issue, clauses, body, onePassed = false) {
    this.issue = issue;
    this.clauses = clauses;
    this.body = body;
    this.onePassed = onePassed;
    this.leaning = issue.leaning;
    console.error('bill leaning is very wrongly calcualted, the bill could lean one way or annother on a given issue')
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
  assignToCommitte(committie){
    committie.giveLeislation(this.bill)
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
  passChamber(chamber){
    console.error('figure out how to pass chamber')
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
    return leaning / this.senators.length;
  },
  get leaning() {
    return this.calculateLeaning();
  }
};

// Export all the classes and the object
module.exports = { Clause, Politician, Issue, Bill, Committee, hor, senate };
