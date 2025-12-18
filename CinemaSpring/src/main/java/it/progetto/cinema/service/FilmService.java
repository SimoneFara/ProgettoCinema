package it.progetto.cinema.service;

import it.progetto.cinema.model.Film;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
// Importazioni necessarie per la logica del filtro Calendario
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.WeekFields;
import java.util.Locale;

// L'annotazione @Service identifica questa classe come un Service Component di Spring
@Service
public class FilmService {

    // Lista statica e immutabile che simula il database dei film
    private static final List<Film> ListaFilm = new ArrayList<>();	

    // Blocco statico per l'inizializzazione dei dati all'avvio dell'applicazione
    static {
        // Le date dei primi film sono state aggiornate a Dicembre 2025 per testare i filtri "Settimana Corrente" e "Mese Corrente"
        // La trama è stata ripristinata dal tuo documento di progetto o creata ex-novo dove mancante.

        // 1. Campo di Battaglia
        // Trama ripristinata dal PPTX 
        String tramaCampo = "Campo di Battaglia, il film diretto da Gianni Amelio, è ambientato sul finire della Prima Guerra Mondiale. Due ufficiali medici, amici d’infanzia, lavorano nello stesso ospedale militare, dove ogni giorno arrivano dal fronte i feriti più gravi. Molti di loro però si sono procurati da soli le ferite, sono dei simulatori, che farebbero di tutto per non tornare a combattere. Stefano (Gabriel Montesi), di famiglia altoborghese, è ossessionato da questi autolesionisti. Giulio (Alessandro Borghi), apparentemente più comprensivo, è più portato verso la ricerca. Anna (Federica Rosellini) sconta il fatto di essere donna. Qualcosa di strano accade intanto tra i malati: forse c’è qualcuno che provoca di proposito delle complicazioni alle loro ferite, perché i soldati vengano mandati a casa, purché non tornino in battaglia. Sul fronte di guerra si diffonde una specie di infezione che colpisce più delle armi nemiche e contagia anche la popolazione civile...";
        ListaFilm.add(new Film(1L, "Campo di Battaglia", "/img/campo_battaglia.jpg", "Gianni Amelio", "Drammatico", tramaCampo, "16/12/2025", "01 Distribution", "2025"));
        
        // 2. Never Let Go - A un passo dal male
        // Trama ripristinata dal PPTX 
        String tramaNever = "Never Let Go - A un Passo dal Male, il film diretto da Alexandre Aja, racconta la storia di una madre (Halle Berry) che vive in una casa isolata nel bosco con i suoi due figli gemelli. Sono convinti di essere circondati da spiriti maligni e che la casa sia l'unico luogo dove sono al sicuro. Quando devono allontanarsi, ognuno di loro indossa una lunga corda che lo tiene sempre legato alla casa. In questo modo i demoni del bosco non possono far loro del male. Ma quando uno dei bambini inizia a dubitare dell'esistenza degli spiriti, la sua corda si spezza mettendo in pericolo la sua vita e quella di tutta la famiglia. Inizia allora una terrificante lotta per la sopravvivenza...";
        ListaFilm.add(new Film(2L, "Never Let Go - A un passo dal male", "/img/never_let_go.jpg", "Alexandre Aja", "Drammatico", tramaNever, "17/12/2025", "Lionsgate Films", "2025"));
        
        // 3. Joker: Folie à Deux
        // Trama ripristinata dal PPTX 
        String tramaJoker = "Joker: Folie à deux è il sequel del film di successo diretto da Todd Phillips. La storia riprende da dove era finita: la rivoluzione di Arthur Fleck (Joaquin Phoenix) ha invaso le strade di Gotham. Dalla dilatazione della sua follia, questa volta si torna a rinchiuderla in carcere, dove Fleck è sottoposto a processo. La caratteristica principale di questo capitolo è che la follia sarà in due, introducendo il personaggio di Harley Quinn al fianco del Joker.";
        ListaFilm.add(new Film(3L, "Joker: Folie à Deux", "/img/joker_folie.jpg", "Todd Phillips", "Drammatico, Musical", tramaJoker, "18/12/2025", "Warner Bros", "2025"));
        
        // 4. Making Of
        // Trama ripristinata dal PPTX 
        String tramaMakingOf = "Il protagonista di Making Of è Simon (Denis Podalydès), un regista che è riuscito ad avviare un film al quale tiene molto: narra la vicenda di alcuni operai che diventano proprietari della propria fabbrica. Sventuratamente, le condizioni nelle quali il film viene realizzato non sono ottimali: un attore primadonna non è controllabile, Simon è in crisi con la moglie, la troupe è arrogante, alcuni finanziatori si tirano indietro. A salvare la motivazione di Simon c'è il giovane Joseph (Stefan Crepon), incaricato di girare un backstage di tutta la lavorazione: un testimone al margine che potrebbe aiutare Simon a recuperare quell'entusiasmo in nome del cinema.";
        ListaFilm.add(new Film(4L, "Making Of", "/img/making_of.jpg", "Cédric Kahn", "Sentimentale, Commedia", tramaMakingOf, "19/12/2025", "I Wonder Pictures", "2025"));
        
        // 5. Familia
        // Trama ripristinata dal PPTX 
        String tramaFamilia = "Familia, il film diretto da Francesco Costabile, racconta la storia di Luigi Celeste. Luigi ha vent’anni e vive con sua madre Licia e suo fratello Alessandro. Sono quasi dieci anni che nessuno di loro vede Franco, compagno e padre, che ha reso l’infanzia dei due ragazzi e la giovinezza di Licia un ricordo fatto di paura e prevaricazione. Luigi, alla ricerca di un senso di appartenenza, si unisce a un gruppo di estrema destra. Un giorno Franco torna, rivuole i suoi figli, rivuole la sua famiglia, ma è un uomo che avvelena tutto ciò che tocca. Quella di Luigi e della sua famiglia è una storia che arriva al fondo dell'abisso per compiere un percorso di rinascita, costi quel che costi.";
        ListaFilm.add(new Film(5L, "Familia", "/img/familia.jpg", "Francesco Costabile", "Sentimentale", tramaFamilia, "05/01/2026", "Medusa Film", "2026"));
        
        // 6. Maria Montessori - La Nouvelle Femme
        // Trama ripristinata dal PPTX 
        String tramaMaria = "Maria Montessori, film diretto da Léa Todorov, è ambientato nel Novecento e racconta la storia di Lili d'Aengy (Leila Bekhti), una cocotte parigina che fugge a Roma per nascondere la figlia Tina, affetta da un disturbo dell'apprendimento. A Roma, la vita di Lili viene sconvolta dall'incontro con Maria Montessori (Jasmine Trinca), che ha ideato un metodo rivoluzionario per i bambini con difficoltà. Lili ignora che la stessa Maria nasconde il segreto di un figlio nato fuori dal matrimonio. Le due donne, seppur molto diverse, si aiuteranno a vicenda per trovare e conquistare il loro posto nel mondo.";
        ListaFilm.add(new Film(6L, "Maria Montessori - La Nouvelle Femme", "/img/maria_montessori.jpg", "Léa Todorov", "Sentimentale, Biografico", tramaMaria, "12/01/2026", "Geko Films", "2026"));
        
        // 7. Oasis: Supersonic (Trama di Esempio)
        String tramaOasis = "Documentario sulla band inglese Oasis. Il film racconta l'ascesa fulminea di Liam e Noel Gallagher, dalle loro umili origini fino ai concerti di Knebworth del 1996, celebrando l'apice della loro gloria e il fenomeno culturale che hanno generato. Un ritratto intimo e senza filtri, con interviste esclusive e filmati d'archivio inediti.";
        ListaFilm.add(new Film(7L, "Oasis: Supersonic", "/img/oasis_supersonic.jpg", "Mat Whitecross", "Documentario", tramaOasis, "16/09/2024", "Mint Pictures", "2016"));
        
        // 8. I Am Still (Jung Kook) (Trama di Esempio)
        String tramaJungkook = "Film evento che segue il fenomeno globale Jung Kook (del gruppo BTS) in un concerto esclusivo e un dietro le quinte sulla sua vita e carriera solista. Un'opportunità per i fan di tutto il mondo di vedere il cantante in una performance cinematografica unica. Proiezioni limitate.";
        ListaFilm.add(new Film(8L, "I Am Still (Jung Kook)", "/img/i_am_still.jpg", "Jun-Soo Park", "Drammatico", tramaJungkook, "18/09/2024", "HYBE", "2024"));
        
        // 9. Shining (Versione Integrale 4K) (Trama di Esempio)
        String tramaShining = "Evento speciale che riporta sul grande schermo, in una versione restaurata in 4K, il capolavoro horror di Stanley Kubrick, basato sul romanzo di Stephen King. Jack Torrance, scrittore in crisi, accetta di fare da custode invernale all'isolato Overlook Hotel con la moglie e il figlio, scivolando lentamente nella follia a causa di presenze maligne.";
        ListaFilm.add(new Film(9L, "Shining (Versione Integrale 4K)", "/img/shining.jpg", "Stanley Kubrick", "Horror", tramaShining, "07/10/2024", "PIC", "1980"));
        
        // 10. IDDU - L'Ultimo Padrino (Trama di Esempio)
        String tramaIddu = "Ispirato alla latitanza più misteriosa d'Italia, IDDU - L'Ultimo Padrino, è un dramma intenso con Toni Servillo ed Elio Germano. Il film esplora le dinamiche di potere, le coperture politiche e le relazioni personali che hanno permesso al boss mafioso di rimanere imprendibile per decenni.";
        ListaFilm.add(new Film(10L, "IDDU - L'Ultimo Padrino", "/img/iddu.jpg", "Fabio Grassadonia", "Drammatico", tramaIddu, "10/10/2024", "01 Distribution", "2024"));
        
        // 11. Berlinguer - La Grande Ambizione (Trama di Esempio)
        String tramaBerlinguer = "Biopic che ripercorre la vita e la carriera politica di Enrico Berlinguer, leader carismatico del Partito Comunista Italiano. Il film si concentra sulle sue idee rivoluzionarie, il compromesso storico e la sua 'grande ambizione' di cambiare il paese, offrendo uno sguardo intimo sull'uomo oltre il politico.";
        ListaFilm.add(new Film(11L, "Berlinguer - La Grande Ambizione", "/img/berlinguer.jpg", "Andrea Segre", "Biografico", tramaBerlinguer, "31/10/2024", "Lucky Red", "2024"));
        
        // 12. Buffalo Kids (Trama di Esempio)
        String tramaBuffalo = "Film d'animazione per famiglie che segue le avventure di due fratelli e una ragazza che decidono di partire per una missione epica nel selvaggio West. Devono difendere la loro fattoria e salvare la loro comunità, imparando che 'Tutti possiamo essere eroi' a dispetto delle differenze e delle difficoltà.";
        ListaFilm.add(new Film(12L, "Buffalo Kids", "/img/buffalo_kids.jpg", "Pedro Solis Garcia", "Animazione", tramaBuffalo, "31/10/2024", "Warner Bros", "2024"));

    } // Fine blocco statico

    // =================================================================
    // ENUM: Definisce le costanti in italiano per il filtro Calendario
    // =================================================================
    public enum PeriodoFiltro {
        SETTIMANA_CORRENTE, 
        PROSSIMA_SETTIMANA,
        MESE_CORRENTE,     
        PROSSIMO_MESE      
    }

    // Metodo: Recupera tutti i film (Endpoint di fallback /calendario)
    public static List<Film> getListaFilm(){
        return ListaFilm;
    }

    // Metodo: Filtra i film per la Home Page (Endpoint /home/film)
    public static List<Film> getFilmHome() {
        return ListaFilm.stream()
            .filter(film -> film.getGenere().contains("Drammatico") || film.getGenere().contains("Sentimentale"))
            .collect(Collectors.toList());
    }

    // Metodo: Trova un film per ID (Endpoint /trame/{id})
    public static Optional<Film> getFilmById(Long id) {
        return ListaFilm.stream()
            .filter(film -> film.getId().equals(id))
            .findFirst();
    }

    // =================================================================
    // Metodo: Filtra i film in base al periodo richiesto (Endpoint /calendario/{periodo})
    // =================================================================
    public static List<Film> getFilmByPeriodo(String periodo) {
        LocalDate today = LocalDate.now();
        LocalDate dataInizio;
        LocalDate dataFine;

        try {
            // Converte la stringa del periodo in ENUM (es. "SETTIMANA_CORRENTE")
            PeriodoFiltro filtro = PeriodoFiltro.valueOf(periodo.toUpperCase());

            switch (filtro) {
                case SETTIMANA_CORRENTE:
                    // Calcola l'inizio della settimana (Lunedì) e la fine (Domenica)
                    dataInizio = today.with(WeekFields.of(Locale.ITALY).dayOfWeek(), 1);
                    dataFine = dataInizio.plusDays(6);
                    break;
                case PROSSIMA_SETTIMANA:
                    // Calcola l'inizio e la fine della settimana successiva
                    LocalDate startOfThisWeek = today.with(WeekFields.of(Locale.ITALY).dayOfWeek(), 1);
                    dataInizio = startOfThisWeek.plusWeeks(1);
                    dataFine = dataInizio.plusDays(6);
                    break;
                case MESE_CORRENTE:
                    // Inizio (giorno 1) e fine (ultimo giorno) del mese corrente
                    dataInizio = today.withDayOfMonth(1);
                    dataFine = today.withDayOfMonth(today.lengthOfMonth());
                    break;
                case PROSSIMO_MESE:
                    // Inizio e fine del mese successivo
                    dataInizio = today.plusMonths(1).withDayOfMonth(1);
                    dataFine = dataInizio.withDayOfMonth(dataInizio.lengthOfMonth());
                    break;
                default:
                    // Fallback se il filtro non è riconosciuto
                    return ListaFilm; 
            }
        } catch (IllegalArgumentException e) {
            // Gestisce il caso in cui il parametro non corrisponda a un ENUM valido
            System.err.println("Periodo di filtro non valido: " + periodo);
            return ListaFilm; 
        }

        // Formatter per convertire la stringa data del film ("dd/MM/yyyy") in oggetto LocalDate
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");

        // Utilizza lo Stream per filtrare i film in base al periodo calcolato
        return ListaFilm.stream()
            .filter(film -> {
                try {
                    // Converte la data di uscita del film
                    LocalDate dataUscita = LocalDate.parse(film.getDataUscita(), formatter);
                    
                    // Filtra: la data di uscita deve essere >= dataInizio E <= dataFine
                    return !dataUscita.isBefore(dataInizio) && !dataUscita.isAfter(dataFine);
                } catch (Exception e) {
                    // Ignora i film con data non valida (utile per evitare crash)
                    return false;
                }
            })
            .collect(Collectors.toList());
    }
}