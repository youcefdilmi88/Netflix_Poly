export class Membre {
    ID_membre?: number;
    nom: string;
    mot_de_passe: string;
    courriel: string;
    no_rue: number;
    rue: string;
    code_postal: string;
    ville: string;
    isAdmin: boolean;
    monthly: boolean;
    cardNum: number;
    expDate: string;
    CCV: number;


    constructor(ID_membre: number | undefined, nom: string, mot_de_passe: string, courriel: string, no_rue: number,
        rue: string, code_postal: string, ville: string, isAdmin: boolean, monthly: boolean, cardNum: number, expDate: string, CCV: number) {
        this.ID_membre = ID_membre;
        this.nom = nom;
        this.mot_de_passe = mot_de_passe;
        this.courriel = courriel;
        this.no_rue = no_rue;
        this.rue = rue;
        this.code_postal = code_postal;
        this.ville = ville;
        this.isAdmin = isAdmin;
        this.monthly = monthly;
        this.cardNum = cardNum;
        this.expDate = expDate;
        this.CCV = CCV;
    }
}
