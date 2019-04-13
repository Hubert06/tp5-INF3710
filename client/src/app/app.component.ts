import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CommunicationService } from "./communication.service";
import { Animal } from "../../../common/tables/Animal";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
    public route: string;
    public animals: Animal[];

    public constructor(private communicationService: CommunicationService, location: Location, router: Router) {
        router.events.subscribe((val) => {
            if (location.path() !== "") {
              this.route = location.path();
            } else {
              this.route = "";
            }
          });
    }

    public readonly title: string = "INF3710 TP5";
    public ngOnInit(): void {
        this.getAnimals();
        this.communicationService.listen().subscribe((m:any) => {
            console.log("m", m);
        });
    }

    public createDB(): void {
        this.communicationService.setUpDatabase().subscribe((res: any) => {
            console.log("res", res);
        });
    }

    public getAnimals(): void {
      this.communicationService.getAnimals().subscribe((animals: Animal[]) => {
          this.cutDatesAnimals(animals);
          this.animals = animals;
      });
    }

    private cutDatesAnimals(animals: Animal[]): void {
      for (const ani of animals) {
        ani.dob = (ani.dob as string).substring(0,10);
        ani.doi = (ani.doi as string).substring(0,10);
      }
    }
}