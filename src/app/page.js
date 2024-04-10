import Image from "next/image";
const { Clause, Politician, Issue, Bill, hor, senate } = require('./classesAndObjects.js');

export default function Home() {
  var politicans = [];
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


  function processData(data, male) {
    var lastLength = data.last.length;
    var lastName = data.last[getRandomInt(0, lastLength)];
    var name = '';
    if (male === true) {
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

  function createPolitician(name, senate) {
    if (senate) {
      var politician = new Politician(getRandomNumber(-1,1), 'Senate', '', name); // Adjust parameters as needed
    } else {
      var politician = new Politician(getRandomNumber(-1,1), 'House', '', name); // Adjust parameters as needed
    }
    politicans.push(politician)
  }

  function initialize() {
    fetch('/names.json') // Changed to absolute path
      .then(response => response.json())

      .catch(error => console.error('Error:', error));
  }

  initialize(); // Call the initialize function

  return (
    <main>
      <p>It works</p>
    </main>
  );
}
