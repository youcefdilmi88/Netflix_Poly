export class Movie {
  id: number;
  title: string;
  genre: string;
  duration: number;
  prodYear: number;
  ID_film: any;
  titre: any;
  duree_totale_min: any;
  annee_prod: any;

  constructor(id: number, title: string, genre: string, duration: number, prodYear: number) {
    this.id = id;
    this.title = title;
    this.genre = genre;
    this.duration = duration;
    this.prodYear = prodYear;
  }
}