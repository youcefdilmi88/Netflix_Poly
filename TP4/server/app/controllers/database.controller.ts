import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import * as pg from "pg";
import { Movie } from "../tables/Movie";
import { Membre } from '../tables/Membre';
import { Participant } from '../tables/participant';
import { Nomination } from '../tables/nomination';
import { DatabaseService } from "../services/database.service";
import Types from "../types";

@injectable()
export class DatabaseController {
    public constructor(@inject(Types.DatabaseService) private databaseService: DatabaseService) { }

    public fin_abonnement(duree_abonnement: number): Date {
        let d = new Date();
        return new Date(d.setFullYear(d.getFullYear() + duree_abonnement));
    }

    public toDateString(currentDate: Date): string {
        return currentDate.toISOString().split('T')[0];
    }

    public get router(): Router {
        const router: Router = Router();

        router.post("/createSchema",
                    (req: Request, res: Response, next: NextFunction) => {
                    this.databaseService.createSchema().then((result: pg.QueryResult) => {
                        res.json(result);
                    }).catch((e: Error) => {
                        console.error(e.stack);
                    });
                });

        router.post("/populateDb",
                    (req: Request, res: Response, next: NextFunction) => {
                    this.databaseService.populateDb().then((result: pg.QueryResult) => {
                        res.json(result);
                    }).catch((e: Error) => {
                        console.error(e.stack);
                    });
        });

        router.get("/movies",
                   (req: Request, res: Response, next: NextFunction) => {
                    // Send the request to the service and send the response
                    this.databaseService.getMovies().then((result: pg.QueryResult) => {
                    const movies: Movie[] = result.rows.map((mov: any) => (
                        {
                        ID_film: mov.id_film,
                        titre: mov.titre,
                        genre: mov.genre,
                        annee_prod: mov.annee_prod,
                        duree_totale_min: mov.duree_totale_min
                    }));
                    res.json(movies);
                }).catch((e: Error) => {
                    console.error(e.stack);
                });
            });

        router.get("/membres",
            (req: Request, res: Response, next: NextFunction) => {
             // Send the request to the service and send the response
             this.databaseService.getMembres().then((result: pg.QueryResult) => {
             const membres: Membre[] = result.rows.map((mem: any) => (
                 {
                 ID_membre: mem.id_membre,
                 nom: mem.nom,
                 mot_de_passe: mem.mot_de_passe,
                 courriel: mem.courriel,
                 no_rue: mem.no_rue,
                 rue: mem.rue,
                 code_postal: mem.code_postal,
                 ville: mem.ville,
                 isAdmin: mem.isadmin
             }));
             res.json(membres);
         }).catch((e: Error) => {
             console.error(e.stack);
         });
     });



        router.delete("/movies/delete",
            (req: Request, res: Response, next: NextFunction) => {
            this.databaseService.deleteMovie(req.query.id).then((result: pg.QueryResult) => {
                console.log(result);
                res.json(result.rowCount);
            }).catch((e: Error) => {
                console.error(e.stack);
            });
        });


        router.get("/login",
                (req: Request, res: Response, next: NextFunction) => {
                // Send the request to the service and send the response
                this.databaseService.login(req.query.email, req.query.password).then((result: pg.QueryResult) => {
                const membres: Membre[] = result.rows.map((mem: any) => (
                    {
                    ID_membre: mem.id_membre,
                    nom: mem.nom,
                    mot_de_passe: mem.mot_de_passe,
                    courriel: mem.courriel,
                    no_rue: mem.no_rue,
                    rue: mem.rue,
                    code_postal: mem.code_postal,
                    ville: mem.ville,
                    isAdmin: mem.isadmin,
                }));
                console.log(membres);
                res.json(membres);
            }).catch((e: Error) => {
                console.error(e.stack);
            });
        });


        router.get("/nominations",
        (req: Request, res: Response, next: NextFunction) => {
                // Send the request to the service and send the response
                this.databaseService.getNominations(req.query.id).then((result: pg.QueryResult) => {
                const nominations: Nomination[] = result.rows.map((nom: any) => (
                    {
                        ID_oscar: nom.id_oscar,
                        ID_film: nom.id_film,
                        ID_ceremonie: nom.id_ceremonie,
                        isWon: nom.iswon,
                        categorie: nom.categorie,
                }));
                console.log(nominations);
                res.json(nominations);
            }).catch((e: Error) => {
                console.error(e.stack);
            });
        });

        router.get("/distribution",
        (req: Request, res: Response, next: NextFunction) => {
                // Send the request to the service and send the response
                this.databaseService.getDistribution(req.query.id).then((result: pg.QueryResult) => {
                const distribution: Participant[] = result.rows.map((par: any) => (
                    {
                        ID_film: par.id_film,
                        ID_employe: par.id_employe,
                        role_employe: par.role_employe,
                        salaire: par.salaire,
                        nom: par.nom,
                        age: par.age,
                        sexe: par.sexe,
                        nationalite: par.nationalite,
                }));
                console.log(distribution);
                res.json(distribution);
            }).catch((e: Error) => {
                console.error(e.stack);
            });
        });


        router.post("/movies/insert",
                    (req: Request, res: Response, next: NextFunction) => {
                        const titre: string = req.body.titre;
                        const genre: string = req.body.genre;
                        const annee_prod: number = req.body.annee_prod;
                        const duree_totale_min: number = req.body.duree_totale_min;
                        this.databaseService.createMovie(titre, genre, annee_prod, duree_totale_min).then((result: pg.QueryResult) => {
                        console.log(result.rows[0].id_film);
                        res.json(result.rowCount);

                    }).catch((e: Error) => {
                        console.error(e.stack);
                        res.json(-1);
                    });
        });

        router.put("/movies/edit",
                (req: Request, res: Response, next: NextFunction) => {
                    const ID_film = req.body.ID_film;
                    const titre: string = req.body.titre;
                    const genre: string = req.body.genre;
                    const annee_prod: number = req.body.annee_prod;
                    const duree_totale_min: number = req.body.duree_totale_min;
                    this.databaseService.editMovie(ID_film, titre, genre, annee_prod, duree_totale_min).then((result: pg.QueryResult) => {
                    res.json(result.rowCount);

                }).catch((e: Error) => {
                    console.error(e.stack);
                    res.json(-1);
                });
        });

        

        router.post("/membres/insert",
            (req: Request, res: Response, next: NextFunction) => {
                const nom: string = req.body.nom;
                const mot_de_passe: string = req.body.mot_de_passe;
                const courriel: string = req.body.courriel;
                const no_rue: number = req.body.no_rue;
                const rue: string = req.body.rue;
                const code_postal: string = req.body.code_postal;
                const ville: string = req.body.ville;
                const isAdmin: boolean = req.body.isAdmin;
                const monthly: boolean = req.body.monthly;
                const cardNum: number = req.body.cardNum;
                const expDate: string = req.body.expDate;
                const CCV: number = req.body.CCV;
                this.databaseService.createMembre(nom, mot_de_passe, courriel, no_rue, rue, code_postal, ville, isAdmin, monthly).then((result: pg.QueryResult) => {
                    this.databaseService.createCreditCard(result.rows[0].id_membre, nom, cardNum, expDate, CCV).then((result: pg.QueryResult) => {
                        console.log(result.rows);
                        }).catch((e: Error) => {
                            console.error(e.stack);
                            res.json(-1);
                        });
                    if (monthly) {
                        this.databaseService.createMembreMensuel(result.rows[0].id_membre, 15.99, new Date(), this.fin_abonnement(1)).then((result: pg.QueryResult) => {
                        res.json(result.rowCount);
                        }).catch((e: Error) => {
                            console.error(e.stack);
                            res.json(-1);
                        });
                    } else {
                        this.databaseService.createMembrePPV(result.rows[0].id_membre).then((result: pg.QueryResult) => {
                        res.json(result.rowCount);
                        }).catch((e: Error) => {
                            console.error(e.stack);
                            res.json(-1);
                        });
                    }
                })
            });

	

        router.get("/tables/:tableName",
                   (req: Request, res: Response, next: NextFunction) => {
                this.databaseService.getAllFromTable(req.params.tableName)
                    .then((result: pg.QueryResult) => {
                        res.json(result.rows);
                    }).catch((e: Error) => {
                        console.error(e.stack);
                    });
            });

        return router;
    }
}
