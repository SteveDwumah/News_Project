function fetchNews(query, from, to, sortBy, language) {

    const apiKey = 'e6eb7fe4b580498bad7db83f5b390fb0';
  
    const url = `https://newsapi.org/v2/everything?q=${query}&from=${from}&to=${to}&sortBy=${sortBy}&language=${language}&apiKey=${apiKey}`;
  
    const req = new Request(url);
  
    fetch(req)
      .then(function(response) {

        if (!response.ok) {
          throw new Error('Netzwerk-Antwort war nicht okay');
        }
        return response.json();
      })
      .then(function(data) {
        console.log(data);
      })
      .catch(function(error) {
        console.error('Es gab ein Problem mit der Fetch-Operation:', error);
      });
  }
  fetchNews('Apple', '2024-09-05', "2024-09-07", 'popularity', 'jp');