'use strict';

function displayNews(responseJson) {
  console.log(responseJson);
  $('.results-news').empty();
  for (let i = 0; i < responseJson.length; i++){
    $('.results-news').append(
      `<p>${responseJson[i].headline}</p>
      <p>${responseJson[i].source}</p>
      <p>${responseJson[i].url}</p>
      <p>${responseJson[i].summary}</p> 
      <img src='${responseJson[i].image}'>`
    )};
}

function displayStatistics(responseJson) {
  console.log(responseJson);
  $('.results-statistics').empty();
  $('.results-statistics').append(`<p>High: ${responseJson.quote.high}</p><p>Low: ${responseJson.quote.low}</p><p>Open: ${responseJson.quote.open}</p><p>Close: ${responseJson.quote.close}</p><p>Change: ${responseJson.quote.change}</p><p>Change Percent: ${responseJson.quote.changePercent}</p><p>Volume: ${responseJson.quote.volume}</p><p>Previous Volume: ${responseJson.quote.previousVolume}</p><p>52 Week High: ${responseJson.quote.week52High}</p><p>52 Week Low: ${responseJson.quote.week52Low}</p>`);
}

function displayCompanyInfo(responseJson) {
  console.log(responseJson);
  $('.results-companyInfo').empty();
  $('.results-companyInfo').append(`<p>Ticker Symbol: ${responseJson.symbol}</p><p>Company Name: ${responseJson.companyName}</p><p>CEO: ${responseJson.CEO}</p><p>Sector: ${responseJson.sector}</p><p>Description: ${responseJson.description}</p>`);
}

function displaySectorPerformance(responseJson) {
  let entries = Object.entries(responseJson['Rank F: Year-to-Date (YTD) Performance']);
  console.log(responseJson);
  $('.results-sectPerformance').empty();
  for (let i = 0; i < entries.length; i++){
    $('.results-sectPerformance').append(`<p>${entries[i][0]}: ${entries[i][1]}</p>`);
  };
}

function getNews(ticker) {
  let urlNews = `https://cloud.iexapis.com/v1/stock/${ticker}/news/last?token=pk_f129351ba976411a9a6c62e3560d510c`;
  console.log(urlNews);

  fetch(urlNews)
   .then(response => {
     if (response.ok) {
       return response.json();
     }
     throw new Error(response.statusText);
   })
   .then(responseJson => displayNews(responseJson))
   .catch(error => alert('Something went wrong'));
}

function getStatistics(ticker) {
  let urlStats = `https://cloud.iexapis.com/v1/stock/${ticker}/book?token=pk_f129351ba976411a9a6c62e3560d510c`;
  console.log(urlStats);

  fetch(urlStats)
   .then(response => {
     if (response.ok) {
       return response.json();
     }
     throw new Error(response.statusText);
   })
   .then(responseJson => displayStatistics(responseJson))
   .catch(error => alert('Something went wrong'));
}

function getCompany(ticker) {
  let urlCompany = `https://cloud.iexapis.com/v1/stock/${ticker}/company?token=pk_f129351ba976411a9a6c62e3560d510c`;
  console.log(urlCompany);

  fetch(urlCompany)
   .then(response => {
     if (response.ok) {
       return response.json();
     }
     throw new Error(response.statusText);
   })
   .then(responseJson => displayCompanyInfo(responseJson))
   .catch(error => alert('Something went wrong'));
}

function getSectorPerformance() {
    let urlSectorPerformance = 'https://www.alphavantage.co/query?function=SECTOR&apikey=apiKey_ALPHA';
    console.log(urlSectorPerformance);
  
    fetch(urlSectorPerformance)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(responseJson => displaySectorPerformance(responseJson))
      .catch(error => alert('Something went wrong'));
  }

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTicker = $('#js-search-ticker').val();
    getSectorPerformance();
    getCompany(searchTicker);
    getStatistics(searchTicker);
    getNews(searchTicker);
  });
}

$(watchForm);