/* eslint-disable no-console, no-process-exit */
const michelin = require('./michelin');
var fs = require('fs');

async function sandbox (searchLink = 'https://guide.michelin.com/fr/fr/restaurants/bib-gourmand/page/1') {
  try {
    console.log(`🕵️‍♀️  browsing ${searchLink} source`);

    //find the nb of pages
    const nbrest = await michelin.scrapeRestaurant(searchLink);
    const nbOfPages = Math.round(nbrest.NbOfrestaurant/20);
    
    //create and explore all the pages nbOfPages-13
    var listoflinks = [];
    var listoflinks2 = [];
    for (let i = 1; i <= 1; i++){
      const truc = 'https://guide.michelin.com/fr/fr/restaurants/bib-gourmand/page/' + i
      const restaurant = await michelin.scrapeRestaurant(truc);
      //restaurant.links.foreach(element =>sandbox22(element) );
      
      listoflinks = restaurant.links;
      listoflinks.forEach(element => listoflinks2.push( 'https://guide.michelin.com' + element.link));

    }
    /*
    console.log(listoflinks2)
    for (var i =0; i<listoflinks2.length;i++){
      await sandbox22(searchLink = listoflinks2[i]);
    }
*/
let data = "Learning how to write in a file.";
fs.writeFile('Output.txt', data, (err) => { 
      
  // In case of a error throw err. 
  if (err) throw err; 
}) 


    fs.writeFile('AllRestaurantsLinks.txt', data, function (err) {
      if (err) throw err;
      console.log('File is created successfully.');
    });

    console.log('done');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

//useless now
//return an array with the links for michelin
async function linksOfMichelin (searchLink = 'https://guide.michelin.com/fr/fr/restaurants/bib-gourmand/page/1') {
  try {
  console.log(`🕵️‍♀️  browsing ${searchLink} source`);

  const restaurant = await michelin.scrapeRestaurant(searchLink);
  const nbOfPages = Math.round(restaurant.NbOfrestaurant/20);

  var anarray = [];
  for (let i = 1; i <= nbOfPages+1; i++){
    const truc = 'https://guide.michelin.com/fr/fr/restaurants/bib-gourmand/page/' + i
    //console.log(truc)
    anarray.push(truc);
  }
  console.log(anarray)
  console.log('done');
  return anarray; 
} catch (e) {
  console.error(e);
  process.exit(1);
}
}
//= 'https://guide.michelin.com/fr/fr/occitanie/saint-savin/restaurant/les-3-faisans'
async function sandbox22 (searchLink) {
  try {
    console.log(`🕵️‍♀️  browsing ${searchLink} source`);

    //find the nb of pages
    const restaurant = await michelin.scrapeRestaurantsingle(searchLink);
    console.log('name')
    console.log(restaurant.name)
    console.log('prix')
    console.log(restaurant.prix)
    console.log('tel')
    console.log(restaurant.tel)
    console.log('adress')
    console.log(restaurant.adress)
    console.log('avis')
    console.log(restaurant.avis)
    /*
    var restinjson = JSON.stringify(restaurant, null, 2);
    fs.writeFile("restMichelin.json", restinjson);
    */
    console.log('done');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
  
}


const [,, searchLink] = process.argv;
sandbox(searchLink);
//sandbox22(searchLink);
//const listoflinks=linksOfMichelin(searchLink);


