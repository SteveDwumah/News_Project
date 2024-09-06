
import { IArticle, IEmpty } from "./interface/IArticles";

const searchInput = document.getElementById("search-input") as HTMLInputElement;
const searchRelevanz = document.getElementById("relevanz") as HTMLSelectElement;
const searchLanguague = document.getElementById("languague") as HTMLSelectElement;
const searchButton = document.getElementById("searchBtn") as HTMLButtonElement;
const contentOutputDiv = document.getElementById("contentOutput") as HTMLDivElement;

const url = "https://newsapi.org/v2/top-headlines?country=us&apiKey=e6eb7fe4b580498bad7db83f5b390fb0";
const API = "e6eb7fe4b580498bad7db83f5b390fb0";

let articleArray: IArticle[] = [];


if (contentOutputDiv) {
  fetch(url)
    .then((response: Response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`${response.status} ${response.statusText}`);
      }
    })
    .then((results: IEmpty) => {
      console.log(results);
      return results.articles;
    })
    .then((result: IArticle[]) => {
      console.log(result);
      articleArray = result;
      displayArticles(articleArray);
    })
    .catch((error) => {
      contentOutputDiv.innerHTML = `Could not get data, Error: ${error.message}`;
    });
}

function displayArticles(articles: IArticle[]) {
  if (contentOutputDiv) {
    contentOutputDiv.innerHTML = ''; 
    articles.forEach(article => {
      if (article.content) {
        contentOutputDiv.appendChild(createParagraph(article.content));
      }
      if (article.urlToImage) {
        contentOutputDiv.appendChild(createImage(article.urlToImage));
      }
    });
  }
}

function createParagraph(value: string): HTMLParagraphElement {
  const paragraph = document.createElement("p") as HTMLParagraphElement;
  paragraph.textContent = value;
  return paragraph;
}
function createImage(linkImg: string): HTMLImageElement {
    const image = document.createElement("img") as HTMLImageElement;
    image.src = linkImg;
    return image;
  }
  searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredProducts = articleArray.filter((article) =>
      article.title?.toLowerCase().includes(searchTerm)
    );
    displayArticles(filteredProducts);
  });
  function filterByCategory(content: string) {
    const filteredProducts = articleArray.filter(
      (article) => article.content === content
    );
    displayArticles(filteredProducts);
}
electroBtn.addEventListener("click", () => filterByCategory("electronics"));
searchButton.addEventListener("click", ())