export const schema: string = `
SET search_path = netflixdb;

DROP SCHEMA IF EXISTS netflixdb CASCADE;
CREATE SCHEMA netflixdb;

CREATE TABLE IF NOT EXISTS Membre (
	ID_membre 		SERIAL,
	nom 			VARCHAR(255) NOT NULL,
	mot_de_passe 	VARCHAR(255) NOT NULL,
	courriel 		VARCHAR(255) UNIQUE NOT NULL,
	no_rue 			INT NOT NULL,
	rue 			VARCHAR(255) NOT NULL,
	code_postal 	VARCHAR(255) NOT NULL,
	ville			VARCHAR(255) NOT NULL,
	isAdmin			BOOLEAN NOT NULL,
	PRIMARY KEY		(ID_membre)
);


CREATE TABLE IF NOT EXISTS Membre_mensuel (
	ID_membre		 		INT,
	prix_abonnement 		NUMERIC(4, 2) NOT NULL,
	date_debut_abonnement	DATE NOT NULL,
	date_fin_abonnement 	DATE NOT NULL,
	PRIMARY KEY 			(ID_membre),
	FOREIGN KEY 			(ID_membre) REFERENCES Membre(ID_membre)
);


CREATE TABLE IF NOT EXISTS Membre_payperview (
	ID_membre	 			INT,
	nb_film_payperview 		INT NOT NULL,
	PRIMARY KEY 			(ID_membre),
	FOREIGN KEY 			(ID_membre) REFERENCES Membre(ID_membre)
);


CREATE TABLE IF NOT EXISTS Commande (
	ID_commande 	SERIAL,
	ID_membre 		INT NOT NULL,
	date_commande	DATE,
	PRIMARY KEY 	(ID_commande),
	FOREIGN KEY 	(ID_membre) REFERENCES Membre(ID_membre)
);

CREATE TABLE IF NOT EXISTS Film (
	ID_film		 			SERIAL,
	titre					VARCHAR(255) NOT NULL,
	genre					VARCHAR(255),
	annee_prod				INT,
	duree_totale_min		INT,
	PRIMARY KEY 			(ID_film)
);


CREATE TABLE IF NOT EXISTS Livraison (
	ID_commande 			INT,
	ID_film					INT NOT NULL,
	prix					NUMERIC(4, 2) NOT NULL,				
	distance			 	INT,
	PRIMARY KEY 			(ID_commande),
	FOREIGN KEY 			(ID_commande) REFERENCES Commande(ID_commande),
	FOREIGN KEY 			(ID_film) REFERENCES Film(ID_film)
);

CREATE TABLE IF NOT EXISTS DVD (
	ID_dvd		 			SERIAL,
	no_instance				INT NOT NULL,
	ID_film					INT NOT NULL,
	ID_livraison			INT,
	PRIMARY KEY 			(ID_dvd, ID_film),
	FOREIGN KEY 			(ID_film) REFERENCES Film(ID_film) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY 			(ID_livraison) REFERENCES Livraison(ID_commande)
);

CREATE TABLE IF NOT EXISTS Visionnement (
	ID_commande 			INT,
	ID_film					INT NOT NULL,
	prix					NUMERIC(4, 2) NOT NULL,
	stop_time_sec			INT NOT NULL,
	PRIMARY KEY 			(ID_commande),
	FOREIGN KEY 			(ID_commande) REFERENCES Commande(ID_commande),
	FOREIGN KEY				(ID_film) REFERENCES Film(ID_film)
);


CREATE TYPE SEXE AS ENUM ('M', 'F', 'AUTRE');
CREATE TABLE IF NOT EXISTS Employe (
	ID_employe				SERIAL,
	nom						VARCHAR(255) NOT NULL,
	age						INT,
	sexe					SEXE,
	nationalite				VARCHAR(255),
	PRIMARY KEY 			(ID_employe)
);


CREATE TABLE IF NOT EXISTS Film_Employe (
	ID_film					INT,
	ID_employe				INT,
	role_employe			VARCHAR(255),
	salaire					INT,
	PRIMARY KEY 			(ID_film, ID_employe, role_employe),
	FOREIGN KEY 			(ID_film) REFERENCES Film(ID_film),
	FOREIGN KEY 			(ID_employe) REFERENCES Employe(ID_employe)
);


CREATE TABLE IF NOT EXISTS Carte_credit (
	ID_carte				SERIAL,
	ID_membre				INT,
	titulaire				VARCHAR(255) NOT NULL,
	numero					CHAR(16) UNIQUE NOT NULL,
	expiration_YYMM			CHAR(4) NOT NULL,
	CCV						CHAR(3) NOT NULL,
	PRIMARY KEY 			(ID_carte, ID_membre),
	FOREIGN KEY 			(ID_membre) REFERENCES Membre(ID_membre) ON UPDATE CASCADE ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS Ceremonie_oscars (
	ID_ceremonie			SERIAL,
	date_ceremonie			DATE NOT NULL,
	maitre					VARCHAR(255),
	lieu					VARCHAR(255) NOT NULL,
	PRIMARY KEY 			(ID_ceremonie)
);


CREATE TABLE IF NOT EXISTS Oscars (
	ID_oscar				SERIAL,
	ID_film					INT,
	ID_ceremonie			INT,
	isWon					BOOLEAN NOT NULL,
	categorie				VARCHAR(255) NOT NULL,
	PRIMARY KEY 			(ID_oscar, ID_film),
	FOREIGN KEY 			(ID_film) REFERENCES Film(ID_film) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY 			(ID_ceremonie) REFERENCES Ceremonie_oscars(ID_ceremonie)
);

`;
