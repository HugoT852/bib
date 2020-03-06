const axios = require('axios');
const cheerio = require('cheerio');

/**
 * Parse webpage restaurant
 * @param  {String} data - html response
 * @return {Object} restaurant
 */
const parse = data => {
  const $ = cheerio.load(data);
  const name = $('.section-main h2.restaurant-details__heading--title').text();
  const experience = $('#experience-section > ul > li:nth-child(2)').text();
  const links =[];
  
  //find the nb of restaurants
  var NbOfrestaurant = $('body > main > section.section-main.search-results.search-listing-result > div > div > div.search-results__count > div.d-flex.align-items-end.search-results__status > div.flex-fill > h1').text();
  for (let i = 0; i < NbOfrestaurant.length-3; i++){
    if (NbOfrestaurant[i]== 's' && NbOfrestaurant[i+1]== 'u' && NbOfrestaurant[i+2]== 'r' ){
      var k=i+4
      var nbres =NbOfrestaurant[k]
      while (NbOfrestaurant[k]!=' '){
        k++;
      }
      
      for (let j = i+5; j < k; j++){nbres += NbOfrestaurant[j]}
      
      NbOfrestaurant=nbres;
    }
  }
  
  
  $('a.link').each( function() {
    var link = $(this).attr('href');
    links.push({"link" : link})
  });
  //const price = $('a.link').attr('href');
  return {name, experience, links, NbOfrestaurant};
};

const parse2 = data => {
  /*
  //json
  var megajson = 
  */

  const $ = cheerio.load(data);
  const name  =$('body > main > div.restaurant-details > div.container > div > div.col-xl-4.order-xl-8.col-lg-5.order-lg-7.restaurant-details__aside > div.restaurant-details__heading.d-lg-none > h2').text();
  const tel = $('body > main > div.restaurant-details > div.container > div > div.col-xl-8.col-lg-7 > section:nth-child(4) > div.row > div:nth-child(1) > div > div:nth-child(1) > div > div > a').attr('href');
  const adress = $('body > main > div.restaurant-details > div.container > div > div.col-xl-4.order-xl-8.col-lg-5.order-lg-7.restaurant-details__aside > div.restaurant-details__heading.d-lg-none > ul > li:nth-child(1)').text();
  var prix = $('body > main > div.restaurant-details > div.container > div > div.col-xl-4.order-xl-8.col-lg-5.order-lg-7.restaurant-details__aside > div.restaurant-details__heading.d-lg-none > ul > li.restaurant-details__heading-price').text();
  const avis = $('#experience-section > ul > li:nth-child(2)').text();

  prix = prix.replace(/[^\d.-]/g, '');
  return {name,prix,tel,adress,avis};
};

/**
 * Scrape a given restaurant url
 * @param  {String}  url
 * @return {Object} restaurant
 */
module.exports.scrapeRestaurant = async url => {
  const response = await axios(url);
  const {data, status} = response;

  if (status >= 200 && status < 300) {
    return parse(data);
  }

  console.error(status);

  return null;
};

/**
 * Scrape a given restaurant url
 * @param  {String}  url
 * @return {Object} restaurant
 */
module.exports.scrapeRestaurantsingle = async url => {
  const response = await axios(url);
  const {data, status} = response;

  if (status >= 200 && status < 300) {
    return parse2(data);
  }

  console.error(status);

  return null;
};


/**
 * Get all France located Bib Gourmand restaurants
 * @return {Array} restaurants
 */
module.exports.get = () => {
  return [];
};
