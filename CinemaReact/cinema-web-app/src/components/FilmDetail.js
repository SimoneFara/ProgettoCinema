import React, { useEffect } from 'react';
// Importiamo gli strumenti per la navigazione (leggere ID dall'URL e Link per spostarsi)
import { useParams, Link } from 'react-router-dom';
// Importiamo gli strumenti per interagire con Redux (spedire azioni e leggere dati)
import { useDispatch, useSelector } from 'react-redux';
// Importiamo le azioni specifiche che abbiamo creato nel Slice: scaricare e pulire
import { fetchFilmDetail, resetDetailStatus } from '../redux/slices/filmSlice'; 

function FilmDetail() {
  // 1. RECUPERO DELL'ID
  // useParams legge il numero finale dell'URL (es. se sei su /film/5, id vale "5")
  const { id } = useParams(); 
  
  // 2. STRUMENTI REDUX
  const dispatch = useDispatch(); // Serve per "ordinare" a Redux di fare qualcosa
  
  // Leggiamo dallo Store i dati del film corrente e lo stato del caricamento
  const { currentFilm, detailStatus, detailError } = useSelector((state) => state.film); 

  // 3. EFFETTO AUTOMATICO (useEffect)
  // Questo codice parte appena si apre la pagina o appena cambia l'ID
  useEffect(() => {
    // A) PULIZIA: Resetta i dati precedenti per evitare di mostrare il film vecchio
    dispatch(resetDetailStatus());
    
    // B) SCARICAMENTO: Chiede al backend i dati del nuovo film usando l'ID
    dispatch(fetchFilmDetail(id)); 
  }, [id, dispatch]); // Le dipendenze assicurano che si riavvii se l'ID cambia

  // --- 4. GESTIONE GRAFICA DEGLI STATI ---
  
  // CASO A: CARICAMENTO IN CORSO
  // Se lo stato è "loading" o "idle", mostriamo una rotellina che gira
  if (detailStatus === 'loading' || detailStatus === 'idle') {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status"></div>
        <p>Caricamento dettagli...</p>
      </div>
    );
  }

  // CASO B: ERRORE
  // Se il backend risponde picche (es. connessione persa), mostriamo l'errore
  if (detailStatus === 'failed') {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">Errore nel caricamento: {detailError}</div>
        <Link to="/" className="btn btn-secondary">Torna alla Home</Link>
      </div>
    );
  }

  // CASO C: SUCCESSO (IL FILM ESISTE)
  if (currentFilm) {
    return (
      <div className="container mt-5">
        {/* row: Crea una riga della griglia
            align-items-center: Centra verticalmente il contenuto (utile se l'immagine è alta)
        */}
        <div className="row align-items-center"> 
          
          {/* --- COLONNA SINISTRA: IMMAGINE --- */}
          <div className="col-md-4 mb-4 text-center">
            <img 
              // Costruiamo l'URL completo dell'immagine puntando a Spring Boot (porta 8080)
              src={`http://localhost:8080${currentFilm.immagineUrl}`} 
              className="img-fluid rounded shadow-lg" // Classi Bootstrap per arrotondare e dare ombra
              alt={currentFilm.titolo} 
              style={{ maxHeight: '500px' }} // Limita l'altezza per non occupare troppo spazio
            />
          </div>

          {/* --- COLONNA DESTRA: TESTI (CENTRATI) --- */}
          {/* 'text-center' qui è fondamentale: allinea tutto il testo al centro */}
          <div className="col-md-8 text-center"> 
            
            {/* Titolo Principale */}
            <h1 className="display-4 mb-3 fw-bold">{currentFilm.titolo}</h1>
            
            {/* Box Grigio con Info Tecniche */}
            {/* d-inline-block serve a far adattare il box al contenuto pur restando centrato */}
            <div className="p-3 mb-4 bg-light rounded border d-inline-block" style={{ minWidth: '50%' }}>
                <p className="mb-1"><strong>Regia:</strong> {currentFilm.regista}</p>
                <p className="mb-1"><strong>Genere:</strong> {currentFilm.genere}</p>
                <p className="mb-1"><strong>Anno:</strong> {currentFilm.anno} | <strong>Uscita:</strong> {currentFilm.dataUscita}</p>
                <p className="mb-0"><strong>Distribuzione:</strong> {currentFilm.casaDistribuzione}</p>
            </div>

            <hr />
            
            {/* Sezione Trama */}
            <h3>Trama e Descrizione</h3>
            <p className="lead" style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
              {currentFilm.trama} 
            </p>
            
            {/* Bottone per tornare indietro */}
            <div className="mt-5">
              <Link to="/" className="btn btn-primary px-4 py-2">Torna alla Home</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // CASO D: FILM NON TROVATO (Fallback)
  return <div className="container mt-5 alert alert-warning">Film non trovato.</div>;
}

export default FilmDetail;