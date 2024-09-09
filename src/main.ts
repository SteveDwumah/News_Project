function searchArticle(query, from, to, sortBy, language: string) {
  const apiKey = 'e6eb7fe4b580498bad7db83f5b390fb0';
  const url = `https://newsapi.org/v2/everything?q=${query}&from=${from}&to=${to}&sortBy=${sortBy}&language=${language}&apiKey=${apiKey}`;
  console.log(`API${url}`);
  const req = new Request(url);

  fetch(req)
    .then(function(response) {
      if (!response.ok) {
        throw new Error('error');
      }
      return response.json();
    })
    .then(function(data) {
      console.log(data);
      displayArticle(data);
    })
    .catch(function(error) {
      console.error('error aus catch:', error);
    });
}

function displayArticle(data) {
  const contentOutput = document.getElementById('contentOutput');
  if (contentOutput) {
    contentOutput.innerHTML = data.articles.map(article => `
      <div>
        <h2>${article.title}</h2>
        <p>${article.description}</p>
        <a href="${article.url}"</a>
      </div>
    `).join('');
  }
}


// searchArticle('apple', '2024-09-05', "2024-09-07", 'popularity', 'no');


document.getElementById('searchBtn')?.addEventListener('submit', function() {
  const searchInput = (document.getElementById('searchInput') as HTMLInputElement).value;
  const relevanzSelect = (document.getElementById('relevanz') as HTMLSelectElement).value;
  const languageSelect = (document.getElementById('language') as HTMLSelectElement).value;
  
  searchArticle(searchInput, '2024-09-05', "2024-09-07", relevanzSelect, languageSelect);
});


