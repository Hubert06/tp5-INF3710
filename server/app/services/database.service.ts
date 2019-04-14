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
    public async createSchema(): Promise<pg.QueryResult> {
        this.pool.connect();

        return this.pool.query(schema);
    }

    public async populateDb(): Promise<pg.QueryResult> {
        this.pool.connect();

        return this.pool.query(data);
    }

    public async getTreatmentsHistory(numAni: string): Promise<pg.QueryResult> {
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

    public async getAnimalInformation(nomAni: string): Promise<pg.QueryResult> {
        this.pool.connect();

        const values: string[] = [`%` + nomAni + `%`];
        const animalInformation: string = `
        SELECT * FROM bdschema.Animal WHERE LOWER(bdschema.Animal.nom) LIKE $1;
        `;

        return this.pool.query(animalInformation, values);
    }

    public async getBill(numAni: string): Promise<pg.QueryResult> {
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

    public async insertAnimal(num: string, name: string, type: string, desc: string, dob: string, doi: string,
                        state: string, ownerNum: string): Promise<pg.QueryResult> {
        this.pool.connect();
        const values: string[] = [
            num,
            ownerNum,
            name,
            type,
            desc,
            dob,
            doi,
            state
            ];
        let insertion: string = ``;
        if (ownerNum !== undefined && name !== `` && type !== `` && desc !== `` && dob !== `` && doi !== `` && state !== ``) {
            insertion = `
            INSERT INTO bdschema.Animal VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
            `;
        }

        return this.pool.query(insertion, values);
    }

    // tslint:disable-next-line: max-func-body-length
    public async modifyAnimal(num: string, name: string, type: string, desc: string, dob: string, doi: string,
                        state: string, ownerNum: string): Promise<pg.QueryResult> {
        this.pool.connect();

        if (ownerNum === undefined) {
            ownerNum = ``;
        }
        let modification: string = `
        UPDATE bdschema.Animal
        SET
        `;

        if (ownerNum !== ``) {
            modification += (`numProp = '` + ownerNum + `',`);
        }
        if (name !== ``) {
            modification += (`nom = '` + name + `',`);
        }
        if (type !== ``) {
            modification += (`type = '` + type + `',`);
        }
        if (desc !== ``) {
            modification += (`description = '` + desc + `',`);
        }
        if (dob !== ``) {
            modification += (`dob = '` + dob + `',`);
        }
        if (doi !== ``) {
            modification += (`dateInsc = '` + doi + `',`);
        }
        if (state !== ``) {
            modification += (`etat = '` + state + `',`);
        }
        modification = modification.substring(0, modification.length - 1);
        modification += (` WHERE numAni = '` + num + `';`);
        console.log(modification);

        return this.pool.query(modification);
    }

    public async deleteAnimal(num: string): Promise<pg.QueryResult> {
        this.pool.connect();

        const values: string[] = [num];

        const deletion: string = `
        DELETE FROM bdschema.Animal WHERE Animal.numAni = $1;
        `;

        return this.pool.query(deletion, values);
    }

    public async getOwnerNumbers(): Promise<pg.QueryResult> {
        this.pool.connect();

        return this.pool.query(`SELECT bdschema.proprietaire.numprop FROM bdschema.proprietaire`);
    }

    public async getAnimals(): Promise<pg.QueryResult> {
        this.pool.connect();

        return this.pool.query('SELECT * FROM bdschema.animal;');
    }
}
