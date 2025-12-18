package it.progetto.cinema.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Data
@NoArgsConstructor

public class News {

private Long id; // IDENTIFICATORE UNIVOCO
private String titolo;
private String descrizione; 
private String immagineUrl; //immagine da inserire nella sezione news
private String dataPubblicazione; //FACOLTATIVO (DA AGGIUNGERE ALLA FINE)


}
