export class Participant {
    ID_film: number;
	ID_employe: number;
	role_employe: string;
	salaire: number;
	nom: string;
	age: number;
	sexe: string;
	nationalite: string;

    constructor(ID_film: number, ID_employe: number, role_employe: string, salaire: number, nom: string, age: number, sexe: string, nationalite: string) {
        this.ID_film = ID_film;
        this.ID_employe = ID_employe;
        this.role_employe = role_employe;
        this.salaire = salaire;
        this.nom = nom;
        this.age = age;
        this.sexe = sexe;
        this.nationalite = nationalite;
    }
}