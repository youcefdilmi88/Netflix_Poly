import { injectable } from "inversify";
import * as pg from "pg";
import "reflect-metadata";
import { Room } from "../tables/Room";
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
    /*

        METHODES DE DEBUG
    */
    public createSchema(): Promise<pg.QueryResult> {

        return this.pool.query(schema);
    }

    public populateDb(): Promise<pg.QueryResult> {

        return this.pool.query(data);
    }

    public getAllFromTable(tableName: string): Promise<pg.QueryResult> {

        return this.pool.query(`SELECT * FROM netflixdb.${tableName};`);
    }

    // HOTEL
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


    // public getHotelNo(): Promise<pg.QueryResult> {

    //     return this.pool.query('SELECT hotelNo FROM HOTELDB.Hotel;');

    // }



    public createMovie(titre: string, genre: string, annee_prod: number, duree_totale_min: number): Promise<pg.QueryResult> {
        return this.pool.query(`INSERT INTO netflixdb.Film (ID_film, titre, genre, annee_prod, duree_totale_min) VALUES(DEFAULT, '${titre}', '${genre}', '${annee_prod}', '${duree_totale_min}') RETURNING ID_film;`);
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
	
	
	public deleteHotel(/*Todo*/): void /*TODO*/  {
		/*TODO*/
	}

    // ROOM
    public getRoomFromHotel(hotelNo: string, roomType: string, price: number): Promise<pg.QueryResult> {

        let query: string =
        `SELECT * FROM HOTELDB.room
        WHERE hotelno=\'${hotelNo}\'`;
        if (roomType !== undefined) {
            query = query.concat('AND ');
            query = query.concat(`typeroom=\'${roomType}\'`);
        }
        if (price !== undefined) {
            query = query.concat('AND ');
            query = query.concat(`price =\'${price}\'`);
        }
        console.log(query);

        return this.pool.query(query);
    }

    public getRoomFromHotelParams(params: object): Promise<pg.QueryResult> {

        let query: string = 'SELECT * FROM HOTELDB.room \n';
        const keys: string[] = Object.keys(params);
        if (keys.length > 0) {
            query = query.concat(`WHERE ${keys[0]} =\'${params[keys[0]]}\'`);
        }

        // On enleve le premier element
        keys.shift();

        // tslint:disable-next-line:forin
        for (const param in keys) {
            const value: string = keys[param];
            query = query.concat(`AND ${value} = \'${params[value]}\'`);
            if (param === 'price') {
                query = query.replace('\'', '');
            }
        }

        console.log(query);

        return this.pool.query(query);

    }

    public createRoom(room: Room): Promise<pg.QueryResult> {
        const values: string[] = [
            room.roomno,
            room.hotelno,
            room.typeroom,
            room.price.toString()
        ];
        const queryText: string = `INSERT INTO HOTELDB.ROOM VALUES($1,$2,$3,$4);`;

        return this.pool.query(queryText, values);
    }

    // GUEST
    public createGuest(guestNo: string,
                       nas: string,
                       guestName: string,
                       gender: string,
                       guestCity: string): Promise<pg.QueryResult> {
        // this.pool.connect();
        const values: string[] = [
            guestNo,
            nas,
            guestName,
            gender,
            guestCity
        ];
        const queryText: string = `INSERT INTO HOTELDB.ROOM VALUES($1,$2,$3,$4,$5);`;

        return this.pool.query(queryText, values);
    }

    // BOOKING
    public createBooking(hotelNo: string,
                         guestNo: string,
                         dateFrom: Date,
                         dateTo: Date,
                         roomNo: string): Promise<pg.QueryResult> {
        const values: string[] = [
            hotelNo,
            guestNo,
            dateFrom.toString(),
            dateTo.toString(),
            roomNo
        ];
        const queryText: string = `INSERT INTO HOTELDB.ROOM VALUES($1,$2,$3,$4,$5);`;

        return this.pool.query(queryText, values);
        }
}
