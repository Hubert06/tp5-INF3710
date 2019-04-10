// tslint:disable: max-line-length
export const data: string = `
SET search_path = TP5;

INSERT INTO bdschema.Clinique VALUES ('C001', '123 rue des Animaux', '123-456-7890', '234-567-8901');


INSERT INTO bdschema.Employe VALUES ('E001', 'C001', 'Joe Blo', '123 rue des Blo', '514-123-4567', '1980-01-01', 'M', '123456789', 'Concierge', '30000');
INSERT INTO bdschema.Employe VALUES ('E002', 'C001', 'Marie Blo', '234 rue des Blo', '514-234-5678', '1981-01-01', 'M', '234567890', 'Gestionnaire', '60000');
INSERT INTO bdschema.Employe VALUES ('E003', 'C001', 'Gino Blo', '345 rue des Blo', '514-345-6789', '1982-01-01', 'M', '345678901', 'Veterinaire', '125000');

INSERT INTO bdschema.Gestionnaire VALUES ('E002');

INSERT INTO bdschema.Veterinaire VALUES ('E003');

INSERT INTO bdschema.Proprietaire VALUES ('P001', 'C001', 'Gino Tremblay', '123 rue des Tremblay', '438-123-4567');

INSERT INTO bdschema.Animal VALUES ('A001', 'P001', 'Pedro', 'Berger allemand', 'Gros et feroce', '2000-01-01', '2019-01-01', 'Patte cassee');
INSERT INTO bdschema.Animal VALUES ('A002', 'P001', 'Juan', 'Labrador', 'Petit et vulnerable', '2000-02-02', '2019-02-02', 'Malade');

INSERT INTO bdschema.Examen VALUES ('EX001', 'E003', 'A001', '2019-03-03', '12:00', 'Platre pour la patte');
INSERT INTO bdschema.Examen VALUES ('EX002', 'E003', 'A002', '2019-04-04', '18:00', 'Medicament pour la maladie');

INSERT INTO bdschema.Traitement VALUES ('T001', 'Application du platre', 500);
INSERT INTO bdschema.Traitement VALUES ('T002', 'Don du medicament', 300);

INSERT INTO bdschema.Prescription VALUES ('T001', 'EX001', 1, '2019-03-03', '2019-03-04');
INSERT INTO bdschema.Prescription VALUES ('T002', 'EX002', 3, '2019-04-04', '2019-04-08');
`;
