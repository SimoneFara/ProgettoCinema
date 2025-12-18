import { configureStore } from '@reduxjs/toolkit';
import filmReducer from './slices/filmSlice'; 
import newsReducer from './slices/newsSlice';
import calendarReducer from './slices/calendarSlice'

export const store = configureStore({
  reducer: {
    // Definiamo un "cassetto" nello Store chiamato 'film e news'
    film: filmReducer,
    news: newsReducer,
   calendar: calendarReducer,
  },
});