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

function BooksList(props)
{
    return <div id="books-area">
                { props.books.map((book, index) => (
                <div className="book" key={index} onClick={() => props.onBookClick(index)}>
                    <Book book={book}/>
                </div>)) }
            </div>
}

function FoundBooks()
{
    const dispatch = useDispatch();
    const books = useSelector(selectBooks);
    let searchParams = {
        query: useSelector(selectInputValue),
        subject: useSelector(selectSubject),
        order: useSelector(selectOrder),
        startIndex: useSelector(selectStartIndex),
    }
    const resultsCount = useSelector(selectResultsCount);

    return (<div>
        <div>Found <span data-testid="results-num">{resultsCount}</span> results</div>
        <BooksList books={books} onBookClick={(index) => dispatch(setChosenBook(index))} />
        { (books.length > 0 && books.length !== resultsCount) ?
            <button className="load-more" onClick={() => {
                dispatch(fetchMoreBooks(searchParams));
                dispatch(setStartIndex(searchParams.startIndex + books.length))
            }}>Load more</button> : null }
    </div>);
}

function ChosenBook(props)
{
    const dispatch = useDispatch();

    return (<div id="extended-book">
                <button className="back-to-search-results-btn"
                    onClick={() => dispatch(setChosenBook(-1))}>
                    &lt;-back
                </button>
                <ExtendedBook book={props.book}/>
            </div>);
}

export function BookSearch() {
    const books = useSelector(selectBooks);
    const status = useSelector(selectStatus);
    const chosenBook = useSelector(selectChosenBook);

    return (<div>
        <BookSearchInput/>
        {chosenBook < 0 ? 
            <FoundBooks /> :
            <ChosenBook book={books[chosenBook]} />}
        {status === 'loading' ? <div data-testid="loading-text">Loading...</div> : null}
    </div>);
}