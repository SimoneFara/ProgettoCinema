package it.progetto.cinema.controller;

import it.progetto.cinema.model.Film;
import it.progetto.cinema.service.FilmService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Optional;

// Abilita le richieste cross-origin da http://localhost:3000 (React)
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/cinema") // Prefisso di base
public class FilmController {

    // 1. Endpoint per la Home (Filtrati per Genere Drammatico o Sentimentale)
    @GetMapping("/home/film")
    public List<Film> getFilmPerHome() {
        return FilmService.getFilmHome();
    }
    
    // 2. Endpoint per il Calendario Uscite (Filtro per periodo)
    // Mappa: /api/cinema/calendario/{periodo}
    @GetMapping("/calendario/{periodo}")
    public List<Film> getFilmPerPeriodo(@PathVariable String periodo) {
        // Chiama il metodo di filtraggio in FilmService, che usa l'ENUM italiano
        return FilmService.getFilmByPeriodo(periodo); 
    }

    // 2b. Endpoint di Fallback: restituisce TUTTI i film se non viene specificato un periodo
    // Mappa: /api/cinema/calendario (usato per il primo caricamento o senza filtri)
    @GetMapping("/calendario")
    public List<Film> getUsciteSenzaFiltro() {
        return FilmService.getListaFilm(); 
    }
    
    // 3. Endpoint per la Trama (Ricerca per ID)
    // Mappa: /api/cinema/trame/{id}
    @GetMapping("/trame/{id}")
    public Optional<Film> getTramaById(@PathVariable Long id) {
        return FilmService.getFilmById(id);
    }
}