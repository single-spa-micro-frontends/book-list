export type Book = {
    id: string;
    volumeInfo: {
      title: string;
      authors: string[];
      publisher?: string;
      publishedDate?: string;
      description?: string;
      pageCount?: number;
      categories?: string[];
      imageLinks?: {
        smallThumbnail?: string;
        thumbnail?: string;
      };
      language?: string;
    };
    saleInfo: {
      listPrice:{
        amount: number
      }
    }
  }

export type BookPayload = {
    bookId: string;
    title: string;
    image: string | undefined;
    quantity: number;
    [key: string]: any; 
}

type EventBus = {
  addToCart:(book: BookPayload) => void
  setSelectedBook:(id:string) => void
  searchState$: {
    subscribe: (callback: (state: { query: string }) => void) => { unsubscribe: () => void };
  };
}


export type EnrichedWindow = Window & {eventBus : EventBus}