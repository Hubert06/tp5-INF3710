SET search_path = bdschema;
-- 1) Lister les le numéro et nom des cliniques, leur adresse et leur gestionnaire, ordonnés par le
-- numéro de clinique

-- 2) Lister les noms des animaux sans doublons dans toutes les cliniques
SELECT DISTINCT nom FROM animal; --CTu juste ca!?!?
-- 3) Lister les numéros et noms des propriétaires d’animaux ainsi que les détails de leurs
-- animaux dans une clinique donnée (à vous de la choisir)

-- 4) Lister l’ensemble des examens d’un animal donné
SELECT * FROM examen WHERE (examen.numAni = "A101");
-- 5) Lister le détail des traitements d’un animal suite à un examen donné

-- 6) Lister le salaire total des employés par clinique ordonné par numéro de clinique
SELECT numClinique, SUM(salaire) AS salaireTotal FROM employe GROUP BY numClinique ORDER BY numClinique;
-- 7) Lister le nombre total d’animaux d’un type donné (vous pouvez le choisir) dans chaque
-- clinique

-- 8) Lister le coût minimum, maximum et moyen des traitements
SELECT MIN(cout) as coutMinimum, MAX(cout) AS coutMaximum, AVG(cout) AS coutMoyen FROM traitement;
-- 9) Quels sont les noms des employés de plus de 50 ans ordonnés par nom ?

-- 10) Quels sont les propriétaires dont le nom contient « blay » ?
SELECT * FROM proprietaire WHERE LOWER(nom) LIKE '%blay%';
-- 11) Supprimez le vétérinaire « Jean Tremblay »

-- 12) Lister les détails des propriétaires qui ont un chat et un chien
SELECT * FROM proprietaire WHERE numProp IN 
    (
        SELECT numProp FROM animal WHERE type = 'chat'
        INTERSECT
        SELECT numProp FROM animal WHERE type = 'chien'
    );
-- 13) Lister les détails des propriétaires qui ont un chat ou un chien

-- 14) Lister les détails des propriétaires qui ont un chat mais pas de chien vacciné contre la
-- grippe (la condition vacciné contre la grippe ne s’applique qu’aux chiens)
SELECT * FROM proprietaire WHERE numProp IN 
    (
        SELECT numProp FROM animal WHERE type = 'chat'
        EXCEPT
        SELECT numProp FROM animal WHERE 
            type = 'chien' 
            AND 
            numAni IN 
                (
                    SELECT numAni FROM examen WHERE 
                    numExam = 
                        (
                            SELECT numExam FROM prescription WHERE 
                                numTrait = 
                                    (
                                        SELECT numTrait FROM traitement WHERE
                                            (
                                                description = 'Vaccination contre la grippe'
                                            )
                                    )
                        )
                )
    );
-- 15) Lister tous les animaux d’une clinique donnée avec leurs traitements s’ils existent. Dans le
-- cas contraire, affichez null.
