// tslint:disable: max-line-length
export const treatmentsHistory: string = `
SELECT Traitement.numTrait, Traitement.description, Traitement.cout FROM bdschema.Traitement
LEFT JOIN bdschema.Prescription ON Traitement.numTrait = bdschema.Prescription.numTrait
LEFT JOIN bdschema.Examen ON Prescription.numExam = bdschema.Examen.numExam
LEFT JOIN bdschema.Animal ON Examen.numAni = bdschema.Animal.numAni
LEFT JOIN bdschema.Proprietaire ON Animal.numProp = bdschema.Proprietaire.numProp
WHERE bdschema.Animal.numAni = 'A101';
`;
