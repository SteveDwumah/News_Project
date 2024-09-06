function searchArticle(query, from, to, sortBy, language) {

  const apiKey = 'e6eb7fe4b580498bad7db83f5b390fb0';

  const url = `https://newsapi.org/v2/everything?q=${query}&from=${from}&to=${to}&sortBy=${sortBy}&language=${language}&apiKey=${apiKey}`;

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

function displayArticle(data: any) {
  const contentOutput = document.getElementById('contentOutput');
  if (contentOutput) {
    contentOutput.innerHTML = data.articles.map((article: any) => `
      <div>
        <h2>${article.title}</h2>
        <p>${article.description}</p>
        <a href="${article.url}" target="_blank">Weiterlesen</a>
      </div>
    `).join('');
  }
}

searchArticle('Apple', '2024-09-05', "2024-09-07", 'popularity', 'jp');

document.getElementById('searchBtn')?.addEventListener('click', function() {
  const searchInput = (document.getElementById('searchInput') as HTMLInputElement).value;
  const relevanzSelect = (document.getElementById('relevanz') as HTMLSelectElement).value;
  const languageSelect = (document.getElementById('languague') as HTMLSelectElement).value;
  
  searchArticle(searchInput, '2024-09-05', "2024-09-07", relevanzSelect, languageSelect);
});