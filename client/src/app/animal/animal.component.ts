import { Component } from "@angular/core";
import { Animal } from "../../../../common/tables/Animal";
import { CommunicationService } from "../communication.service";

@Component({
  selector: "app-animal",
  templateUrl: "./animal.component.html",
  styleUrls: ["./animal.component.css"]
})

export class AnimalComponent {

  public constructor(private communicationService: CommunicationService) { }

  public ownerNumbers: number[] = [0, 1, 2, 3];
  public duplicateError: boolean = false;
  public animals: Animal[] = [];

  public ngOnInit() { 
    this.getAnimals();
  }

  public insertAnimal(animalNo: string, animalName: string, animalCity: string): void {
    const animal: any = {
        "animalNo" : animalNo,
        "animalName" : animalName,
        "city" : animalCity
    };
    this.communicationService.insertHotel(animal).subscribe((res: number) => {
        if (res > 0) {
            this.communicationService.filter("update");
        }
        this.duplicateError = (res === -1);
    });
  }

  public getAnimals(): void {
    this.communicationService.getAnimals().subscribe((animals: Animal[]) => {
        // this.cutDatesAnimals(animals);
        this.animals = animals;
    });
  }

  // private cutDatesAnimals(animals: Animal[]): void {
  //   for (const ani of animals) {
  //     const dob: Date = new Date(ani.dob);
  //     const doi: Date = new Date(ani.doi);
  //     ani.dob = dob.toDateString();
  //     ani.doi = doi.toDateString();
  //   }
  // }
}
