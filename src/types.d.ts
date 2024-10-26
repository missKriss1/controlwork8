export interface IAddQuote {
  author: string;
  text: string;
  category: string;
}

export interface IQuote {
  id: string;
  author: string;
  text: string;
  category: string;
}

export interface ICategory {
  category: string;
  id: string;
}

export interface IQuoteAPI {
  [key: string]: IQuote;
}
