import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// URL di base per il tuo Backend Spring Boot
const API_URL = 'http://localhost:8080/api/cinema';

// =================================================================
// 1. THUNK (Azione Asincrona) per il Calendario
// Prende il 'periodo' (es. SETTIMANA_CORRENTE) e chiama l'endpoint filtrato.
// Se 'periodo' è nullo, chiama l'endpoint /calendario (che ritorna tutto, vedi Controller).
// =================================================================
export const fetchCalendarFilms = createAsyncThunk(
  'calendar/fetchCalendarFilms',
  async (periodo = '') => {
    // Se 'periodo' è una stringa vuota, l'URL sarà /calendario (fallback).
    // Altrimenti, sarà /calendario/SETTIMANA_CORRENTE, ecc.
    const endpoint = periodo ? `/calendario/${periodo}` : '/calendario';
    const response = await axios.get(`${API_URL}${endpoint}`);
    return response.data;
  }
);


// =================================================================
// 2. SLICE (Definizione dello Stato e dei Reducers)
// =================================================================
const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    films: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    // Memorizza l'ultimo filtro selezionato (utile per evidenziare il pulsante)
    activeFilter: 'TUTTI', // Inizializzato a 'TUTTI' (il fallback)
  },
  reducers: {
    // Azione per cambiare lo stato del filtro ATTIVO
    setFilter(state, action) {
        state.activeFilter = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // ====================================
      // Gestione di fetchCalendarFilms
      // ====================================
      .addCase(fetchCalendarFilms.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCalendarFilms.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.films = action.payload; // Carica i film filtrati
      })
      .addCase(fetchCalendarFilms.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.films = []; // Pulisci la lista in caso di errore
        console.error("Errore fetchCalendarFilms:", action.error);
      });
  },
});

export const { setFilter } = calendarSlice.actions;

export default calendarSlice.reducer;