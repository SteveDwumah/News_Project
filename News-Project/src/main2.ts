
import { IArticle, IEmpty } from "./interface/IArticles";

const searchInput = document.getElementById("search-input") as HTMLInputElement;
const searchRelevanz = document.getElementById("relevanz") as HTMLSelectElement;
const searchLanguague = document.getElementById("languague") as HTMLSelectElement;
const searchButton = document.getElementById("searchBtn") as HTMLButtonElement;
const contentOutputDiv = document.getElementById("contentOutput") as HTMLDivElement;

const url = "https://newsapi.org/v2/everything";
const API = "&apiKey=e6eb7fe4b580498bad7db83f5b390fb0";

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
      if (article.publishedAt){
        contentOutputDiv.appendChild(createParagraph(article.publishedAt))
      }
    });
  }
}
function createDate(value: Date): HTMLParagraphElement {
    const date = document.createElement("p") as HTMLParagraphElement;
    date.textContent = value.getTime;
    return date;
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

function sortAndDisplayArticles(articlesArray: IArticle[], sortValue: string) {
    let sortedArticles: IArticle[];
    if (sortValue === "NeuesteZuerst") {
        [...articlesArray].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    } else {
      sortedArticles = [...articlesArray].sort(
        (a, b) => a.title - b.title
      );
    }
    console.log(sortedArticles);
    displayArticles(sortedArticles);
  }

  searchRelevanz.addEventListener("change", () => {
    const sortValue = searchRelevanz.value;
    console.log(sortValue);
    sortAndDisplayArticles(articleArray, sortValue);
  });