CREATE USER netflix_user encrypted password 'netflix123';
GRANT ALL PRIVILEGES ON DATABASE netflix_poly to netflix_user;

CREATE SCHEMA IF NOT EXISTS netflix
AUTHORIZATION netflix_user;

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA netflix TO netflix_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA PUBLIC TO netflix_user;

SET search_path TO netflix, public;


CREATE TABLE IF NOT EXISTS Membre (
	ID_membre 		SERIAL,
	nom 			VARCHAR(255) NOT NULL,
	mot_de_passe 	VARCHAR(255) NOT NULL,
	courriel 		VARCHAR(255) NOT NULL,
	no_rue 			INT NOT NULL,
	rue 			VARCHAR(255) NOT NULL,
	code_postal 	VARCHAR(255) NOT NULL,
	ville			VARCHAR(255) NOT NULL,
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


/*Commande et Membre n'ont pas une relation identifiante car on doit pouvoir retrouver les commandes même si le membre est supprimé*/
CREATE TABLE IF NOT EXISTS Commande (
	ID_commande 	SERIAL,
	ID_membre 		INT NOT NULL,
	PRIMARY KEY 	(ID_commande),
	FOREIGN KEY 	(ID_membre) REFERENCES Membre(ID_membre)
);


/*DVD et Livraison n'ont pas une relation identifiante car on doit pouvoir retrouver les livraisons même si le DVD est supprimé*/
CREATE TABLE IF NOT EXISTS Livraison (
	ID_commande 			INT,
	prix					NUMERIC(4, 2) NOT NULL,
	date_livraison			DATE NOT NULL, 				
	distance			 	DATE NOT NULL,
	PRIMARY KEY 			(ID_commande),
	FOREIGN KEY 			(ID_commande) REFERENCES Commande(ID_commande)
);


/*Visionnement et Film n'ont pas une relation identifiante car on doit pouvoir retrouver les visionnements même si le film est supprimé*/
CREATE TABLE IF NOT EXISTS Visionnement (
	ID_commande 			INT,
	prix					NUMERIC(4, 2) NOT NULL,
	date_visionnement		DATE NOT NULL,
	stop_time_sec			INT NOT NULL,
	PRIMARY KEY 			(ID_commande),
	FOREIGN KEY 			(ID_commande) REFERENCES Commande(ID_commande)
);


CREATE TABLE IF NOT EXISTS Film (
	ID_film		 			SERIAL,
	titre					VARCHAR(255) NOT NULL,
	genre					VARCHAR(255),
	date_production			DATE,
	duree_totale_sec		INT,
	PRIMARY KEY 			(ID_film)
);


/*Film et DVD ont une relation identifiante car on peut supprimer les DVDs lorsque le film est supprimé*/
CREATE TABLE IF NOT EXISTS DVD (
	ID_dvd		 			SERIAL,
	ID_film					INT,
	ID_livraison			INT NOT NULL,
	PRIMARY KEY 			(ID_dvd, ID_film),
	FOREIGN KEY 			(ID_film) REFERENCES Film(ID_film),
	FOREIGN KEY 			(ID_livraison) REFERENCES Livraison(ID_commande) ON UPDATE CASCADE ON DELETE CASCADE
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
	salaire					NUMERIC(9,2),
	PRIMARY KEY 			(ID_film, ID_employe, role_employe),
	FOREIGN KEY 			(ID_film) REFERENCES Film(ID_film),
	FOREIGN KEY 			(ID_employe) REFERENCES Employe(ID_employe)
);


/*Carte_credit et Membre ont une relation identifiante car on peut supprimer les informations de la carte lorsque le membre est supprimé*/
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


/*
Oscars et Ceremonie_oscars n'ont pas une relation identifiante car on doit pouvoir retrouver les oscars même si la cérémonie est supprimée
Film et Oscars ont une relation identifiante car on peut supprimer les oscars lorsque le film est supprimé
*/
CREATE TABLE IF NOT EXISTS Oscars (
	ID_oscar				SERIAL,
	ID_film					INT,
	ID_ceremonie			INT,
	gagne_bool				BOOLEAN NOT NULL,
	categorie				VARCHAR(255) NOT NULL,
	PRIMARY KEY 			(ID_oscar, ID_film),
	FOREIGN KEY 			(ID_film) REFERENCES Film(ID_film) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY 			(ID_ceremonie) REFERENCES Ceremonie_oscars(ID_ceremonie)
);



