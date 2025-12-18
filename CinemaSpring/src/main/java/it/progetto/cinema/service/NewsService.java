package it.progetto.cinema.service;

import it.progetto.cinema.model.News;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service // Indica che questa classe è un Service (Logica di Business)
public class NewsService {

    // La lista statica delle notizie (il nostro database simulato)
    private static final List<News> ListaNews = new ArrayList<>();

    // Blocco statico per popolare i dati all'avvio
    static {
        ListaNews.add(new News(
            1L,
            "Io sono nessuno 2, John Ortiz si unisce al cast del sequel",
            """
            Interpretato da Bob Odenkirk, Mansell è stato introdotto sin da subito come un uomo dall’apparente vita normale che cela invece un misterioso e pericoloso passato. Da tempo è stato annunciato un film sequel di Io sono nessuno e il cast continua a lievitare. Si unisce al cast John Ortiz. L'uscita è prevista per il 15 agosto 2025 negli Stati Uniti d’America.
            """,
            "/img/news/io_sono_nessuno_2.jpg",
            "21/12/2025" // Data di pubblicazione (Esempio)
        ));
        
        ListaNews.add(new News(
            2L,
            "James Cameron abbraccia l'AI nel consiglio di amministrazione di Stability AI",
            """
            Stability AI, l'azienda dietro Stable Diffusion, ha annunciato che James Cameron è entrato nel suo consiglio di amministrazione. Il regista di Terminator e Avatar motiva la sua decisione: da sempre attento alle nuove tecnologie, non può voltare le spalle all'Intelligenza Artificiale.
            """,
            "/img/news/james_cameron_ai.jpg",
            "29/12/2025" // Data di pubblicazione (Esempio)
        ));
        
        ListaNews.add(new News(
            3L,
            "Supergirl: Woman of Tomorrow, Matthias Schoenaerts sarà Krem delle Colline Gialle",
            """
            Matthias Schoenaerts si unisce al cast di Supergirl: Woman of Tomorrow, e sarà Krem delle Colline Gialle. Milly Alcock interpreterà la nuova Ragazza d’Acciaio nel DCU, e dovrà vedersela con questo spietato ladro criminale.
            """,
            "/img/news/supergirl_news.jpg",
            "30/12/2025" // Data di pubblicazione (Esempio)
        ));
        
        ListaNews.add(new News(
            4L,
            "I migliori film in streaming di Catherine Zeta-Jones",
            """
            Compiono oggi 55 anni la gallese D.O.C. Catherine Zeta-Jones. Esplosa alla fine degli anni ‘90, l’attrice ha vissuto un momento artistico estremamente fulgido.
            """,
            "/img/news/catherine_zeta_jones.jpg",
            "25/12/2025" // Data di pubblicazione (Esempio)
        ));

        ListaNews.add(new News(
            5L,
            "Canary Black: ecco il trailer ufficiale dello spy-thriller d'azione con Kate Beckin",
            """
            Ora tocca a Kate Beckinsale raccogliere il testimone delle eroine d'azione in thriller di spionaggio, nel film Canary Blond che debutterà in streaming su Prime Video il 24 ottobre.
            """,
            "/img/news/canary_black.jpg",
            "23/12/2025" // Data di pubblicazione (Esempio)
        ));

        ListaNews.add(new News(
            6L,
            "Vermiglio rappresentera' l'Italia agli Oscar",
            """
            Con una certa sorpresa, Vermiglio di Maura Delpero è stato preferito al favorito Parthenope di Paolo Sorrentino. Il film è stato scelto per rappresentare l’Italia alla 97° edizione degli Academy Awards, nella selezione per la categoria International Feature Film Award.
            """,
            "/img/news/vermiglio_oscar.jpg",
            "26/12/2025" // Data di pubblicazione (Esempio)
        ));
    }

    // Metodo per recuperare tutte le notizie
    public static List<News> getAllNews() {
        return ListaNews;
    }
    
    //  metodo per trovare una notizia per id
    // public static Optional<News> getNewsById(Long id) {
    //     return ListaNews.stream().filter(news -> news.getId().equals(id)).findFirst();
    // }
}