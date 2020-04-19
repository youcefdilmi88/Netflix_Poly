/*
1) Affichez toutes les informations sur un film spécifié par l'utilisateur (selon le titre).
*/
SELECT *
FROM netflixdb.Film f
WHERE f.titre = 'Reservoir Dogs';



/*
2) Pour chaque genre de film, listez tous les titres de films ainsi que la dernière date à laquelle
un film a été acheté (DVD) ou visionné
*/
SELECT genre, MAX(date_commande) as derniere_commande
FROM netflix.Commande
NATURAL JOIN
(
	(
        SELECT f.titre, f.genre, v.ID_commande
        FROM netflix.Film f
        NATURAL JOIN netflix.Visionnement v
    )
	UNION
	(
        SELECT f.titre, f.genre, l.ID_commande
        FROM netflix.Film f
        NATURAL JOIN netflix.Livraison l
    )
) AS titre_commande
GROUP BY genre;



/*
3) Pour chaque genre de film, trouvez les noms et courriels des membres qui les ont téléchargés
le plus souvent. Par exemple, Amal Z est le membre qui a téléchargé le plus de
documentaires animaliers
*/
WITH my_table AS
(
	WITH subquery AS
	(
		SELECT genre, ID_membre, count(*) as nb_commande
		FROM netflix.Commande
		NATURAL JOIN
			(
				SELECT f.titre, f.genre, v.ID_commande
				FROM netflix.Film f
				NATURAL JOIN netflix.Visionnement v
			) AS titre_visionnement
		GROUP BY genre, ID_membre
	)
	SELECT t1.*
	FROM subquery t1
	INNER JOIN (
		SELECT genre, MAX(nb_commande) nb
		FROM subquery
		GROUP BY genre
	) AS t2
	ON (t1.genre = t2.genre AND t1.nb_commande = t2.nb)
)
SELECT mb.nom, mb.courriel, tb.genre, tb.nb_commande AS nombre_de_visionnement
FROM my_table AS tb
NATURAL JOIN netflix.membre AS mb;



/*
4) Trouvez le nombre total de films groupés par réalisateur
*/
WITH fe1 AS 
(
	SELECT * 
	FROM netflix.Film
	NATURAL JOIN netflix.Film_Employe
)
SELECT nom AS realisateur, COUNT(*) AS nb_films_realises
FROM fe1 
NATURAL JOIN netflix.Employe
WHERE role_employe = 'realisateur'
GROUP BY nom;



/*
5) Trouvez les noms des membres dont le coût total d’achat de DVD est plus élevé que la
moyenne
*/
SELECT me.nom
FROM netflix.Membre AS me
NATURAL JOIN (
	WITH myquery AS (
		SELECT me.ID_membre, SUM(l.prix) mysum
		FROM netflix.Livraison l NATURAL JOIN netflix.Commande co NATURAL JOIN netflix.Membre me
		GROUP BY me.ID_membre
	)
	SELECT mq.ID_membre
	FROM myquery mq
	WHERE mq.mysum > (SELECT AVG(mysum) FROM myquery)
) AS dessus_moyenne;



/*
6) Ordonnez et retournez les films en termes de quantité totale vendue (DVD) et en nombre de
téléchargements
*/
SELECT titre, COUNT(*)
FROM netflix.Commande
NATURAL JOIN
(
	(
        SELECT f.titre, f.genre, v.ID_commande
        FROM netflix.Film f
        NATURAL JOIN netflix.Visionnement v
    )
	UNION
	(
        SELECT f.titre, f.genre, l.ID_commande
        FROM netflix.Film f
        NATURAL JOIN netflix.Livraison l
    )
) AS titre_commande
GROUP BY titre
ORDER BY count DESC;



/* 
7) Trouvez le titre et le prix des films qui n’ont jamais été commandés sous forme de DVD mais
qui ont été téléchargés plus de 10 fois
*/ 
SELECT ID_film, titre, COUNT(*)
FROM 
(
	SELECT f.ID_film, f.titre
	FROM netflix.Film f
	NATURAL JOIN netflix.Visionnement v
	EXCEPT ALL
	(
		SELECT f.ID_film, f.titre
		FROM netflix.Film f
		NATURAL JOIN netflix.Livraison l
	)
) AS only_download
GROUP BY ID_film, titre
HAVING COUNT(*) > 10;




/*
8) Trouvez le nom et date de naissance des acteurs qui jouent dans les films qui sont téléchargés
le plus souvent (soit plus que la moyenne)
*/
SELECT em.nom, (date_part('year', CURRENT_DATE)) - em.age AS date_de_naissance
FROM netflix.Employe em
WHERE em.ID_employe IN
(
	SELECT ID_employe 
	FROM netflix.Film_employe
	NATURAL JOIN (
		WITH my_query AS
		(
			SELECT ID_film, titre, COUNT(*) AS my_count
			FROM netflix.Film NATURAL JOIN netflix.Visionnement
			GROUP BY ID_film, titre
		)
		SELECT mq.ID_film
		FROM my_query mq
		WHERE mq.my_count > (SELECT AVG(my_count) FROM my_query)
	) AS foo
);



/*
9) Trouvez le nom du ou des réalisateurs qui ont réalisé les films qui ont le plus grand nombre
de nominations aux oscars. Par exemple, Woody Allen et Steven Spielberg ont réalisé 10
films qui ont été nominés aux oscars.
*/
WITH my_query AS
(
	SELECT ID_film, titre, COUNT(*) as nb_oscars
	FROM netflix.Film
	NATURAL JOIN netflix.Oscars
	GROUP BY ID_film, titre
)
SELECT * 
FROM my_query
WHERE nb_oscars=(SELECT MAX(nb_oscars) FROM my_query);



/*
11) Trouvez les films (titre, année) qui ont gagné le plus d’oscars. Listez également leur
réalisateurs et leurs acteurs;
*/
WITH my_query3 AS (
	WITH my_query2 AS (
		WITH my_query1 AS
		(
			SELECT ID_film, titre, annee_prod, COUNT(*) as nb_oscars
			FROM netflix.Film
			NATURAL JOIN netflix.Oscars
			GROUP BY ID_film, titre
		)
		SELECT mq.ID_film, mq.titre, mq.annee_prod
		FROM my_query1 mq
		WHERE mq.nb_oscars > (SELECT AVG(nb_oscars) FROM my_query1)
	)
	SELECT fe.ID_employe, fe.role_employe, mq2.titre
	FROM netflix.Film_Employe fe
	NATURAL JOIN my_query2 mq2
	WHERE fe.role_employe IN ('realisateur', 'primaire', 'secondaire')
)
SELECT mq3.titre, em.ID_employe, em.nom, mq3.role_employe
FROM netflix.Employe em 
NATURAL JOIN my_query3 AS mq3;



/*
12) Quelles paires de femmes québécoises ont le plus souvent travaillé ensemble dans différents
films ?
*/



/*
13) Comment a évolué la carrière de Quentin Tarantino ? (On veut connaitre tous ses rôles dans un
film (réalisateur, acteur, etc.) du plus ancien au plus récent)
*/
SELECT em.nom, fe.role_employe, fi.titre, fi.annee_prod
FROM netflix.Employe em
NATURAL JOIN netflix.Film_Employe fe
NATURAL JOIN netflix.Film fi
WHERE em.nom = 'Quentin Tarantino'
ORDER BY fi.annee_prod;