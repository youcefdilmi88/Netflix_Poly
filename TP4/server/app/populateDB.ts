export const data: string = `SET search_path = netflixdb;

INSERT INTO Membre
(ID_membre, nom, mot_de_passe, courriel, no_rue, rue, code_postal, ville, isAdmin)
VALUES
(DEFAULT, 'admin', 'admin', 'admin@admin.ca', 2500, 'Chemin de Polytechnique', 'H3T 1J4', 'Montreal', 'true'),
(DEFAULT, 'Youcef Dilmi', 'poly123', 'youcef.dilmi@polymtl.ca', 5265, 'Avenue de Courtrai', 'H3W 0B1', 'Montreal', 'false'),
(DEFAULT, 'Charles-Éric Langlois', 'poly123', 'charles.eric.langlois@polymtl.ca', 150, 'Saint-Catherine St W', 'H2X 3Y2', 'Montreal', 'false'),
(DEFAULT, 'Foo', 'poly123', 'foo@polymtl.ca', 275, 'Notre-Dame St. East', 'H3T 1J4', 'Montreal', 'false'),
(DEFAULT, 'Bar', 'poly123', 'bar@polymtl.ca', 1045 , 'Rue des Parlementaires', 'G1A 1A3', 'Quebec', 'false'),
(DEFAULT, 'Philippe A. Tanguy', 'poly123', 'tanguy@polymtl.ca', 111, 'Wellington St', 'K1A 0A9', 'Ottawa', 'false');

INSERT INTO Membre_mensuel
(ID_membre, prix_abonnement, date_debut_abonnement, date_fin_abonnement)
VALUES
(2, 15.99, '2019-12-10', '2020-12-10'),
(3, 16.99, '2018-02-01', '2019-02-01');

INSERT INTO Membre_payperview 
(ID_membre, nb_film_payperview)
VALUES
(4, 2),
(5, 1),
(6, 1);

INSERT INTO Commande 
(ID_commande, ID_membre)
VALUES
(DEFAULT, 2),
(DEFAULT, 2),
(DEFAULT, 3),
(DEFAULT, 3),
(DEFAULT, 4),
(DEFAULT, 5),
(DEFAULT, 6);

INSERT INTO Livraison
(ID_commande, ID_dvd, prix, date_livraison, distance)
VALUES
(1, 1, 01.00, '2020-02-01', 4),
(3, 4, 01.55, '2020-03-12', 6.2),
(7, 5, 48.50, '2020-01-01', 194);

INSERT INTO Visionnement
(ID_commande, ID_film, prix, date_visionnement, stop_time_sec)
VALUES
(2, 1, 00.00, '2020-03-10', 1000),
(4, 2, 00.00, '2020-03-12', 2000),
(5, 3, 04.99, '2020-01-01', 3000),
(6, 3, 04.99, '2020-01-01', 4000);

INSERT INTO Film
(ID_film, titre, genre, annee_prod, duree_totale_min)
VALUES
(DEFAULT, 'Reservoir Dogs', 'Crime', 1992, 99),
(DEFAULT, 'Pulp Fiction', 'Crime', 1994, 154),
(DEFAULT, 'Casino', 'Crime', 1995, 178),
(DEFAULT, 'Goodfellas', 'Biographie', 1990, 146),
(DEFAULT, 'Taxi Driver', 'Drame', 1976, 114),
(DEFAULT, 'Rain Man', 'Drame', 1988, 133);

INSERT INTO DVD
(ID_dvd, no_instance, ID_film, ID_livraison)
VALUES
(DEFAULT, 1, 1, 1),
(DEFAULT, 2, 1, 3),
(DEFAULT, 1, 5, 1),
(DEFAULT, 2, 5, 3),
(DEFAULT, 1, 2, 7),
(DEFAULT, 1, 3, 7),
(DEFAULT, 1, 4, 7),
(DEFAULT, 1, 6, 7);

INSERT INTO Employe
(ID_employe, nom, age, sexe, nationalite)
VALUES
(DEFAULT, 'Quentin Tarantino', 50, 'M', 'USA'),
(DEFAULT, 'Harvey Keitel', 50, 'M', 'USA'),
(DEFAULT, 'Tim Roth', 50, 'M', 'USA'),
(DEFAULT, 'Roger Avary', 50, 'M', 'USA'),
(DEFAULT, 'John Travolta', 55, 'M', 'USA'),
(DEFAULT, 'Uma Thurman', 51, 'F', 'USA'),
(DEFAULT, 'Samuel L. Jackson', 51, 'M', 'USA'),
(DEFAULT, 'Dustin Hoffman', 60, 'M', 'USA'),
(DEFAULT, 'Nicholas Pileggi', 60, 'M', 'USA'),
(DEFAULT, 'Martin Scorsese', 70, 'M', 'USA'),
(DEFAULT, 'Robert De Niro', 75, 'M', 'USA'),
(DEFAULT, 'Jodie Foster', 52, 'F', 'USA'),
(DEFAULT, 'Sharon Stone', 52, 'F', 'USA'),
(DEFAULT, 'Joe Pesci', 52, 'M', 'USA'),
(DEFAULT, 'Ray Liotta', 52, 'M', 'USA'),
(DEFAULT, 'Paul Schrader', 52, 'M', 'USA'),
(DEFAULT, 'Cybill Shepherd', 52, 'M', 'USA'),
(DEFAULT, 'Barry Levinson', 52, 'M', 'USA'),
(DEFAULT, 'Tom Cruise', 52, 'M', 'USA'),
(DEFAULT, 'Valeria Golino', 52, 'F', 'USA'),
(DEFAULT, 'Barry Morrow', 52, 'M', 'USA'),
(DEFAULT, 'Ronald Bass', 52, 'M', 'USA');


INSERT INTO Film_Employe
(ID_film, ID_employe, role_employe, salaire)
VALUES
(1, 1, 'auteur', 5000000),
(1, 4, 'auteur', 5000000),
(1, 1, 'realisateur', 5000000),
(1, 2, 'primaire', 5000000),
(1, 3, 'primaire', 5000000),
(2, 4, 'auteur', 2000000),
(2, 1, 'realisateur', 2000000),
(2, 5, 'primaire', 10000000),
(2, 6, 'primaire', 3000000),
(2, 7, 'secondaire', 3000000),
(3, 10, 'realisateur',     8000000),
(3, 9, 'auteur',     8000000),
(3, 10, 'auteur',     8000000),
(3, 11, 'primaire',  9000000),
(3, 13, 'primaire',  9000000),
(3, 14, 'secondaire',  9000000),
(4, 10, 'realisateur',     8000000),
(4, 9, 'auteur',     8000000),
(4, 10, 'auteur',     8000000),
(4, 11, 'primaire', 10000000),
(4, 15, 'primaire', 10000000),
(4, 14, 'secondaire', 10000000),
(5, 10, 'realisateur',     3000000),
(5, 16, 'auteur',     3000000),
(5, 11, 'primaire',  4000000),
(5, 12, 'primaire', 7000000),
(5, 17, 'secondaire', 7000000),
(6, 8, 'primaire',  3000000),
(6, 19, 'primaire',  3000000),
(6, 20, 'secondaire',  3000000),
(6, 19, 'realisateur',  3000000),
(6, 21, 'auteur',  3000000),
(6, 22, 'auteur',  3000000);



INSERT INTO Carte_credit
(ID_carte, ID_membre, titulaire, numero, expiration_YYMM, CCV)
VALUES
(DEFAULT, 2, 'Youcef Dilmi', 1234567891111111, 2012, 222),
(DEFAULT, 3, 'Charles-Éric Langlois', 1234567892222222, 2112, 111),
(DEFAULT, 4, 'Foo', 1234567893333333, 2212, 789),
(DEFAULT, 5, 'Bar', 1234567894444444, 2312, 456),
(DEFAULT, 6, 'Philippe A. Tanguy', 1234567895555555, 2412, 123);

INSERT INTO Ceremonie_oscars
(ID_ceremonie, date_ceremonie, maitre, lieu)
VALUES
(DEFAULT, '1994-06-06', 'Rocky Balboa', 'Boston'),
(DEFAULT, '1995-06-06', 'Forrest Gump', 'Los Angeles'),
(DEFAULT, '1990-06-06', 'Hannibal Lecter', 'Chicago'),
(DEFAULT, '1976-06-06', 'Yoda', 'New York'),
(DEFAULT, '1988-06-06', 'Ace Ventura', 'Washington');

INSERT INTO Oscars
(ID_oscar, ID_film, ID_ceremonie, isWon, categorie)
VALUES
(DEFAULT, 2, 1, true, 'Meilleur scenario'),
(DEFAULT, 2, 1, false, 'Meilleur film'),
(DEFAULT, 3, 2, false, 'Meilleur actrice'),
(DEFAULT, 4, 3, true, 'Meilleur acteur'),
(DEFAULT, 4, 3, false, 'Meilleur film'),
(DEFAULT, 5, 4, false, 'Meilleur acteur'),
(DEFAULT, 5, 4, false, 'Meilleur film'),
(DEFAULT, 6, 5, true, 'Meilleur acteur'),
(DEFAULT, 6, 5, true, 'Meilleur film'),
(DEFAULT, 6, 5, true, 'Meilleur realisateur');

`;
