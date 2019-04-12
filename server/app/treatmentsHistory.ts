// tslint:disable: max-line-length
export const treatmentsHistory: string = `
SET search_path = bdschema;
SELECT Traitement.numTrait, Traitement.description, Traitement.cout FROM Traitement
LEFT JOIN Prescription ON Traitement.numTrait = Prescription.numTrait
LEFT JOIN EXAMEN ON Prescription.numExam = Examen.numExam
LEFT JOIN Animal ON Examen.numAni = Animal.numAni
LEFT JOIN Proprietaire ON Animal.numProp = Proprietaire.numProp
WHERE Animal.numAni = 'A101';
`;
