const POWELLS_BOOKS_URL = "https://www.powells.com/books/search?query=MONUMENT+VALLEY&page=1";

export default function BooksPage() {
  return (
    <div className="books-page-root">
      <div className="books-window" enable-xr>
        <div className="books-header">
          <div>
            <h2 className="books-title">Monument Valley Books</h2>
            <p className="books-subtitle">In-app browsing panel for the book search results.</p>
          </div>
        </div>

        <div className="books-frame-shell" enable-xr-monitor>
          <iframe
            className="books-frame"
            src={POWELLS_BOOKS_URL}
            title="Powell's Monument Valley books"
          />
        </div>
      </div>
    </div>
  );
}
