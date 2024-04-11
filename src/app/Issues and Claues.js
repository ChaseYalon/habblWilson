const { Clause, Politician, Issue, Bill, hor, senate: senateList,commitie} = require('./classesAndObjects.js');
function createDistFromFunction(func) {
    const numIndices = 20;
    const increment = 0.1;
    const startValue = -1;
    
    // Create an array of values from -1 to 1 with a 0.1 increment
    let values = Array.from({ length: numIndices }, (_, i) => startValue + i * increment);

    // Apply the function to each value
    let functionValues = values.map(func);

    // Calculate the sum of the function values
    const sumFunctionValues = functionValues.reduce((acc, val) => acc + val, 0);

    // Scale the function values so that their sum adds up to 100
    const scaleFactor = 100 / sumFunctionValues;
    let scaledValues = functionValues.map(val => val * scaleFactor);

    return scaledValues;
}

// Example usage with y = x^2
console.log();


//FYI: I pulled all these numbers out of my ass, maybe go find real data?

var abbortion=new Issue('Abortion',createDistFromFunction(x => x ** 2),[],false)
    var totalBan=new Clause('Total ban',-0.95,'It is hereby adoptd that all abbortions banned with only exeptions listed below',[sizWeekBan])
    var forTheLifeOfTheMother=new Clause('For the life of the mother',0.2,"This is an execption to any and all abbortion bans, allowing the procedure when the life of the mother is imineltey at stake",[])
    var forRapeAndIncest=new Clause('For Rape and Incest',0,'This is an exceptioin to any and all Abbortion ban(s) when the pregencey was inntated through unlawfull rape or incest.',[])
    var sixWeekBan=new Clause('6 week ban',-0.8,'It is hereby adoped that any abbortions unless specificaly later exempted are band 6 weeks after fertilization',[totalBan])
    var twelveWeekBan=new Clause('12 week ban',-0.65,'It is hereby adoped that all abortions unless otherwise expemted are banned 12 weeks from conception unless specificaly exempted')