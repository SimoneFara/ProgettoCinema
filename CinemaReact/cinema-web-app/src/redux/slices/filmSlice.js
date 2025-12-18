import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/cinema'; 

// === 1. THUNK PER LA HOME (NON esportato qui) ===
const fetchFilmHome = createAsyncThunk(
  'film/fetchFilmHome', 
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/home/film`);
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// === 2. THUNK PER IL DETTAGLIO (NON esportato qui) ===
const fetchFilmDetail = createAsyncThunk(
  'film/fetchFilmDetail', 
  async (filmId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/trame/${filmId}`);
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// === 3. SLICE: Stato Iniziale e Riduttori ===
const initialState = {
  filmHome: [],    
  status: 'idle',  
  error: null,     
  currentFilm: null, 
  detailStatus: 'idle',
  detailError: null,
};

const filmSlice = createSlice({
  name: 'film',
  initialState,
  reducers: {
    resetDetailStatus: (state) => {
      state.currentFilm = null;
      state.detailStatus = 'idle';
      state.detailError = null;
    }
  },
  
  extraReducers: (builder) => {
    builder
      // HOME:
      .addCase(fetchFilmHome.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchFilmHome.fulfilled, (state, action) => { state.status = 'succeeded'; state.filmHome = action.payload; })
      .addCase(fetchFilmHome.rejected, (state, action) => { state.status = 'failed'; state.error = action.payload || 'Errore sconosciuto'; })
      
      // DETTAGLIO:
      .addCase(fetchFilmDetail.pending, (state) => {
        state.detailStatus = 'loading'; 
        state.currentFilm = null;
      })
      .addCase(fetchFilmDetail.fulfilled, (state, action) => {
        state.detailStatus = 'succeeded'; 
        state.currentFilm = action.payload; 
      })
      .addCase(fetchFilmDetail.rejected, (state, action) => {
        state.detailStatus = 'failed'; 
        state.detailError = action.payload || 'Film non trovato o errore di connessione'; 
      });
  },
});

// Esportiamo anche il nuovo Action Creator e i due Thunk
export const { resetDetailStatus } = filmSlice.actions;

// === UNICA ESPORTAZIONE DEI THUNK: Questo è l'unico 'export' per fetchFilmHome e fetchFilmDetail ===
export { fetchFilmHome, fetchFilmDetail };

export default filmSlice.reducer;