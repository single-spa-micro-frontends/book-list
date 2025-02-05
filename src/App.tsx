import { useEffect, useState } from "react";
import { fetchBooks } from "./api/api";
import BookItem from "./components/BookItem";
import { Book, EnrichedWindow } from "./types";

const App = () => {
  const [searchText, setSearchText] = useState("");

  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const getBooksFromGoogleApi = async (query: string) => {
    try {
      setIsLoading(true);
      const data = await fetchBooks(query);
      setBooks(data);
    } catch (err) {
      setError("Failed to fetch books");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const searchTextSub = (
      window as unknown as EnrichedWindow
    ).eventBus.searchState$.subscribe((state: { query: string }) => {
      setSearchText(state.query);
    });

    return () => searchTextSub.unsubscribe();
  }, []);

  useEffect(() => {
    void getBooksFromGoogleApi(searchText);
  }, [searchText]);

  const showSingleBook = (id: string) => {
    console.log("selected book id", id);
    (window as unknown as EnrichedWindow).eventBus.setSelectedBook(id);
  };

  const addSingleBookToCart = (book: Book) => {
    const data = {
      title: book.volumeInfo.title,
      image: book.volumeInfo.imageLinks?.thumbnail,
      bookId: book.id,
      quantity: 1,
    };
    (window as unknown as EnrichedWindow).eventBus.addToCart(data);
  };

  return (
    <div className="flex w-full overflow-hidden h-full items-center justify-center">
      {isLoading ? (
        <p className="text-center text-lg">Loading books...</p>
      ) : error ? (
        <p className="text-center text-lg text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 p-4 w-4/5">
          {books.map((book) => (
            <BookItem
              key={book.id}
              book={book}
              onShowSingleBook={() => showSingleBook(book.id)}
              handleAddToCart={(book) => {
                addSingleBookToCart(book);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
