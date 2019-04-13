import { injectable } from "inversify";
import * as pg from "pg";
import "reflect-metadata";
import { schema } from "../createSchema";
import { data } from "../populateDB";

@injectable()
export class DatabaseService {

    // A MODIFIER POUR VOTRE BD
    public connectionConfig: pg.ConnectionConfig = {
        user: "tp5_user",
        database: "TP5",
        password: "banane123",
        port: 5432,
        host: "127.0.0.1",
        keepAlive : true
    };

    private pool: pg.Pool = new pg.Pool(this.connectionConfig);

    /*
        METHODES DE DEBUG
    */
    public createSchema(): Promise<pg.QueryResult> {
        this.pool.connect();

        return this.pool.query(schema);
    }

    public populateDb(): Promise<pg.QueryResult> {
        this.pool.connect();

        return this.pool.query(data);
    }

    public getTreatmentsHistory(numAni: string): Promise<pg.QueryResult> {
        this.pool.connect();

        const treatmentsHistory: string = `
        SELECT Traitement.numTrait, Traitement.description, Traitement.cout FROM bdschema.Traitement
        LEFT JOIN bdschema.Prescription ON Traitement.numTrait = bdschema.Prescription.numTrait
        LEFT JOIN bdschema.Examen ON Prescription.numExam = bdschema.Examen.numExam
        LEFT JOIN bdschema.Animal ON Examen.numAni = bdschema.Animal.numAni
        LEFT JOIN bdschema.Proprietaire ON Animal.numProp = bdschema.Proprietaire.numProp
        WHERE LOWER(bdschema.Animal.numAni) = LOWER('` + numAni + `');
        `;

        return this.pool.query(treatmentsHistory);
    }

    public getAnimalInformation(nomAni: string): Promise<pg.QueryResult> {
        this.pool.connect();

        const animalInformation: string = `
        SELECT * FROM bdschema.Animal WHERE LOWER(bdschema.Animal.nom) LIKE '%` + nomAni + `%';
        `;

        return this.pool.query(animalInformation);
    }

    public getBill(numAni: string): Promise<pg.QueryResult> {
        this.pool.connect();

        const bill: string = `
        SELECT SUM(bdschema.Traitement.cout) AS totalbill FROM bdschema.Traitement
        LEFT JOIN bdschema.Prescription ON Traitement.numTrait = bdschema.Prescription.numTrait
        LEFT JOIN bdschema.Examen ON Prescription.numExam = bdschema.Examen.numExam
        LEFT JOIN bdschema.Animal ON Examen.numAni = bdschema.Animal.numAni
        LEFT JOIN bdschema.Proprietaire ON Animal.numProp = bdschema.Proprietaire.numProp
        WHERE LOWER(bdschema.Animal.numAni) = LOWER('` + numAni + `');
        `;

        return this.pool.query(bill);
    }

    public insertAnimal(num: string, name: string, type: string, desc: string, dob: string, doi: string,
                        state: string, ownerNum: string): Promise<pg.QueryResult> {
        this.pool.connect();
        let insertion: string = ``;
        if (ownerNum !== undefined && name !== `` && type !== `` && desc !== `` && dob !== `` && doi !== `` && state !== ``) {
            insertion = `
            INSERT INTO bdschema.Animal VALUES ('` + num + `', '` + ownerNum + `', '` + name + `', '
            ` + type + `', '` + desc + `', '` + dob + `', '` + doi + `', '` + state + `');
            `;
        }

        return this.pool.query(insertion);
    }

    public modifyAnimal(num: string, name: string, type: string, desc: string, dob: string, doi: string,
                        state: string, ownerNum: string): Promise<pg.QueryResult> {
        this.pool.connect();

        let queryIsFine: boolean = false;
        let modification: string = `
        UPDATE bdschema.Animal
        SET
        `;

        if (ownerNum !== undefined) {
            queryIsFine = true;
            modification += (`numProp = '` + ownerNum + `',`);
        }
        if (name !== ``) {
            queryIsFine = true;
            modification += (`nom = '` + name + `',`);
        }
        if (type !== ``) {
            queryIsFine = true;
            modification += (`type = '` + type + `',`);
        }
        if (desc !== ``) {
            queryIsFine = true;
            modification += (`description = '` + desc + `',`);
        }
        if (dob !== ``) {
            queryIsFine = true;
            modification += (`dob = '` + dob + `',`);
        }
        if (doi !== ``) {
            queryIsFine = true;
            modification += (`dateInsc = '` + doi + `',`);
        }
        if (state !== ``) {
            queryIsFine = true;
            modification += (`etat = '` + state + `',`);
        }
        modification = modification.substring(0, modification.length - 1);
        modification += (`WHERE numAni = '` + num + `';`);

        if(!queryIsFine) {
            throw new Error("Invalid input");
        }
        return this.pool.query(modification);
    }

    public deleteAnimal(num: string): Promise<pg.QueryResult> {
        this.pool.connect();

        const deletion: string = `
        DELETE FROM bdschema.Animal WHERE Animal.numAni = '` + num + `';
        `;

        console.log(deletion);

        return this.pool.query(deletion);
    }

    public getOwnerNumbers(): Promise<pg.QueryResult> {
        this.pool.connect();

        return this.pool.query(`SELECT bdschema.proprietaire.numprop FROM bdschema.proprietaire`);
    }

    // HOTEL
    public getAnimals(): Promise<pg.QueryResult> {
        this.pool.connect();

        return this.pool.query('SELECT * FROM bdschema.animal;');
    }
}
