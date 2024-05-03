const { Committee, hor, senate } = require('./classesAndObjects.js')
const stuff=require('./page.js')
const {immagration,abbortion,LGBTQPLUSRights,gunRights}=require('./IssuesAndClauses.js')

createCongress()
console.warn('these are only some of the committies')
console.warn('remember that these commties do a lot more then the one funcction assigned here')

//house commitites
var HomelandSecurity=new Committee("Homeland Security committee",[],null,immagration,hor,[])
var energeyAndCommerce=new Committee('Energey an Commerce Committie',[],null,abbortion,hor,[])
var justice=new Committee('Justice Committie',[],null,LGBTQPLUSRights,hor,[])
var waysAndMeans=new Committee("Was and Means Committee",[],null,gunRights,hor,[])

//senate committies
console.warn('just fix all the senate commties, delte the all and redo it beacuse issues are going to the wrong commtties')
//HSAGA=Homeland security and goverment affairs
var HSAGA=new Committee('Homeland Security and Goverment Affairs',[],null,immagration,senate,[])
console. Warn('this should go to judicary also but gameplay dicates one issue per commttie, fix later',[])
var armedServices=new Committee('Armed services',[],null,abbortion,senate,[])
var judicary=new Committee('Senate Judicary committie',[],null,LGBTQPLUSRights,senate,[])
var finance=new Committee('Fincace committie',[],null,gunRights,senate,[])
