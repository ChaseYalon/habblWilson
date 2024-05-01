import Image from "next/image";
import Head from 'next/head';
const fs = require('fs');
const { performance } = require('perf_hooks');

let importStart, importEnd, loadStart, loadEnd, processStart, processEnd, selectStart, selectEnd, congressStart, congressEnd;

importStart = performance.now();
const { Clause, Politician, Issue, Bill, Committee } = require('./classesAndObjects.js');
const { abortion, immigration, LGBTQPLUSRights, gunRights } = require('./IssuesAndClauses.js');
importEnd = performance.now();

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

  function loadNames() {
    loadStart = performance.now();
    const data = require('/home/ChaseYalon/habblWilson/public/names.json');
    loadEnd = performance.now();
    return data;
  }

  function processData(data, male) { 
    processStart = performance.now();
    var lastLength = data.last.length;
    var lastName = data.last[getRandomInt(0, lastLength)];
    var firstName = male ? data.boys[getRandomInt(0, data.boys.length)] : data.girls[getRandomInt(0, data.girls.length)];
    processEnd = performance.now();
    return `${firstName} ${lastName}`;
  }

  function selectLeader(members, isMajorityLiberal) {
    selectStart = performance.now();
    var majorityGroup = members.filter(member => isMajorityLiberal ? member.leaning > 0 : member.leaning < 0);
    var minorityGroup = members.filter(member => isMajorityLiberal ? member.leaning < 0 : member.leaning > 0);
    var minorityIncludeCount = Math.floor(getRandomArbitrary(0, minorityGroup.length / 2));
    var combinedGroup = majorityGroup.slice();

    while (minorityIncludeCount-- > 0) {
      combinedGroup.push(minorityGroup[getRandomInt(0, minorityGroup.length - 1)]);
    }

    var averageLeaning = combinedGroup.reduce((total, member) => total + member.leaning, 0) / combinedGroup.length;
    var selectedLeader = combinedGroup.reduce((closest, member) => {
      var closestDifference = Math.abs(closest.leaning - averageLeaning);
      var currentDifference = Math.abs(member.leaning - averageLeaning);
      return currentDifference < closestDifference ? member : closest;
    }, combinedGroup[0]);
    selectEnd = performance.now();
    return selectedLeader;
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

  function createCongress() {
    congressStart = performance.now();
    const data = loadNames();
    for (let i = 0; i < 100; i++) {
      createPolitician(processData(data, true), true); // For Senate
    }
    for (let j = 0; j < 435; j++) {
      createPolitician(processData(data, false), false); // For House of Representatives
    }

    var speaker = selectLeader(hor, hor.filter(rep => rep.leaning > 0).length > hor.filter(rep => rep.leaning < 0).length);
    var majorityLeader = selectLeader(senate, senate.filter(sen => sen.leaning > 0).length > senate.filter(sen => sen.leaning < 0).length);

    console.log('Speaker of the House:', speaker.name, ',', speaker.leaning);
    console.log('Senate Majority Leader:', majorityLeader.name, ',', majorityLeader.leaning);
    var pCounter = politicians.length;
    if (pCounter === 536) {
      console.log('correct number of politicians');
    } else {
      console.log(`incorrect number of politicians: ${politicians.length}`);
    }
    congressEnd = performance.now();
  }
  console.log(`import time: ${importEnd - importStart}`);
  console.log(`process time: ${processEnd - processStart}`);
  console.log(`load in names time: ${loadEnd - loadStart}`);
  console.log(`select speaker time: ${selectEnd - selectStart}`);
  console.log(`congress time: ${congressEnd - congressStart}`);
  module.exports={
    politicians,hor,senate,createCongress
  }
  return (
    <main>
      <Head>
        <title>Home Page</title>
      </Head>
    <p>this works</p>
    </main>
  );
}
