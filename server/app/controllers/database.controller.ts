import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import * as pg from "pg";
import { Animal } from "../../../common/tables/Animal";
import { Treatment } from "../../../common/tables/Treatment";

import { DatabaseService } from "../services/database.service";
import Types from "../types";

@injectable()
export class DatabaseController {
    public constructor(@inject(Types.DatabaseService) private databaseService: DatabaseService) { }

    public get router(): Router {
        const router: Router = Router();

        router.post("/createSchema",
                    (req: Request, res: Response, next: NextFunction) => {
                    this.databaseService.createSchema().then((result: pg.QueryResult) => {
                        res.json(result);
                    }).catch((e: Error) => {
                        console.error(e.stack);
                    });
                });

        router.post("/populateDb",
                    (req: Request, res: Response, next: NextFunction) => {
                    this.databaseService.populateDb().then((result: pg.QueryResult) => {
                        res.json(result);
                    }).catch((e: Error) => {
                        console.error(e.stack);
                    });
        });

        router.get("/treatment/:numAni",
                   (req: Request, res: Response, next: NextFunction) => {
                    const numAni: string = req.params.numAni;
                    this.databaseService.getTreatmentsHistory(numAni).then((result: pg.QueryResult) => {
                    const treatmentsHistory: Treatment[] =
                    result.rows.map((treatment: any) => (
                        {
                        numtrait : treatment.numtrait,
                        description : treatment.description,
                        cout : treatment.cout,
                    }));
                    res.json(treatmentsHistory);
                }).catch((e: Error) => {
                    console.error(e.stack);
                });
            });

        router.get("/bill/:numAni",
                   (req: Request, res: Response, next: NextFunction) => {
                    const numAni: string = req.params.numAni;
                    this.databaseService.getBill(numAni).then((result: pg.QueryResult) => {
                    const totalbill: number[] = result.rows.map((row: any) => row.totalbill);
                    res.json(totalbill);
                }).catch((e: Error) => {
                    console.error(e.stack);
                });
            });

        router.post("/animal",
                    (req: Request, res: Response, next: NextFunction) => {
                    const num: string = req.body.num;
                    const name: string = req.body.name;
                    const type: string = req.body.type;
                    const desc: string = req.body.desc;
                    const dob: string = req.body.dob;
                    const doi: string = req.body.doi;
                    const state: string = req.body.state;
                    const ownerNum: string = req.body.ownerNum;
                    this.databaseService.insertAnimal(num, name, type, desc, dob, doi, state, ownerNum).then((result: pg.QueryResult) => {
                    res.json(result.rowCount);
                }).catch((e: Error) => {
                    console.error(e.stack);
                    res.json(-1);
                });
            });

        router.put("/animal",
                   (req: Request, res: Response, next: NextFunction) => {
                    const num: string = req.body.num;
                    const name: string = req.body.name;
                    const type: string = req.body.type;
                    const desc: string = req.body.desc;
                    const dob: string = req.body.dob;
                    const doi: string = req.body.doi;
                    const state: string = req.body.state;
                    const ownerNum: string = req.body.ownerNum;
                    this.databaseService.modifyAnimal(num, name, type, desc, dob, doi, state, ownerNum).then((result: pg.QueryResult) => {
                    res.json(result.rowCount);
                }).catch((e: Error) => {
                    console.error(e.stack);
                    res.json(-1);
                });
            });

        router.get("/animal",
                   (req: Request, res: Response, next: NextFunction) => {
                    // Send the request to the service and send the response
                    this.databaseService.getAnimals().then((result: pg.QueryResult) => {
                    const animals: Animal[] =
                    result.rows.map((ani: any) => (
                        {
                        num : ani.numani,
                        name : ani.nom,
                        type : ani.type,
                        desc : ani.description,
                        dob : ani.dob,
                        doi : ani.dateinsc,
                        state : ani.etat,
                        ownerNum : ani.numprop,
                    }));
                    res.json(animals);
                }).catch((e: Error) => {
                    console.error(e.stack);
                });
            });

        router.get("/animal/:nomAni",
                   (req: Request, res: Response, next: NextFunction) => {
                    console.log("got here!");
                    const nomAni: string = req.params.nomAni;
                    this.databaseService.getAnimalInformation(nomAni).then((result: pg.QueryResult) => {
                    const animal: Animal[] =
                    result.rows.map((ani: any) => (
                        {
                        num : ani.numani,
                        name : ani.nom,
                        type : ani.type,
                        desc : ani.description,
                        dob : ani.dob,
                        doi : ani.dateinsc,
                        state : ani.etat,
                        ownerNum : ani.numprop,
                    }));
                    res.json(animal);
                }).catch((e: Error) => {
                    console.error(e.stack);
                });
            });

        router.delete("/animal/:num",
                      (req: Request, res: Response, next: NextFunction) => {
                        const num: string = req.params.num;
                        console.log(num);
                        this.databaseService.deleteAnimal(num).then((result: pg.QueryResult) => {
                        res.json(result.rowCount);
                    }).catch((e: Error) => {
                        console.error(e.stack);
                        res.json(-1);
                    });
                });

        router.get("/ownerNumbers",
                   (req: Request, res: Response, next: NextFunction) => {
                    // Send the request to the service and send the response
                    this.databaseService.getOwnerNumbers().then((result: pg.QueryResult) => {
                    const ownerNumbers: number[] = result.rows.map((row: any) => row.numprop);
                    res.json(ownerNumbers);
                }).catch((e: Error) => {
                    console.error(e.stack);
                });
            });

        return router;
    }
}
