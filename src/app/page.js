import Image from "next/image";
import Head from 'next/head'; // This imports the Head component from 'next/head'

// Correct the import paths according to your file structure
const { Clause, Politician, Issue, Bill, hor, senate: senateList, Committee } = require('./classesAndObjects.js');
const { abortion, immigration, LGBTQPLUSRights, gunRights } = require('./IssuesAndClauses.js'); // Fixed the filename here

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

  async function loadNames() {
    const data = await import('/public/names.json');
    return data.default;
  }

  function processData(data, male) {
    var lastLength = data.last.length;
    var lastName = data.last[getRandomInt(0, lastLength)];
    var firstName = male ? data.boys[getRandomInt(0, data.boys.length)] : data.girls[getRandomInt(0, data.girls.length)];
    return `${firstName} ${lastName}`;
  }

  function selectLeader(members, isMajorityLiberal) {
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
  }

  async function createCongress() {
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

  createCongress(); // Initialize the creation process
  var president = appointPresident('Joe Biden',0.3)
  return (
    <main>
      <p>this works</p>
    </main>
  )
}
