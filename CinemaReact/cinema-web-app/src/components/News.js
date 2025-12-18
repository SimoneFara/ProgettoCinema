import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Importiamo l'azione che abbiamo creato nel Passo 1
import { fetchNews } from '../redux/slices/newsSlice'; 

function News() {
  // 1. Strumenti per parlare con Redux
  const dispatch = useDispatch(); // Serve per "spedire" ordini (come fetchNews)
  
  // 2. Leggiamo i dati dal Magazzino (Store)
  // Estraiamo la lista delle news, lo stato (loading/succeeded) e eventuali errori
  const { newsList, status, error } = useSelector((state) => state.news);

  // 3. Effetto Automatico (Appena si apre la pagina)
  useEffect(() => {
    // Se lo stato è 'idle' (fermo), lanciamo l'ordine di scaricare le news
    if (status === 'idle') {
      dispatch(fetchNews());
    }
  }, [status, dispatch]);

  // 4. Gestione degli stati di caricamento ed errore
  if (status === 'loading') {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status"></div>
        <p>Caricamento notizie in corso...</p>
      </div>
    );
  }

  if (status === 'failed') {
    return <div className="container mt-5 alert alert-danger">Errore: {error}</div>;
  }

  // 5. Visualizzazione della Lista (Se tutto è andato bene)
  return (
    <div className="container mt-5">
      <h2 className="mb-4 border-bottom pb-2">Ultime Notizie dal Cinema</h2>
      
      <div className="row">
        {/* 'map' è un ciclo che trasforma ogni 'newsItem' in una Card HTML */}
        {newsList.map((newsItem) => (
//Prende la lista di notizie (che è un array di dati invisibili) e per ogni notizia
//  crea un blocco visibile (una Card Bootstrap)          
          
          <div key={newsItem.id} className="col-12 mb-4">
            <div className="card shadow-sm">
              <div className="row g-0">
                {/* Colonna Immagine */}
                <div className="col-md-4">
                  <img 
                    // NOTA: Assicurati che nel tuo Java News.java il campo si chiami 'immagineUrl' o simile
                    src={`http://localhost:8080${newsItem.immagineUrl}`} 
                    className="img-fluid rounded-start" 
                    alt={newsItem.titolo}
                    style={{ height: '100%', objectFit: 'cover', minHeight: '200px' }} 
                  />
                </div>
                {/* Colonna Testo */}
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title fw-bold">{newsItem.titolo}</h5>
                    <p className="card-text">{newsItem.descrizione}</p>
                    
                    {/* Se hai una data nel database, puoi mostrarla qui */}
                    {newsItem.dataPubblicazione && (
                         <p className="card-text"><small className="text-muted">Pubblicato il: {newsItem.dataPubblicazione}</small></p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default News;