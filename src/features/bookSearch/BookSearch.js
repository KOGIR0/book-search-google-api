import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    fetchBooks,
    selectBooks,
  } from './BookSearchSlice';

export function BookSearch() {
    let inputValue = "";
    let saveInput = (e) => {
        inputValue = e.target.value.split(' ').join('+');
    }

    let handleKeyPress = (target) =>
    {
        if(target.charCode === 13)
        {
            dispatch(fetchBooks("https://www.googleapis.com/books/v1/volumes?q=" + inputValue + "&maxResults=40&startIndex=0&key=AIzaSyD4FoBuK8DU7An_yYeCpI4tYOxOXlxSfb4"));
        }
    }
    const dispatch = useDispatch();
    const books = useSelector(selectBooks);
    console.log(books);

    return (<div>
        <input onChange={saveInput} onKeyPress={handleKeyPress}></input>
        <button onClick={() => dispatch(fetchBooks("https://www.googleapis.com/books/v1/volumes?q=" + inputValue + "&maxResults=40&startIndex=0&key=AIzaSyD4FoBuK8DU7An_yYeCpI4tYOxOXlxSfb4"))}>Search</button>
    </div>);
}