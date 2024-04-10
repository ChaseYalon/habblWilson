import Image from "next/image";
const { Clause, Politician, Issue, Bill, hor, senate: senateList } = require('./classesAndObjects.js');

export default function Home() {
  var politicans = [];
  var hor = [];
  var senate = [];

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
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

  async function createCongress() {
    const data = await loadNames();
    for (let i = 0; i < 100; i++) {
      createPolitician(processData(data, true), true); // For Senate
    }
    for (let j = 0; j < 435; j++) {
      createPolitician(processData(data, false), false); // For House of Representatives
    }
  }

  function createPolitician(name, isSenate) {
    if (isSenate) {
      var politician = new Politician(getRandomInt(-1, 1), 'Senate', '', name);
      senate.push(politician);
    } else {
      var politician = new Politician(getRandomInt(-1, 1), 'House', '', name);
      hor.push(politician);
    }
    politicans.push(politician);
  }

  createCongress(); // Initialize the creation process
  console.log(senate)
  return (
    <main>
      <p>It works</p>
    </main>
  );
}
