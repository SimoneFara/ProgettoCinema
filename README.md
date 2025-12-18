Progetto Cinema 

Un'applicazione web completa per la gestione di un cinema, che permette di visualizzare i film in programmazione, le news e gestire le informazioni correlate attraverso un'interfaccia moderna e intuitiva.

 Tecnologie Utilizzate

* **Backend: Java 17, Spring Boot, Spring Data JPA
* **Database: H2 (In-memory database - non richiede installazione locale)
* **Frontend: React.js
* **Gestione Dipendenze: Maven 

 Come avviare il progetto localmente

Segui questi passaggi per configurare il progetto sul tuo PC in pochi minuti.

 1. Prerequisiti
Assicurati di avere installato sul tuo sistema:
* Java 17 o superiore
* Node.js (che include npm)
* Un IDE (consigliato Eclipse con plugin Lombok installato o VS Code)

  2.Avvio Progetto Cinema

  * Scaricare il Progetto da https://github.com/SimoneFara/ProgettoCinema
  * Avviare il Backend (Spring Boot)

Apri Eclipse.

Vai su File > Import... > Existing Maven Projects.

Seleziona la cartella del progetto (CinemaSpring) e clicca su Finish.

Nota: Assicurati di avere il plugin Lombok installato su Eclipse.

Trova il file CinemaApplication.java, fai tasto destro > Run As > Java Application.

Il backend è attivo su: http://localhost:8080

 *Avviare il Frontend (React)

Apri la cartella del frontend (CinemaReact/cinema-web-app) con VS Code o il terminale.

Digita il comando: npm install (solo la prima volta per scaricare le librerie).

Digita il comando: npm start

Il sito si aprirà su: http://localhost:3000

