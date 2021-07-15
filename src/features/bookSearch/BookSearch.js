import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    fetchBooks,
    selectBooks,
    selectResultsCount,
    setInputValue,
    selectInputValue,
    setSubject,
    selectSubject,
    setOrder,
    selectOrder,
    selectStartIndex,
    setStartIndex,
    fetchMoreBooks
  } from './BookSearchSlice';
import './BookSearch.css';


function ExtendedBook(props)
{
    let book = props.book;
    return (<div>
        <img src={book.imageLinks.thumbnail} alt="Here should be book"/>
        <div className="book-categories">{book.categories ? book.categories.join(',') : null}</div>
        <div className="book-title"><strong>{book.title}</strong></div>
        <div className="book-authors">{book.authors ? book.authors.join(',') : null}</div>
        <div className="book-description">{book.description}</div>
    </div>);
}

function Book(props)
{
    let book = props.book;
    return (<div>
        <img src={book.imageLinks ? book.imageLinks.thumbnail : null} alt="Here should be book"/>
        <div className="book-categories">{book.categories ? book.categories[0] : null}</div>
        <div className="book-title"><strong>{book.title}</strong></div>
        <div className="book-authors">{book.authors ? book.authors.join(',') : null}</div>
    </div>);
}

export function BookSearch() {
    const dispatch = useDispatch();
    const resultsCount = useSelector(selectResultsCount);
    const books = useSelector(selectBooks);
    const startIndex = useSelector(selectStartIndex);

    let [chosenBook, setChosenBook] = useState(-1);

    let searchParams = {
        query: useSelector(selectInputValue),
        subject: useSelector(selectSubject),
        order: useSelector(selectOrder),
        startIndex: startIndex,
    }

    let handleKeyPress = (target) =>
    {
        if(target.charCode === 13)
        {
            dispatch(fetchBooks(searchParams));
        }
    }

    let booksAreaContent = null;
    if(chosenBook >= 0)
    {
        booksAreaContent = (<div id="books-area">
                                <button onClick={() => setChosenBook(-1)}>
                                    back
                                </button>
                                <ExtendedBook book={books[chosenBook]}/>
                            </div>);
    } else {
        booksAreaContent = <div>
                                <div id="books-area">
                                    { books.map((book, index) => (
                                    <div className="book" key={index} onClick={() => setChosenBook(index)}>
                                        <Book book={book}/>
                                    </div>)) }
                                </div>
                                <button className="load-more" onClick={() => {
                                    dispatch(fetchMoreBooks(searchParams));
                                    dispatch(setStartIndex(startIndex + books.length))
                                }}>Load more</button>
                            </div>
    }

    return (<div>
        <input onChange={(e) =>  dispatch(setInputValue(e.target.value.split(' ').join('+')))} onKeyPress={handleKeyPress}></input>
        <button onClick={() => dispatch(fetchBooks(searchParams))}>Search</button>
        <div id="search-options">
            <select name="Subject" id="subject" onChange={(e) => dispatch(setSubject(e.target.value))}>
                <option name="All" value="">all</option>
                <option name="Art">art</option>
                <option name="Biography">biography</option>
                <option name="Computers">computers</option>
                <option name="History">history</option>
                <option name="Medical">medical</option>
                <option name="Poetry">poetry</option>
            </select>
            <select name="Order" id="order" onChange={(e) => dispatch(setOrder(e.target.value))}>
                <option name="relevance">relevance</option>
                <option name="newest">newest</option>
            </select>
        </div>
        <div>Found {resultsCount} results</div>
        {booksAreaContent}
    </div>);
}