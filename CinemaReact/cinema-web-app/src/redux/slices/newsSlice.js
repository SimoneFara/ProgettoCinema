import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';// strumento per fare chiamate web (axios)

// 1. L'URL del  backend Spring Boot per le News
const API_NEWS_URL = 'http://localhost:8080/api/cinema/news'; 
//indirizzo esatto di NewsController che ha @RequestMapping("/api/cinema")
// e @GetMapping("/news")

// 2. Il "Postino" (Thunk): Va a prendere le news dal server(Spring)
export const fetchNews = createAsyncThunk(     //creo il"corriere"(fetchNews)

  'news/fetchNews', // Nome interno dell'azione
  async (_, { rejectWithValue }) => {
  
   try {
      // Fa la chiamata GET a Spring Boot(con axios)
      const response = await axios.get(API_NEWS_URL);
      // Restituisce i dati (dalla lista delle news in formato json)
      return response.data; 
    } catch (error) {
      // Se c'è un errore, lo cattura e lo restituisce
      return rejectWithValue(error.message);
    }
  }
);

// 3. Lo Stato Iniziale: Come appare la memoria all'inizio
const initialState = {
  newsList: [],    // All'inizio la lista è vuota (è un array vuoto)
  status: 'idle',  // idle = "a riposo" (non sta caricando nulla)
  error: null,     // Nessun errore iniziale
};

// 4. Lo Slice: Il gestore che aggiorna lo stato(seguendo i miei esempi il magazziniere)
const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {}, // Non ci servono azioni manuali per ora
  
  // Gestisce le risposte del "Postino" (fetchNews)
  extraReducers: (builder) => {
    builder
      // QUANDO LA CHIAMATA PARTE (Loading)
      .addCase(fetchNews.pending, (state) => {
        state.status = 'loading'; // Imposta lo stato su "caricamento"
      })
      // QUANDO LA CHIAMATA HA SUCCESSO (Success)
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.status = 'succeeded'; // Successo!
        state.newsList = action.payload; // Riempie la lista con i dati arrivati da Spring Boot
      })
      // QUANDO LA CHIAMATA FALLISCE (Error)
      .addCase(fetchNews.rejected, (state, action) => {
        state.status = 'failed'; // Fallito
        state.error = action.payload; // Salva il messaggio di errore
      });
  },
});

// 5. Esportiamo il "Reducer" per collegarlo allo Store (il cervello)
export default newsSlice.reducer;