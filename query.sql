SET search_path = bdschema;
-- 1) Lister les le numéro et nom des cliniques, leur adresse et leur gestionnaire, ordonnés par le
-- numéro de clinique
SELECT Clinique.numClinique, Clinique.adresse, Employe.* FROM Clinique
INNER JOIN Employe ON fonction = 'Gestionnaire' WHERE Clinique.numClinique = Employe.numClinique
ORDER BY Clinique.numClinique;

-- 2) Lister les noms des animaux sans doublons dans toutes les cliniques
SELECT DISTINCT nom FROM animal;

-- 3) Lister les numéros et noms des propriétaires d’animaux ainsi que les détails de leurs
-- animaux dans une clinique donnée (à vous de la choisir)
SELECT Proprietaire.numProp, Proprietaire.nom, Animal.numAni, Animal.nom, Animal.type, Animal.description, Animal.dob, Animal.dateInsc, Animal.etat FROM Proprietaire 
LEFT JOIN Animal ON Proprietaire.numProp = Animal.numProp
WHERE Proprietaire.numClinique = 'C001';

-- 4) Lister l’ensemble des examens d’un animal donné
SELECT * FROM examen WHERE (examen.numAni = "A101");
-- 5) Lister le détail des traitements d’un animal suite à un examen donné
SELECT Traitement.numTrait, Traitement.description, Traitement.cout, Prescription.numExam, Prescription.qte, Prescription.dateDebut, Prescription.dateFin FROM Traitement 
LEFT JOIN Prescription 
ON Prescription.numExam = 'EX101'
WHERE Traitement.numTrait = Prescription.numTrait;

-- 6) Lister le salaire total des employés par clinique ordonné par numéro de clinique
SELECT numClinique, SUM(salaire) AS salaireTotal FROM employe GROUP BY numClinique ORDER BY numClinique;

-- 7) Lister le nombre total d’animaux d’un type donné (vous pouvez le choisir) dans chaque
-- clinique
SELECT COUNT(*) FROM Animal
LEFT JOIN Proprietaire ON Animal.numProp = Proprietaire.numProp
WHERE Animal.type = 'Labrador'
GROUP BY Proprietaire.numClinique;

-- 8) Lister le coût minimum, maximum et moyen des traitements
SELECT MIN(cout) as coutMinimum, MAX(cout) AS coutMaximum, AVG(cout) AS coutMoyen FROM traitement;

-- 9) Quels sont les noms des employés de plus de 50 ans ordonnés par nom ?
SELECT nom FROM Employe WHERE dob < '1969-04-14' ORDER BY nom;

-- 10) Quels sont les propriétaires dont le nom contient « blay » ?
SELECT * FROM proprietaire WHERE LOWER(nom) LIKE '%blay%';

-- 11) Supprimez le vétérinaire « Jean Tremblay »
DELETE FROM Employe WHERE fonction = 'Veterinaire' AND nom = 'Jean Tremblay';

-- 12) Lister les détails des propriétaires qui ont un chat et un chien
SELECT * FROM proprietaire WHERE numProp IN 
    (
        SELECT numProp FROM animal WHERE type = 'chat'
        INTERSECT
        SELECT numProp FROM animal WHERE type = 'chien'
    );

-- 13) Lister les détails des propriétaires qui ont un chat ou un chien
SELECT * FROM proprietaire WHERE numProp IN 
    (
        SELECT numProp FROM animal WHERE type = 'chat'
        UNION
        SELECT numProp FROM animal WHERE type = 'chien'
    );

-- 14) Lister les détails des propriétaires qui ont un chat mais pas de chien vacciné contre la
-- grippe (la condition vacciné contre la grippe ne s’applique qu’aux chiens)
SELECT * FROM proprietaire WHERE numProp IN 
    (
        SELECT numProp FROM animal WHERE type = 'chat'
        EXCEPT
        SELECT numProp FROM animal 
        LEFT JOIN Examen ON Animal.numAni = Examen.numAni
        LEFT JOIN Prescription ON Prescription.numExam = Examen.numExam
        LEFT JOIN Traitement  ON Traitement.numTrait = Prescription.numTrait
        WHERE traitement.description = 'Vaccination contre la grippe'
    );

-- 15) Lister tous les animaux d’une clinique donnée avec leurs traitements s’ils existent. Dans le
-- cas contraire, affichez null.
SELECT Animal.numAni, Animal.numProp, Animal.nom, Animal.type, Animal.description, Animal.dob,
Animal.dateInsc, Animal.etat, Traitement.numTrait, Traitement.description, Traitement.cout FROM Traitement
LEFT JOIN Prescription ON Traitement.numTrait = Prescription.numTrait
LEFT JOIN EXAMEN ON Prescription.numExam = Examen.numExam
LEFT JOIN Animal ON Examen.numAni = Animal.numAni
LEFT JOIN Proprietaire ON Animal.numProp = Proprietaire.numProp
WHERE numClinique = 'C001';
