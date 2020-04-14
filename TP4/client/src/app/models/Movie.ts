export class Movie {
  ID_film?: number;
  titre: string;
  genre: string;
  duree_totale_min: number;
  annee_prod: number;

  constructor(ID_film: number, titre: string, genre: string, duree_totale_min: number, annee_prod: number) {
    this.ID_film = ID_film;
    this.titre = titre;
    this.genre = genre;
    this.duree_totale_min = duree_totale_min;
    this.annee_prod = annee_prod;
  }
}
