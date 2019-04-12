SET search_path = TP5;
DROP SCHEMA IF EXISTS bdschema CASCADE;
CREATE SCHEMA bdschema;

CREATE TABLE IF NOT EXISTS bdschema.Clinique (
    numClinique VARCHAR(10),
    adresse VARCHAR(30),
    numTelephone VARCHAR(15),
    numTelecopieur VARCHAR(15),
    PRIMARY KEY (numClinique)
);

CREATE TABLE IF NOT EXISTS bdschema.Employe (
    numEmp VARCHAR(10),
    numClinique VARCHAR(10),
    nom VARCHAR(30),
    adresse VARCHAR(30),
    numTelephone VARCHAR(15),
    dob DATE,
    sexe VARCHAR(1) CHECK (sexe = 'M' OR sexe = 'F'),
    nas VARCHAR(10),
    fonction VARCHAR(30),
    salaire NUMERIC,
    PRIMARY KEY (numEmp),
    FOREIGN KEY (numClinique) REFERENCES bdschema.Clinique(numClinique)
);

CREATE TABLE IF NOT EXISTS bdschema.Gestionnaire (
    numEmp VARCHAR(10),
    PRIMARY KEY (numEmp),
    FOREIGN KEY (numEmp) REFERENCES bdschema.Employe(numEmp) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS bdschema.Veterinaire (
    numEmp VARCHAR(10),
    PRIMARY KEY (numEmp),
    FOREIGN KEY (numEmp) REFERENCES bdschema.Employe(numEmp) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS bdschema.Proprietaire (
    numProp VARCHAR(10),
    numClinique VARCHAR(10),
    nom VARCHAR(30),
    adresse VARCHAR(30),
    numTelephone VARCHAR(15),
    PRIMARY KEY (numProp),
    FOREIGN KEY (numClinique) REFERENCES bdschema.Clinique(numClinique)
);

CREATE TABLE IF NOT EXISTS bdschema.Animal (
    numAni VARCHAR(10),
    numProp VARCHAR(10),
    nom VARCHAR(30),
    type VARCHAR(30),
    description VARCHAR(30),
    dob DATE,
    dateInsc DATE,
    etat VARCHAR(30) CHECK (etat = 'vivant' OR etat = 'decede'),
    PRIMARY KEY (numAni),
    FOREIGN KEY (numProp) REFERENCES bdschema.Proprietaire(numProp) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS bdschema.Examen (
    numExam VARCHAR(10),
    numVeterinaire VARCHAR(10),
    numAni VARCHAR(10),
    date DATE,
    heure VARCHAR(5),
    description VARCHAR(30),
    PRIMARY KEY (numExam),
    FOREIGN KEY (numVeterinaire) REFERENCES bdschema.Veterinaire(numEmp),
    FOREIGN KEY (numAni) REFERENCES bdschema.Animal(numAni)
);

CREATE TABLE IF NOT EXISTS bdschema.Traitement (
    numTrait VARCHAR(10),
    description VARCHAR(30),
    cout NUMERIC,
    PRIMARY KEY (numTrait)
);

CREATE TABLE IF NOT EXISTS bdschema.Prescription (
    numTrait VARCHAR(10),
    numExam VARCHAR(10),
    qte NUMERIC,
    dateDebut DATE,
    dateFin DATE,
    PRIMARY KEY (numTrait, numExam),
    FOREIGN KEY (numTrait) REFERENCES bdschema.Traitement(numTrait),
    FOREIGN KEY (numExam) REFERENCES bdschema.Examen(numExam)
);