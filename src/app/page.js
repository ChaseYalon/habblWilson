import Image from "next/image";
import Head from 'next/head'; // This imports the Head component from 'next/head'
const fs=require('node:fs')
var importStart=performance.now()
// Correct the import paths according to your file structure
const { Clause, Politician, Issue, Bill, hor, senate: senateList, Committee } = require('./classesAndObjects.js');
const { abortion, immigration, LGBTQPLUSRights, gunRights } = require('./IssuesAndClauses.js'); // Fixed the filename here
var importEnd=performance.now()

export default function Home() {
  var politicians = [];
  var hor = [];
  var senate = [];

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }
  let loadStart;
  let loadEnd;
  let processStart;
  let processEnd;
  let selectStart;
  let selectEnd;
  let congressStart;
  let congressEnd;
  async function loadNames() {
    loadStart=performance.now()
    const data = await import('/public/names.json');
    return data.default;
    loadEnd=performance.now()
  }

  function processData(data, male) {
    processStart=performance.now()
    var lastLength = data.last.length;
    var lastName = data.last[getRandomInt(0, lastLength)];
    var firstName = male ? data. Boys[getRandomInt(0, data.boys.length)] : data.girls[getRandomInt(0, data.girls.length)];
    return `${firstName} ${lastName}`;
    processEnd=performance.now()
  }

  function selectLeader(members, isMajorityLiberal) {
    selectStart=performance.now()
    var majorityGroup = members.filter(member => isMajorityLiberal ? member.leaning > 0 : member.leaning < 0);
    var minorityGroup = members.filter(member => isMajorityLiberal ? member.leaning < 0 : member.leaning > 0);

    var minorityIncludeCount = Math.floor(getRandomArbitrary(0, minorityGroup.length / 2));
    var combinedGroup = majorityGroup.slice(); // Clone the majority group

    while (minorityIncludeCount-- > 0) {
      combinedGroup.push(minorityGroup[getRandomInt(0, minorityGroup.length - 1)]);
    }

    var averageLeaning = combinedGroup.reduce((total, member) => total + member.leaning, 0) / combinedGroup.length;
    var selectedLeader = combinedGroup.reduce((closest, member) => {
      var closestDifference = Math.abs(closest.leaning - averageLeaning);
      var currentDifference = Math.abs(member.leaning - averageLeaning);
      return currentDifference < closestDifference ? member : closest;
    }, combinedGroup[0]);

    return selectedLeader;
    selectEnd=performance.now()
  }

  async function createCongress() {
    congressStart=performance.now()
    const data = await loadNames();
    for (let i = 0; i < 100; i++) {
      createPolitician(processData(data, true), true); // For Senate
    }
    for (let j = 0; j < 435; j++) {
      createPolitician(processData(data, false), false); // For House of Representatives
    }

    var speaker = selectLeader(hor, hor.filter(rep => rep.leaning > 0).length > hor.filter(rep => rep.leaning < 0).length);
    var majorityLeader = selectLeader(senate, senate.filter(sen => sen.leaning > 0).length > senate.filter(sen => sen.leaning < 0).length);

    console.log('Speaker of the House:', speaker.name,',',speaker.leaning);
    console.log('Senate Majority Leader:', majorityLeader.name,',',majorityLeader.leanging);

    // Log all politicians
    console.log("All Politicians:");
    var pCounter=0
    politicians.forEach(politician => {
      console.log(`${politician.name}: ${politician.leaning.toFixed(2)} (${politician. Body}) (${pCounter})`)
      pCounter++;
    });
    congressEnd=performance.now()
  }

  function createPolitician(name, isSenate) {
    var leaning = isSenate ? getRandomArbitrary(-1, 1) : -Math.pow(getRandomArbitrary(-1, 1), 3);
    var politician = new Politician(leaning, isSenate ? 'Senate' : 'House', '', name);
    politicians.push(politician);
    if (isSenate) {
      senate.push(politician);
    } else {
      hor.push(politician);
    }
  }

  function appointPresident(name, leaning) {
    var president = new Politician(leaning, 'President', '', name);
    politicians.push(president);
    return president;
  }
  module.performaceCheck.export=function () {
const performanceString=`Import time:${importEnd-importStart} /nLoad time:${loadEnd-loadStart} /nProcess names time:${processEnd-processStart} /nLeader Selection time:${selectEnd-selectStart} /nCongress creation time:${congressEnd-congressStart}`

fs.writeFile('tests/performance.txt', performanceString, err => {
  if (err) {
    console.error(err);
  } else {
    console.log('file written successfully')
  }
});  }
  createCongress(); // Initialize the creation process
  var president = appointPresident('Joe Biden',0.3)
  return (
    <main>
      <p>this works</p>
    </main>
  )
}
