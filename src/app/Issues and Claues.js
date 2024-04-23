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

var abbortion=new Issue('Abortion',createDistFromFunction(x => x ** 2),[totalBan,forTheLifeOfTheMother,forRapeAndIncest,sixWeekBan,twelveWeekBan,eighteenWeekBan,twenteyWeekBan,twentyTwoWeekBan,twentySixWeekBan,untillFetalVibilaty],false)
    var totalBan=new Clause('Total ban',-0.95,'It is hereby adoptd that all abbortions banned with only exeptions listed below',[sixWeekBan,twelveWeekBan,sixteenWeekBan,eighteenWeekBan,twenteyWeekBan,twentyTwoWeekBan,twentySixWeekBan,untillFetalVibilaty],0)
    var forTheLifeOfTheMother=new Clause('For the life of the mother',0.2,"This is an execption to any and all abbortion bans, allowing the procedure when the life of the mother is imineltey at stake as determied by their physitian",[],0)
    var forRapeAndIncest=new Clause('For Rape and Incest',0,'This is an exceptioin to any and all Abbortion ban(s) when the pregnacy was inntated through unlawfull rape or incest.',[],0)
    var sixWeekBan=new Clause('6 week ban',-0.87,'It is hereby adoped that any abbortions unless specificaly later exempted are band 6 weeks after fertilization',[totalBan,twelveWeekBan,sixteenWeekBan,eighteenWeekBan,twenteyWeekBa,twentyTwoWeekBann,twentySixWeekBan,untillFetalVibilaty],0)
    var twelveWeekBan=new Clause('12 week ban',-0.8,'It is hereby adoped that all abortions unless otherwise expemted are banned 12 weeks from conception unless specificaly exempted',[totalBan,sixWeekBan,sixteenWeekBan,eighteenWeekBan,twenteyWeekBan,twentyTwoWeekBan,twentySixWeekBan,untillFetalVibilaty],0)
    var sixteenWeekBan=new Clause('16 week ban',-0.72,'It is hereby adopted that all abbortions unless otherwise specifialy exempted bellow are banned 16 weeks after conception',[sixWeekBan,twelveWeekBan,totalBan,eighteenWeekBan,twenteyWeekBan,twentyTwoWeekBan,twentySixWeekBan,untillFetalVibilaty],0)
    var eighteenWeekBan=new Clause('18 week ban',-0.69,'It is hereby adopted that unless specifaly exempted bellow all abbortios all baned after 18 weeks',[totalBan,sixWeekBan,twelveWeekBan,sixWeekBan,twenteyWeekBan,twentySixWeekBan,untillFetalVibilaty],0)
    var twenteyWeekBan=new Clause('20 week ban',-0.6,'It is hereby adopted that unless specifcaly exempted all abbortions are banned after 20 weeks',[totalBan,sixWeekBan,twelveWeekBan,sixteenWeekBan,eighteenWeekBan,twentyTwoWeekBan,twentySixWeekBan,untillFetalVibilaty],0)
    var twentyTwoWeekBan=new Clause('22 week ban',-0.5,'It is hereby adopted that unless specifcaly exempted all abbortions are banned after 22 weeks',[totalBan,sixWeekBan,twelveWeekBan,sixteenWeekBan,eighteenWeekBan,twenteyWeekBan,twentySixWeekBan,untillFetalVibilaty],0)
    var twentySixWeekBan=new Clause('26 week ban',-0.35,'It is hereby adopted that unless specifcaly exempted all abbortions are banned after 26 weeks',[totalBan,sixWeekBan,twelveWeekBan,sixteenWeekBan,eighteenWeekBan,twenteyWeekBan,untillFetalVibilaty],0)
    var untillFetalVibilaty=new Clause('Untill fetal viability',0.1,'It is hereby adopted that unless specifcaly exempted all abbortions are banned after fetal viability',[totalBan,sixWeekBan,twelveWeekBan,sixteenWeekBan,eighteenWeekBan,twenteyWeekBan,twentySixWeekBan],0)

var immagration=new Issue('Immagration reform',createDistFromFunction(x =>Math.abs(x ** 3) ),[],false)
    var buildAWall=new Clause('Build a wall across the border',-0.8,'It is resolved that for the specefied cost we will build a wall across the southern border with Mexico ',[],18000000000)
    var improveAsylum=new Clause('Asylum reform',0.3,'Improve the asylum system by streamlining it and opening it up for more people. Elidgable people now include, anyone with a credible fear of violencene. ',[],30000000)
    var title42=new Clause('Title 42 of the U.S. health code',-0.2,'Under the Center for Disease Controls athrotiry to prevent infections disease from entering this country, all migrants even those seking asylum must wait in Mexico untill they have been approved for entery.',[],2000000000)
    /*add more, lots more */
//the part with the createDistFromFunction() is very definetley broken, x should be -1+0.1x where x is an integer between 1-20 and y should be a number betwetwen -1 and 1 inclusive that gets turred into an array of distributions that sums to 100 for each index x 
var LGBTQPLUSRights=new Issue('LGBTQ+ rights',createDistFromFunction(x=>2*(1/(1+Math.pow(Math.E,-6*x)))),[/*add clauses here*/],false)
    //add clauses here

var gunRights=new Issue('Gun Rights',createDistFromFunction)