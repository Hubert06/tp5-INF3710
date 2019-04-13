import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {Animal} from "../../../common/tables/Animal";
// tslint:disable-next-line:ordered-imports
import { of, Observable, concat, Subject } from "rxjs";
import { catchError } from "rxjs/operators";
import { Treatment } from "../../../common/tables/Treatment";

@Injectable()
export class CommunicationService {

    private readonly BASE_URL: string = "http://localhost:3000/database";
    public constructor(private http: HttpClient) { }

    private _listners: any = new Subject<any>();

    public listen(): Observable<any> {
       return this._listners.asObservable();
    }

    public filter(filterBy: string): void {
       this._listners.next(filterBy);
    }

    public getAnimals(): Observable<any[]> {

        return this.http.get<Animal[]>(this.BASE_URL + "/animal").pipe(
            catchError(this.handleError<Animal[]>("getAnimals")),
        );
    }

    public getOwnerNumbers(): Observable<number[]> {

        return this.http.get<number[]>(this.BASE_URL + "/ownerNumbers").pipe(
            catchError(this.handleError<number[]>("getOwnerNumbers")),
        );
    }

    public setUpDatabase(): Observable<any> {
        return concat(this.http.post<any>(this.BASE_URL + "/createSchema", []),
                      this.http.post<any>(this.BASE_URL + "/populateDb", []));
    }

    public getTreatmentsHistory(numAni: string): Observable<Treatment[]> {

        return this.http.get<Treatment[]>(this.BASE_URL + "/treatmentsHistory/" + numAni).pipe(
            catchError(this.handleError<Treatment[]>("findAnimalTreatments")),
        );
    }

    public getAnimalInformation(nomAni: string): Observable<Animal[]> {

        return this.http.get<Animal[]>(this.BASE_URL + "/animalInformation/" + nomAni).pipe(
            catchError(this.handleError<Animal[]>("findAnimalInformation")),
        );
    }

    private handleError<T>(request: string, result?: T): (error: Error) => Observable<T> {

        return (error: Error): Observable<T> => {
            return of(result as T);
        };
    }
}
