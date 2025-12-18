package it.progetto.cinema.controller;

import it.progetto.cinema.model.News;
import it.progetto.cinema.service.NewsService;
import org.springframework.web.bind.annotation.CrossOrigin; // Importante per il frontend
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

// Abilita le richieste cross-origin da http://localhost:3000 (dove di solito gira React)
@CrossOrigin(origins = "http://localhost:3000") 
@RestController // Indica che questa classe gestisce le richieste REST
@RequestMapping("/api/cinema") // Prefisso per tutti gli endpoint in questo controller
public class NewsController {

    /**
     * Endpoint per recuperare tutte le notizie.
     * URL completo per il test: http://localhost:8080/api/cinema/news
     */
    @GetMapping("/news") 
    public List<News> getNews() {
        // Chiama il metodo statico del Service per ottenere la lista delle News
        return NewsService.getAllNews(); 
    }
}