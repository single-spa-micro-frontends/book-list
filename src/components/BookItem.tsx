import { Book } from "../types";
import Button from "./Button";

interface BookItemProps {
  book: Book;
  onShowSingleBook: (id: string) => void;
  handleAddToCart: (book: Book) => void;
}

const BookItem = ({
  book,
  onShowSingleBook,
  handleAddToCart,
}: BookItemProps) => {
  const addToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    handleAddToCart(book);
  };

  const showSingleBook = () => {
    onShowSingleBook(book.id);
  };

  return (
    <button
      className="bg-white shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
      onClick={showSingleBook}
      onKeyDown={(e) => e.key === "Enter" && showSingleBook()}
      aria-label={`Show details for ${book.volumeInfo.title}`}
    >
      <div className="relative">
        <img
          className="w-full h-72 object-cover"
          src={book.volumeInfo.imageLinks?.thumbnail || ""}
          alt={book.volumeInfo.title}
        />
      </div>

      {/* Book Details */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {book.volumeInfo.title}
        </h3>
        <p className="text-sm text-gray-600 max-w-[70%] truncate">
          {book.volumeInfo.authors?.join(", ")}
        </p>
        <p className="text-lg font-bold text-gray-900">
          ${(book.saleInfo?.listPrice?.amount || 10).toFixed(2)}
        </p>
      </div>

      {/* Add to Cart Button */}
      <div className="flex justify-center items-center p-4">
        <Button onClick={addToCart} variant={"primary"}>
          Add to Cart
        </Button>
      </div>
    </button>
  );
};

export default BookItem;
