import { injectable } from "inversify";
import * as pg from "pg";
import "reflect-metadata";
import {schema} from "../createSchema";
import {data} from "../populateDB";

@injectable()
export class DatabaseService {

    // A MODIFIER POUR VOTRE BD
    public connectionConfig: pg.ConnectionConfig = {
        user: "admin",
        database: "netflixdb",
        password: "admin",
        port: 5432,
        host: "127.0.0.1",
        keepAlive : true
    };

    private pool: pg.Pool = new pg.Pool(this.connectionConfig);

    public constructor() {
        this.pool.connect();
    }

    public createSchema(): Promise<pg.QueryResult> {

        return this.pool.query(schema);
    }

    public populateDb(): Promise<pg.QueryResult> {

        return this.pool.query(data);
    }

    public getAllFromTable(tableName: string): Promise<pg.QueryResult> {

        return this.pool.query(`SELECT * FROM netflixdb.${tableName};`);
    }

    public deleteMovie(ID_film: number): Promise<pg.QueryResult> {

        return this.pool.query(`DELETE FROM netflixdb.Film AS fi WHERE fi.ID_film=${ID_film};`);
    }

    public getMovies(): Promise<pg.QueryResult> {

        return this.pool.query('SELECT * FROM netflixdb.Film;');
    }

    public getMembres(): Promise<pg.QueryResult> {

        return this.pool.query('SELECT * FROM netflixdb.Membre;');
    }

    public getNominations(ID_film: number): Promise<pg.QueryResult> {

        return this.pool.query(`SELECT * FROM netflixdb.Oscars o WHERE o.ID_film=${ID_film};`);
    }

    public getDistribution(ID_film: number): Promise<pg.QueryResult> {

        return this.pool.query(`SELECT ID_film, ID_employe, role_employe, salaire, nom, age, sexe, nationalite FROM netflixdb.Employe NATURAL JOIN netflixdb.Film_Employe fe WHERE fe.ID_film=${ID_film};`);
    }


    public login(email: String, password: String): Promise<pg.QueryResult> {
        return this.pool.query(`SELECT * FROM netflixdb.Membre m WHERE m.courriel='${email}' AND m.mot_de_passe='${password}';`);

    }


    public createMovie(titre: string, genre: string, annee_prod: number, duree_totale_min: number): Promise<pg.QueryResult> {
        return this.pool.query(`INSERT INTO netflixdb.Film (ID_film, titre, genre, annee_prod, duree_totale_min) VALUES(DEFAULT, '${titre}', '${genre}', '${annee_prod}', '${duree_totale_min}') RETURNING ID_film;`);
    }


    public editMovie(ID_film: number, titre: string, genre: string, annee_prod: number, duree_totale_min: number): Promise<pg.QueryResult> {
        return this.pool.query( `UPDATE netflixdb.Film
                                SET
                                titre = '${titre}',
                                genre = '${genre}',       
                                annee_prod = ${annee_prod},
                                duree_totale_min = '${duree_totale_min}'
                                WHERE
                                ID_film = '${ID_film}';`
                              );
    }

    public createMembre(nom: string, mot_de_passe: string, courriel: string, no_rue: number, rue: string, code_postal: string, ville: string,  isAdmin: boolean, monthly: boolean): Promise<pg.QueryResult> {
        return this.pool.query(`INSERT INTO netflixdb.Membre (ID_membre, nom, mot_de_passe, courriel, no_rue, rue, code_postal, ville, isAdmin) VALUES(DEFAULT, '${nom}', '${mot_de_passe}', '${courriel}', '${no_rue}', '${rue}', '${code_postal}', '${ville}', '${isAdmin}') RETURNING *;`);
    }

    public createMembreMensuel(ID_membre: number, prix_abonnement: number, date_debut_abonnement: Date, date_fin_abonnement: Date): Promise<pg.QueryResult> {
        
        const insertText = `INSERT INTO netflixdb.Membre_mensuel 
                          (ID_membre, prix_abonnement, date_debut_abonnement, date_fin_abonnement) 
                          VALUES
                          ($1, $2, $3, $4)
                          RETURNING *;`
        return this.pool.query(insertText, [ID_membre, prix_abonnement, date_debut_abonnement, date_fin_abonnement]);
    }

    public createMembrePPV(ID_membre: number): Promise<pg.QueryResult> {
        return this.pool.query(`INSERT INTO netflixdb.Membre_payperview (ID_membre, nb_film_payperview) VALUES(${ID_membre}, 0) RETURNING *;`);
    }

    public createCreditCard(ID_membre: number, titulaire: string, cardNum: number, expDate: string, CCV: number): Promise<pg.QueryResult> {
        return this.pool.query(`INSERT INTO netflixdb.Carte_credit (ID_carte, ID_membre, titulaire, numero, expiration_YYMM, CCV) VALUES(DEFAULT, ${ID_membre}, '${titulaire}', ${cardNum}, '${expDate}', ${CCV}) RETURNING *;`);
    }
	

}
