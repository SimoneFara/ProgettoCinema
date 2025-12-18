package it.progetto.cinema.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Data
@NoArgsConstructor

public class Film {

//INFO	
private Long id; //IDENTIFICATORE UNIVOCO				
private String titolo; // TITOLO DEL FILM
private String immagineUrl; //URL DELL'IMMAGINE DEL FILM(LOCANDINA) X FRONTEND HOME,TRAMA,USCITA 

//HOME E TRAMA
private String regista; //REGISTA DEL FILM	
private String genere; //GENERE (DRAMMATICO,HORROR E ALTRI)
private String trama; //TRAMA INTERA DEL FILM

//CALENDARIO USCITE E ALTRI DETTAGLI

private String dataUscita; //NON UTILIZZO LOCALDATE PER RENDERE PIU' PRATICA LA CONVERSIONE IN JSON 
private String casaDistribuzione;

private String anno;



}
