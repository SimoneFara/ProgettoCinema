import React, { useEffect } from 'react';

// === IMPORTAZIONI LIBRERIE ESTERNE ===
// Importiamo gli strumenti per il Routing (Navigazione senza ricaricare la pagina)
import { Routes, Route, Link } from 'react-router-dom';
// Importiamo i componenti grafici di Bootstrap (Aggiunti: Carousel, Row, Col, Card)
import { Navbar, Container, Nav, Carousel, Row, Col, Card } from 'react-bootstrap';
// Importiamo gli strumenti di Redux per collegare questo componente allo Store centrale
import { useDispatch, useSelector } from 'react-redux';

// === IMPORTAZIONI LOGICA REDUX ===
// Importiamo l'azione asincrona (Thunk) per scaricare i film della Home
import { fetchFilmHome } from './redux/slices/filmSlice';

// === IMPORTAZIONI COMPONENTI PAGINE ===
import FilmDetail from './components/FilmDetail'; 
import News from './components/News';            
import Calendar from './components/Calendar';    


// =================================================================================
// FUNZIONE HELPER: Raggruppa l'array in blocchi (Chunking)
// Crea gruppi di N elementi (es. 4) per le slide del Carosello
// =================================================================================
const createChunks = (list, size) => {
    if (!list || list.length === 0) return [];
    const chunks = [];
    for (let i = 0; i < list.length; i += size) {
        chunks.push(list.slice(i, i + size));
    }
    return chunks;
};


// =================================================================================
// COMPONENTE: HomeContent (Implementa il Carosello)
// =================================================================================
function HomeContent() {
  const dispatch = useDispatch();
  const { filmHome, status, error } = useSelector((state) => state.film);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchFilmHome());
    }
  }, [status, dispatch]);

  let content;

  // A) SE STA CARICANDO:
  if (status === 'loading') {
    content = <div className="text-center mt-5"><div className="spinner-border text-primary"></div><p>Caricamento film...</p></div>;
  } 
  // B) SE C'È UN ERRORE:
  else if (status === 'failed') {
    content = <div className="alert alert-danger mt-5">Errore nel caricamento dei film: {error}</div>;
  } 
  // C) SE È ANDATO TUTTO BENE: Mostriamo i Caroselli
  else if (status === 'succeeded') {
    
    // 1. FILTRAZIONE E RAGGRUPPAMENTO DEI DATI (4 film per slide)
    const filmDrammatici = filmHome.filter(film => film.genere && film.genere.includes('Drammatico'));
    const filmSentimentali = filmHome.filter(film => film.genere && film.genere.includes('Sentimentale'));
    
    // Raggruppa i film in chunk di 4 (per 4 colonne lg={3})
    const chunksDrammatici = createChunks(filmDrammatici, 4);
    const chunksSentimentali = createChunks(filmSentimentali, 4);

    // 2. FUNZIONE PER DISEGNARE UN SINGOLO CAROSELLO
    const renderCarouselSection = (chunks, title) => (
        <div className="mb-5">
            <h2 className="text-center mb-4 p-2 fw-bold" 
                style={{ backgroundColor: '#f8f9fa', borderBottom: '2px solid #0d6efd' }}>
                {title}
            </h2>
            
            {chunks.length > 0 ? (
                // Carousel: interval={null} per non scorrere in automatico
                <Carousel 
                    interval={null} 
                    indicators={false} 
                    // Stili per i pulsanti di navigazione (frecce)
                    prevIcon={<span className="carousel-control-prev-icon bg-dark p-3 rounded-circle opacity-75" aria-hidden="true" />} 
                    nextIcon={<span className="carousel-control-next-icon bg-dark p-3 rounded-circle opacity-75" aria-hidden="true" />}
                >
                    {chunks.map((chunk, chunkIndex) => (
                        <Carousel.Item key={chunkIndex}>
                            <Row className="justify-content-center"> 
                                {/* Cicla sui film del blocco corrente */}
                                {chunk.map(film => (
                                    // lg={3} -> 4 colonne per schermi grandi (12/3=4)
                                    <Col key={film.id} lg={3} md={4} sm={6} className="mb-4 d-flex">
                                        <div className="card shadow-lg h-100 transition-hover w-100">
                                            <Link to={`/film/${film.id}`}> 
                                                <img 
                                                    src={`http://localhost:8080${film.immagineUrl}`} 
                                                    className="card-img-top" 
                                                    alt={film.titolo} 
                                                    // Altezza fissa per allineare le card
                                                    style={{ height: '350px', objectFit: 'cover' }} 
                                                />
                                            </Link>
                                            <div className="card-body text-center">
                                                <h5 className="card-title fw-bold">{film.titolo}</h5>
                                                <p className="card-text text-muted small">{film.genere}</p>
                                            </div>
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        </Carousel.Item>
                    ))}
                </Carousel>
            ) : (
                <div className="alert alert-info text-center mt-3">Nessun film {title.toLowerCase()} trovato.</div>
            )}
        </div>
    );

    // 3. ASSEGNAZIONE DEL CONTENUTO FINALE
    content = (
        <div className="mt-5">
            {renderCarouselSection(chunksDrammatici, "Film Drammatici")}
            <hr className="my-5" />
            {renderCarouselSection(chunksSentimentali, "Film Sentimentali")}
        </div>
    );
}

  // Restituiamo il contenuto finale dentro un contenitore centrato
  return <Container className="my-5">{content}</Container>;
}


// =================================================================================
// COMPONENTE PRINCIPALE: App (Contiene la Navbar e il Router)
// =================================================================================
function App() {
  return (
    <> 
      {/* 1. NAVBAR (BARRA DI NAVIGAZIONE) */}
      <Navbar bg="dark" variant="dark" expand="lg" className="sticky-top shadow">
        <Container>
          <Navbar.Brand as={Link} to="/" className="fw-bold text-uppercase">Cinema Web App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto"> 
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/calendario">Calendario Uscite</Nav.Link> 
              <Nav.Link as={Link} to="/news">News</Nav.Link> 
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* 2. GESTIONE DELLE ROTTE (PAGINE) */}
      <Routes>
        <Route path="/" element={<HomeContent />} />
        <Route path="/film/:id" element={<FilmDetail />} />
        <Route path="/news" element={<News />} />
        <Route path="/calendario" element={<Calendar />} />
      </Routes>
    </>
  );
}

export default App;