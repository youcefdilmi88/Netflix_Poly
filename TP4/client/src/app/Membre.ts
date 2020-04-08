export class Membre {
    ID_membre : number;
    nom: string;
    mot_de_passe: string;
    courriel: string;
    no_rue: number;
    rue: string;
    code_postal: string;
    ville: string;
    isAdmin: boolean;


    constructor(ID_membre: number, nom: string, mot_de_passe: string, courriel: string, no_rue: number, 
        rue: string, code_postal: string, ville: string, isAdmin: boolean) {
        this.ID_membre = ID_membre;
        this.nom = nom;
        this.mot_de_passe = mot_de_passe;
        this.courriel = courriel;
        this.no_rue = no_rue;
        this.rue = rue;
        this.code_postal = code_postal;
        this.ville = ville;
        this.isAdmin = isAdmin;
    }
}