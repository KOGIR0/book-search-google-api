export function ExtendedBook(props)
{
    let book = props.book;
    return (<div className="extended-book">
        <div className="book-cover">
            <img src={book.imageLinks ? book.imageLinks.thumbnail : null} alt="Here should be book cover"/>
        </div>
        <div className="book-info">
            <div className="book-categories">{book.categories ? book.categories.join(',') : null}</div>
            <div className="book-title"><strong>{book.title}</strong></div>
            <div className="book-authors">{book.authors ? book.authors.join(',') : null}</div>
            <div className="book-description">{book.description}</div>
        </div>
    </div>);
}

export function Book(props)
{
    let book = props.book;
    return (<div data-testid="book-item">
        <img src={book.imageLinks ? book.imageLinks.thumbnail : null} alt="Here should be book cover"/>
        <div className="book-categories">{book.categories ? book.categories[0] : null}</div>
        <div className="book-title"><strong>{book.title}</strong></div>
        <div className="book-authors">{book.authors ? book.authors.join(',') : null}</div>
    </div>);
}