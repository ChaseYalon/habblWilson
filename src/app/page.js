import Image from "next/image";
import Head from 'next/head'; // This line imports the Head component from 'next/head'

const { Clause, Politician, Issue, Bill, hor, senate: senateList,commitie} = require('./classesAndObjects.js');
const {abbortion,immagration,LGBTQPLUSRights,gunRights}=require('./Issues and Claues.js')
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
    //<calculates speaker>
    var horConservatives=[]
    var horLiberals=[]
    var senateConservatives=[]
    var senateLiberals=[]
    var k=0
    while(k<435){
      if(hor[k].leaning>0){
        horLiberals.push(hor[k])
      }else {
        horConservatives.push(hor[k])
      }
      k++
      
    }
    for(let l=0;l<100;l++){
      if(senate[l].leaning>0){
        senateLiberals.push(senate[l])
      }else {
        senateConservatives.push(senate[l])
      }
    }
    var horMajority=''
    var senateMajority=''
    if(horLiberals.length>horConservatives.length){
      horMajority='Liberals'
    }else {
      horMajority='Conservatives'
    }
    let speaker;
    
    if(horMajority==='Liberals'){
      //this sucks, make it better, should be bell curve centered at like 10
      var horDivvision=getRandomArbitrary(0,horLiberals.length/2)
      var toFindAverageOf=[]
      toFindAverageOf+=horLiberals
      for(let ij=0;ij<horDivvision;ij++){
        toFindAverageOf+=horConservatives[ij]
      };
    var houseAverage=null
    for(let ji;ji<toFindAverageOf.length;ji++){
      houseAverage+=toFindAverageOf[ji]
    }
    function findclosestMember(average,members){
      var closestMember=null
      var closestAverage=Infinity
      for(let jik=0;jik<members.length;jik++){
        if(members[jik].leaning-average<closestAverage){
          closestAverage=members[jik].leaning
          closestMember=members[jik]
        }
      }
    }
      speaker=findclosestMember(houseAverage,hor)
    }else {
      speaker=horConservatives[getRandomInt(1,horConservatives.length)]
    }
    console.log('Speaker of the house:',speaker)
    //<calculates speaker/>
    //TODO: Make it so appointments are not random and instead there is some sort of internal compromise/election or person closest to +-0.5 (depending on party)
    //<calculates majority leader (head of the senate but not technicaly, google president pro tempore and senate majority leader)>
    let majorityLeader;
    if(senateLiberals.length>senateConservatives.length){
      senateMajority='Liberals'
    }else {
      senateMajority='Conservatives'
    }
    if(senateMajority==='Liberals'){
      majorityLeader=senateLiberals[getRandomInt(1,senateLiberals.length)]
    }else {
      majorityLeader=senateConservatives[getRandomInt(1,senateConservatives.length)]
    }
    console.log('Senate Majoirty Leader:',majorityLeader)
    //<calcuates majority leader/>
  

  }
  //TODO: Create issues & clauses
  
  function asignCommities(leader,body,commities){
    //TODO: Deal with commities
    return console.error('you need to fill in this function, come here and look at the TODOs')
  }
  function createPolitician(name, isSenate) {
    if (isSenate) {
      var politician = new Politician(getRandomArbitrary(-1, 1), 'Senate', '', name);
      console.log('poliation got made')
      console.log('sentate length',senate.length)
      senate.push(politician);
      console.log('senate length after',senate.length)
    } else {

      //raise it to the 3rd power to create distribution so most Politicians are moderate but some are radical, maybe chage later
      var politician = new Politician(-1*Math.pow(getRandomArbitrary(-1, 1),3), 'House', '', name);
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

      <main>
        <p>it works</p>
      </main>
    </>
  );
}

