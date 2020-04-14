export class Nomination {
	ID_oscar: number;
	ID_film: number;
	ID_ceremonie: number;
	isWon: boolean;
    categorie: string;
    
    constructor(ID_oscar: number, ID_film: number, ID_ceremonie: number, isWon: boolean, categorie: string) {
        this.ID_oscar = ID_oscar;
        this.ID_film = ID_film;
        this.ID_ceremonie = ID_ceremonie;
        this.isWon = isWon;
        this.categorie = categorie;
    }
}