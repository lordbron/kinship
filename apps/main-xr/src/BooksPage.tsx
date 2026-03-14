const AMAZON_BOOKS_URL = "https://www.amazon.com/s?k=monument+valley+book";

export default function BooksPage() {
  return (
    <div className="books-page-root">
      <div className="books-window" enable-xr>
        <div className="books-header">
          <div>
            <h2 className="books-title">Monument Valley Books</h2>
            <p className="books-subtitle">In-app browsing panel for the Amazon search results.</p>
          </div>
          <a
            className="books-open-link"
            href={AMAZON_BOOKS_URL}
            target="_blank"
            rel="noreferrer"
          >
            Open Amazon
          </a>
        </div>

        <div className="books-frame-shell" enable-xr-monitor>
          <iframe
            className="books-frame"
            src={AMAZON_BOOKS_URL}
            title="Amazon Monument Valley books"
          />
        </div>
      </div>
    </div>
  );
}
