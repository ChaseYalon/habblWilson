import Image from "next/image";
import Head from 'next/head'; // This line imports the Head component from 'next/head'

const { Clause, Politician, Issue, Bill, hor, senate: senateList, Committee } = require('./classesAndObjects.js');
const { abortion, immigration, LGBTQPLUSRights, gunRights } = require('./IssuesAndClauses');

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
    var name = '';
    if (male) {
      var boysLength = data.boys.length;
      var firstName = data.boys[getRandomInt(0, boysLength)];
      name += firstName;
    } else {
      var girlsLength = data.girls.length;
      var firstName = data.girls[getRandomInt(0, girlsLength)];
      name += firstName;
    }
    return name.concat(' ', lastName);
  }

  function selectLeader(members, isMajorityLiberal) {
    // Separate members into liberals and conservatives
    var liberals = members.filter(member => member.leaning > 0);
    var conservatives = members.filter(member => member.leaning <= 0);

    // Decide the majority and minority based on the flag
    var majorityGroup = isMajorityLiberal ? liberals : conservatives;
    var minorityGroup = isMajorityLiberal ? conservatives : liberals;

    // Determine the number of minority members to include
    var minorityIncludeCount = Math.floor(getRandomArbitrary(0, minorityGroup.length / 2));
    var combinedGroup = majorityGroup.slice(); // Start with a copy of the majority

    // Randomly add a subset of the minority group
    while (minorityIncludeCount-- > 0) {
      var randomIndex = getRandomInt(0, minorityGroup.length - 1);
      combinedGroup.push(minorityGroup[randomIndex]);
    }

    // Calculate the average leaning of the combined group
    var averageLeaning = combinedGroup.reduce((total, member) => total + member.leaning, 0) / combinedGroup.length;

    // Select the leader as the member closest to the average leaning
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

    console.log('Speaker of the House:', speaker.name);
    console.log('Senate Majority Leader:', majorityLeader.name);
  }

  function createPolitician(name, isSenate) {
    var leaning = isSenate ? getRandomArbitrary(-1, 1) : -1 * Math.pow(getRandomArbitrary(-1, 1), 3);
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
  var president = appointPresident('Joe Biden', 0.3);

  return (
    <main>
      <p>it works</p>
    </main>
  );
}
