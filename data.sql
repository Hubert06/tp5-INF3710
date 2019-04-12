SET search_path = TP5;

INSERT INTO bdschema.Clinique VALUES ('C001', '123 rue des Animaux', '123-456-7890', '234-567-8901');
INSERT INTO bdschema.Clinique VALUES ('C002', '234 rue des Animaux', '098-765-4321', '109-876-5432');

INSERT INTO bdschema.Employe VALUES ('E101', 'C001', 'Joe Blo', '123 rue des Blo', '514-123-4567', '1980-01-01', 'M', '123456789', 'Concierge', 30000);
INSERT INTO bdschema.Employe VALUES ('E102', 'C001', 'Marie Blo', '234 rue des Blo', '514-234-5678', '1981-01-01', 'F', '234567890', 'Gestionnaire', 60000);
INSERT INTO bdschema.Employe VALUES ('E103', 'C001', 'Gino Blo', '345 rue des Blo', '514-345-6789', '1982-01-01', 'M', '345678901', 'Veterinaire', 125000);
INSERT INTO bdschema.Employe VALUES ('E201', 'C002', 'Jean Blo', '456 rue des Blo', '438-123-4567', '1983-01-01', 'M', '456789012', 'Concierge', 35000);
INSERT INTO bdschema.Employe VALUES ('E202', 'C002', 'Lea Blo', '678 rue des Blo', '438-234-5678', '1984-01-01', 'F', '567890123', 'Gestionnaire', 65000);
INSERT INTO bdschema.Employe VALUES ('E203', 'C002', 'Marc Blo', '789 rue des Blo', '438-345-6789', '1985-01-01', 'M', '678901234', 'Veterinaire', 130000);

INSERT INTO bdschema.Gestionnaire VALUES ('E102');
INSERT INTO bdschema.Gestionnaire VALUES ('E202');

INSERT INTO bdschema.Veterinaire VALUES ('E103');
INSERT INTO bdschema.Veterinaire VALUES ('E203');

INSERT INTO bdschema.Proprietaire VALUES ('P101', 'C001', 'Gino Tremblay', '123 rue des Tremblay', '450-123-4567');
INSERT INTO bdschema.Proprietaire VALUES ('P201', 'C002', 'Camille Tremblay', '234 rue des Tremblay', '450-234-5678');

INSERT INTO bdschema.Animal VALUES ('A101', 'P101', 'Pedro', 'Berger allemand', 'Gros et feroce', '2001-01-01', '2019-01-01', 'Patte cassee');
INSERT INTO bdschema.Animal VALUES ('A102', 'P101', 'Juan', 'Labrador', 'Petit et vulnerable', '2001-02-02', '2019-02-02', 'Malade');
INSERT INTO bdschema.Animal VALUES ('A201', 'P201', 'Carlos', 'chat', 'Gros et vulnerable', '2002-01-01', '2019-03-03', 'Oreille cassee');
INSERT INTO bdschema.Animal VALUES ('A202', 'P201', 'Emilio', 'chien', 'Petit et feroce', '2002-02-02', '2019-04-04', 'Grippe');

INSERT INTO bdschema.Examen VALUES ('EX101', 'E103', 'A101', '2019-03-03', '12:00', 'Examen général');
INSERT INTO bdschema.Examen VALUES ('EX102', 'E103', 'A102', '2019-04-04', '18:00', 'Examen général');
INSERT INTO bdschema.Examen VALUES ('EX201', 'E203', 'A201', '2019-05-05', '14:00', 'Examen général');
INSERT INTO bdschema.Examen VALUES ('EX202', 'E203', 'A202', '2019-06-06', '20:00', 'Examen général');

INSERT INTO bdschema.Traitement VALUES ('T101', 'Application pour patte', 500);
INSERT INTO bdschema.Traitement VALUES ('T102', 'Prescription  maladie', 300);
INSERT INTO bdschema.Traitement VALUES ('T201', 'Points de suture', 400);
INSERT INTO bdschema.Traitement VALUES ('T202', 'Vaccination contre la grippe', 200);

INSERT INTO bdschema.Prescription VALUES ('T101', 'EX101', 1, '2019-03-03', '2019-03-04');
INSERT INTO bdschema.Prescription VALUES ('T102', 'EX102', 3, '2019-04-04', '2019-04-08');
INSERT INTO bdschema.Prescription VALUES ('T201', 'EX201', 1, '2019-05-05', '2019-05-06');
INSERT INTO bdschema.Prescription VALUES ('T202', 'EX202', 1, '2019-06-06', '2019-06-07');