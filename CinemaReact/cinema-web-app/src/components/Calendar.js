import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Button, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Importiamo le azioni dal nostro slice
import { fetchCalendarFilms, setFilter } from '../redux/slices/calendarSlice';

// Definiamo i filtri disponibili e i valori corrispondenti agli ENUM di Java
const FILTERS = [
    { label: "Tutti i Film", value: 'TUTTI', endpoint: '' },
    { label: "Settimana Corrente", value: 'SETTIMANA_CORRENTE', endpoint: 'SETTIMANA_CORRENTE' },
    { label: "Prossima Settimana", value: 'PROSSIMA_SETTIMANA', endpoint: 'PROSSIMA_SETTIMANA' },
    { label: "Mese Corrente", value: 'MESE_CORRENTE', endpoint: 'MESE_CORRENTE' },
    { label: "Prossimo Mese", value: 'PROSSIMO_MESE', endpoint: 'PROSSIMO_MESE' },
];

function Calendar() {
    // === 1. HOOKS E STATO REDUX ===
    const dispatch = useDispatch();
    const { films, status, error, activeFilter } = useSelector((state) => state.calendar);

    // === 2. GESTIONE DEL CARICAMENTO INIZIALE ===
    useEffect(() => {
        // Carica tutti i film (fallback) al primo mount
        if (status === 'idle') {
            dispatch(fetchCalendarFilms());
        }
    }, [status, dispatch]);


    // === 3. GESTIONE DEL CAMBIO FILTRO ===
    const handleFilterChange = (filter) => {
        // Aggiorna lo stato del filtro attivo nell'interfaccia
        dispatch(setFilter(filter.value)); 
        
        // Chiama l'azione asincrona, passando il valore dell'endpoint (vuoto se è 'TUTTI')
        dispatch(fetchCalendarFilms(filter.endpoint));
    };

    // === 4. CONTENUTO DINAMICO (Caricamento, Errore, Successo) ===
    let content;

    if (status === 'loading') {
        content = (
            <div className="text-center my-5">
                <div className="spinner-border text-primary" role="status"></div>
                <p className="mt-2">Caricamento calendario uscite...</p>
            </div>
        );
    } else if (status === 'failed') {
        content = (
            <div className="alert alert-danger text-center mt-5">
                Errore durante il caricamento: {error}
            </div>
        );
    } else if (status === 'succeeded' && films.length === 0) {
        content = (
            <div className="alert alert-info text-center mt-5">
                Nessun film trovato per il periodo selezionato ({FILTERS.find(f => f.value === activeFilter)?.label}).
            </div>
        );
    } else if (status === 'succeeded') {
        // Mappa i film in Card per la visualizzazione
        content = (
            <Row className="g-4 mt-4">
                {films.map(film => (
                    <Col key={film.id} lg={4} md={6} sm={12} className="d-flex">
                        <Card className="shadow-lg w-100 transition-hover">
                            <Row className="g-0">
                                {/* Immagine a sinistra */}
                                <Col md={4}>
                                    <Link to={`/film/${film.id}`}>
                                        <Card.Img 
                                            src={`http://localhost:8080${film.immagineUrl}`} 
                                            alt={film.titolo} 
                                            style={{ height: '100%', objectFit: 'cover' }} 
                                        />
                                    </Link>
                                </Col>
                                {/* Dettagli a destra */}
                                <Col md={8}>
                                    <Card.Body className="d-flex flex-column justify-content-between">
                                        <div>
                                            <Card.Title className="fw-bold">{film.titolo}</Card.Title>
                                            <Card.Text>
                                                <small className="text-muted">
                                                    **Uscita:** {film.dataUscita}
                                                </small>
                                            </Card.Text>
                                            <Card.Text>
                                                <small className="text-muted">
                                                    **Genere:** {film.genere}
                                                </small>
                                            </Card.Text>
                                        </div>
                                        <Link to={`/film/${film.id}`} className="mt-2">
                                            <Button variant="primary" size="sm">
                                                Scheda Film
                                            </Button>
                                        </Link>
                                    </Card.Body>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                ))}
            </Row>
        );
    }

    // === 5. RENDER PRINCIPALE ===
    return (
        <Container className="my-5">
            <h1 className="text-center mb-5 fw-bold" 
                style={{ borderBottom: '3px solid #0d6efd', paddingBottom: '10px' }}>
                Calendario Uscite
            </h1>
            
            {/* Sezione Filtri */}
            <div className="d-flex flex-wrap justify-content-center gap-2 mb-5">
                {FILTERS.map((filter) => (
                    <Button
                        key={filter.value}
                        variant={activeFilter === filter.value ? 'primary' : 'outline-secondary'}
                        onClick={() => handleFilterChange(filter)}
                        className="fw-bold"
                        // Disabilita i pulsanti durante il caricamento
                        disabled={status === 'loading'} 
                    >
                        {filter.label}
                    </Button>
                ))}
            </div>

            {/* Contenuto Dinamico (Film, Caricamento, Errore) */}
            {content}

        </Container>
    );
}

export default Calendar;