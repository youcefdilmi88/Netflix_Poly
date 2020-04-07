export class Movie {
  id: number;
  title: string;
  genre: string;
  duration: number;
  director: string;
  prodYear: number;

  constructor(id: number, title: string, genre: string, duration: number, director: string, prodYear: number) {
    this.id = id;
    this.title = title;
    this.genre = genre;
    this.duration = duration;
    this.director = director;
    this.prodYear = prodYear;
  }
}