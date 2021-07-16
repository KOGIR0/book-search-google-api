import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectBooks,
    selectResultsCount,
    selectInputValue,
    selectSubject,
    selectOrder,
    selectStartIndex,
    setStartIndex,
    fetchMoreBooks,
    selectStatus,
    selectChosenBook,
    setChosenBook
  } from './BookSearchSlice';
import './BookSearch.css';
import { BookSearchInput } from './BookSearchInput';
import { Book, ExtendedBook } from './Book';

export function BookSearch() {
    const dispatch = useDispatch();
    const resultsCount = useSelector(selectResultsCount);
    const books = useSelector(selectBooks);
    const status = useSelector(selectStatus);
    const startIndex = useSelector(selectStartIndex);
    const chosenBook = useSelector(selectChosenBook);
    let searchParams = {
        query: useSelector(selectInputValue),
        subject: useSelector(selectSubject),
        order: useSelector(selectOrder),
        startIndex: startIndex,
    }

    let booksAreaContent = null;
    if(chosenBook >= 0)
    {
        // if we have chosen any book show extended version of this book
        booksAreaContent = (<div id="extended-book">
                                <button className="back-to-search-results-btn" onClick={() => dispatch(setChosenBook(-1))}>
                                    &lt;-back
                                </button>
                                <ExtendedBook book={books[chosenBook]}/>
                            </div>);
    } else {
        // if no book is chosen show all books
        booksAreaContent = <div>
                                <div id="books-area">
                                    { books.map((book, index) => (
                                    <div className="book" key={index} onClick={() => dispatch(setChosenBook(index))}>
                                        <Book book={book}/>
                                    </div>)) }
                                </div>
                                { (books.length > 0 && books.length != resultsCount) ? 
                                <button className="load-more" onClick={() => {
                                    dispatch(fetchMoreBooks(searchParams));
                                    dispatch(setStartIndex(startIndex + books.length))
                                }}>Load more</button> : null }
                            </div>
    }

    return (<div>
        <BookSearchInput/>
        {chosenBook < 0 ? <div>Found <span data-testid="results-num">{resultsCount}</span> results</div> : null}
        {status === 'loading' ? <div data-testid="loading-text">Loading...</div> : booksAreaContent}
    </div>);
}