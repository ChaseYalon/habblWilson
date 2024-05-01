const { Committee, hor } = require('./classesAndObjects.js')
const stuff=require('./page.js')
const {immagration,abbortion,LGBTQPLUSRights}=require('./IssuesAndClauses.js')

createCongress()
//these are only some of the committies

var aggriculture=new Committee("Aggriculture commtie",[],null,'aggriculture',hor)
var Appropriations=new Committee("Appropriations committee",[],null,'budget',hor)
var HomelandSecurity=new Committee("Homeland Security committee",[],null,immagration,hor)
// not real committie(s)
console.warn('hey chase, fix your f***** committies some of them are not F***** real. Also get someone to do the graphic design.')
var abbortionCommittie=new Committee('Abbortion committie',[],null,abbortion,hor)

