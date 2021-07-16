import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    fetchBooks,
    setInputValue,
    selectInputValue,
    setSubject,
    selectSubject,
    setOrder,
    selectOrder,
    selectStartIndex,
    setChosenBook
  } from './BookSearchSlice';
import './BookSearchInput.css';

export function BookSearchInput()
{
    const dispatch = useDispatch();
    const startIndex = useSelector(selectStartIndex);
    let searchParams = {
        query: useSelector(selectInputValue),
        subject: useSelector(selectSubject),
        order: useSelector(selectOrder),
        startIndex: startIndex,
    }

    function search()
    {
        dispatch(fetchBooks(searchParams));
        dispatch(setChosenBook(-1));
    }

    let handleKeyPress = (target) =>
    {
        if(target.charCode === 13)
        {
            search();
        }
    }

    return (<div id="book-search-input">
        <h1>Search for books</h1>
        <input onChange={(e) =>  dispatch(setInputValue(e.target.value.split(' ').join('+')))}
            onKeyPress={handleKeyPress} data-testid="search-input">
        </input>
        <button onClick={() => search()} data-testid="search-btn">search</button>
        <div id="search-options">
            <span>
                <label>Categories: </label>
                <select name="Subject" id="subject" onChange={(e) => dispatch(setSubject(e.target.value))}>
                    <option name="All" value="">all</option>
                    <option name="Art">art</option>
                    <option name="Biography">biography</option>
                    <option name="Computers">computers</option>
                    <option name="History">history</option>
                    <option name="Medical">medical</option>
                    <option name="Poetry">poetry</option>
                </select>
            </span>
            <span>
                <label>Sorting by: </label>
                <select name="Order" id="order" onChange={(e) => dispatch(setOrder(e.target.value))}>
                    <option name="relevance">relevance</option>
                    <option name="newest">newest</option>
                </select>
            </span>
        </div>
    </div>)
}