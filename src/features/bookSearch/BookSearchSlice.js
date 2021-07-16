import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  books: [],
  resultsCount: 0,
  status: "idle",
  inputValue: '',
  subject: '',
  order: 'relevance',
  startIndex: 0,
  chosenBook: -1
};

export const fetchBooks = createAsyncThunk(
  'bookSearch/fetchBooks',
  async (searchParams) => {
    let url = "https://www.googleapis.com/books/v1/volumes?q=" + searchParams.query + 
            "+subject:" + searchParams.subject + "&orderBy=" + searchParams.order + 
            "&maxResults=30&startIndex=0&key=" + process.env.REACT_APP_API_KEY;
    const response = fetch(url).then((res) => res.json());
    
    return response;
  }
);

export const fetchMoreBooks = createAsyncThunk(
  'bookSearch/fetchMoreBooks',
  async (searchParams) => {
    let url = "https://www.googleapis.com/books/v1/volumes?q=" + searchParams.query + 
        "+subject:" + searchParams.subject + "&orderBy=" + searchParams.order + 
        "&maxResults=30&startIndex=" + searchParams.startIndex + 
        "&key=" + process.env.REACT_APP_API_KEY;
    const response = fetch(url).then((res) => res.json());
    
    return response;
  }
)

export const bookSearchSlice = createSlice({
  name: 'bookSearch',
  initialState,
  reducers: {
    setStartIndex: (state, action) => {
      state.startIndex = action.payload;
    },
    setOrder: (state, action) => {
      state.order = action.payload;
    },
    setSubject: (state, action) => {
      state.subject = action.payload;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    setInputValue: (state, action) => {
      state.inputValue = action.payload;
    },
    setChosenBook: (state, action) => {
      state.chosenBook = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = 'idle';
        state.books = [];
        if(action.payload.items)
        {
          state.books = action.payload.items.map(item => {
            return {
              imageLinks: item.volumeInfo.imageLinks,
              title: item.volumeInfo.title,
              categories: item.volumeInfo.categories,
              authors: item.volumeInfo.authors,
              description: item.volumeInfo.description
            }
          });
        }
        state.startIndex = state.books.length;
        state.resultsCount = action.payload.totalItems;
      })
      .addCase(fetchMoreBooks.fulfilled, (state, action) => {
        state.status = 'idle';
        if(action.payload.items)
        {
          state.books = [...state.books, ...action.payload.items.map(item => {
            return {
              imageLinks: item.volumeInfo.imageLinks,
              title: item.volumeInfo.title,
              categories: item.volumeInfo.categories,
              authors: item.volumeInfo.authors,
              description: item.volumeInfo.description
            }
          })];
        }
        state.startIndex = state.books.length;
        state.resultsCount = action.payload.totalItems;
      });
  },
});

export const { setInputValue, setSubject, setOrder, setStartIndex, setChosenBook } = bookSearchSlice.actions;

export const selectBooks = (state) => state.bookSearch.books;
export const selectResultsCount = (state) => state.bookSearch.resultsCount;
export const selectInputValue = (state) => state.bookSearch.inputValue;
export const selectSubject = (state) => state.bookSearch.subject;
export const selectOrder = (state) => state.bookSearch.order;
export const selectStartIndex = (state) => state.bookSearch.startIndex;
export const selectStatus = (state) => state.bookSearch.status;
export const selectChosenBook = (state) => state.bookSearch.chosenBook;

export default bookSearchSlice.reducer;
