export interface IEmpty {
    status:       string;
    totalResults: number;
    articles:     IArticle[];
}

export interface IArticle {
    source:      ISource;
    author:      null | string;
    title:       null | string;
    description: string;
    url:         string;
    urlToImage:  null | string;
    publishedAt: Date;
    content:     string;
}

export interface ISource {
    id:   null | string;
    name: string;
}