import { IArticle, IEmpty, ISource } from "./interface/IArticles";

const searchInput = document.getElementById("search-input") as HTMLInputElement
const searchRelevanz = document.getElementById("relevanz")  as HTMLSelectElement
const searchLanguague = document.getElementById("languague") as HTMLSelectElement
const searchButton = document.getElementById("searchBtn") as HTMLButtonElement
const contentOutputDiv = document.getElementById("contentOutput") as HTMLDivElement

const url = "https://newsapi.org/v2/top-headlines?country=us&apiKey=e6eb7fe4b580498bad7db83f5b390fb0"
const API = "e6eb7fe4b580498bad7db83f5b390fb0"
const country = ['ar', 'de', 'us', 'sp', 'fr', 'hr', 'it', 'nl', 'nw', 'pt', 'ru', 'sw', 'ch'];
let articleArray: IArticle[] = [];

// fetch(url)
//   .then((resp: Response) => {
//     if (resp.ok) {
//       return resp.json();
//     } else {
//       throw Error();
//     }
//   })
//   .then((results: IEmpty) => {
//     console.log(results);
//     return results.articles;
//   })
//   .then((result: IArticle[]) => {
//     console.log(result);
//     displayArticles(result)
    
//   })
//   .catch((error) => {
//     contentOutputDiv.innerHTML = `Could not get data, Error: ${error}`;
//   });

if(contentOutputDiv){
  fetch(url)
  .then((response: Response) => {
      if(response.ok){
          return response.json()
      } else{
          throw Error(`${response.status} ${response.statusText}`)
      }
  })
  .then((results: IEmpty) => {
         console.log(results);
         
         return results.articles;
       })
  .then((result: IArticle[]) => {
      console.log(result);
      articleArray = result
      displayArticles(articleArray)
  })
  .catch((error) => {
      contentOutputDiv.innerHTML = `Could not get data, Error: ${error}`
  })
  
}




function displayArticles(article: IArticle) {
      if(contentOutputDiv){
        contentOutputDiv.appendChild(createParagraph(article.content))
        // contentOutputDiv.appendChild(createParagraph(article.author:))
        contentOutputDiv.appendChild(createImage(article.urlToImage))
      }
}

function createParagraph(value: string): HTMLParagraphElement {
  const paragraph = document.createElement("p") as HTMLParagraphElement;
  paragraph.textContent = `${value}`
  return paragraph
}

function createImage(linkImg: string): HTMLImageElement {
  const image = document.createElement("img") as HTMLImageElement;
  image.src = linkImg
  return image
}