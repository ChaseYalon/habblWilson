import Image from "next/image";
import Head from 'next/head'; // This line imports the Head component from 'next/head'

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

  async function createCongress() {
    const data = await loadNames();
    for (let i = 0; i < 100; i++) {
      createPolitician(processData(data, true), true); // For Senate
      console.log('senate added')
      console.log(senate)
    }
    for (let j = 0; j < 435; j++) {
      createPolitician(processData(data, false), false); // For House of Representatives
    }

  }

  function createPolitician(name, isSenate) {
    if (isSenate) {
      var politician = new Politician(getRandomArbitrary(-1, 1), 'Senate', '', name);
      console.log('poliation got made')
      console.log('sentate length',senate.length)
      senate.push(politician);
      console.log('senate length after',senate.length)
    } else {
      var politician = new Politician(getRandomArbitrary(-1, 1), 'House', '', name);
      hor.push(politician);
    }
    politicans.push(politician);
  }
  function appointPresident(name,leaning){
    //auto sets male for president for obvious reasons, maybe fix later?
    if(Math.abs(leaning)>1){
      var leaning=getRandomArbitrary(-1,1)
    }else {
      var leaning=leaning
    }
    var president=new Politician(leaning,'President','',name)
    politicans.push(president)
    return president
  }
  createCongress(); // Initialize the creation process
  //Appoints Biden president, he is Liberal but not radical maybe move to 0.4/0.5?
  var president=appointPresident('Joe Biden',0.3)
  return (
    <>
<Head>
  <title>My Next.js Site</title>
  <link rel="icon" type="image/jpeg" href="/favicon.jpg" />
</Head>

      <main>
        <p>It works</p>
        {/* ... other content ... */}
      </main>
    </>
  );
}

