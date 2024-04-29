import Image from "next/image";
import Head from 'next/head';
import { useEffect } from 'react';
import { Elsie_Swash_Caps } from "next/font/google/index.js";
const fs = require('fs');
const { performance } = require('perf_hooks');

const { Clause, Politician, Issue, Bill, Committee } = require('../lib/classesAndObjects.js');
const { abortion, immigration, LGBTQPLUSRights, gunRights } = require('../lib/IssuesAndClauses.js');

export default function Home() {
  var politicians = [];
  var hor = [];
  var senate = [];

  useEffect(() => {
    // Performance data capturing
    const importStart = performance.now();
    // Simulate delay to emulate imports
    setTimeout(() => {
      const importEnd = performance.now();

      // Exporting performance data upon page load
      const exportPerformanceData = () => {
        const performanceString = `Import time: ${importEnd - importStart}ms\n`;
        fs.writeFile('public/performance.txt', performanceString, err => {
          if (err) {
            console.error('Error writing to file:', err);
          } else {
            console.log('Performance data written successfully to file');
          }
        });
      };

      exportPerformanceData();
    }, 500);
  }, []);

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  function loadNames() {
    const data = require('../data/names.json');
    return data;
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

    if(politicians.length===536){
      console.log('correct number of politatns')
    }else{
      console.log(`number of poliatins:${politicians.lengt}`)
    }
  }

  return (
    <main>
      <Head>
        <title>Home Page</title>
      </Head>
      <h1>Welcome to the Next.js Application</h1>
      <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
      <p>This page logs performance data on load and writes it to a file.</p>
    </main>
  );
}
