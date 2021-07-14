import { configureStore } from '@reduxjs/toolkit';
import bookSearchReducer from '../features/bookSearch/BookSearchSlice';

export const store = configureStore({
  reducer: {
    bookSearch: bookSearchReducer,
  },
});
