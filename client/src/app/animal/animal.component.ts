import { Component } from "@angular/core";
import { Animal } from "../../../../common/tables/Animal";
import { Treatment } from "../../../../common/tables/Treatment";
import { CommunicationService } from "../communication.service";

@Component({
  selector: "app-animal",
  templateUrl: "./animal.component.html",
  styleUrls: ["./animal.component.css"]
})

export class AnimalComponent {

  public constructor(private communicationService: CommunicationService) { }

  public ownerNumbers: number[] = [];
  public duplicateError: boolean = false;
  public animals: Animal[] = [];
  public treatmentsHistory: Treatment[] = [];

  public ngOnInit(): void {
    this.getAnimals();
    this.getOwnerNumbers();
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

  public findAnimalTreatments(input: string): void {
    this.communicationService.getTreatmentsHistory().subscribe((treatmentsHistory: Treatment[]) => {
      this.treatmentsHistory = treatmentsHistory;
    });
  }

  public getAnimals(): void {
    this.communicationService.getAnimals().subscribe((animals: Animal[]) => {
        this.cutDatesAnimals(animals);
        this.animals = animals;
    });
  }

  public getOwnerNumbers(): void {
    this.communicationService.getOwnerNumbers().subscribe((ownerNumbers: number[]) => {
      this.ownerNumbers = ownerNumbers;
  });
  }

  private cutDatesAnimals(animals: Animal[]): void {
    for (const ani of animals) {
      ani.dob = (ani.dob as string).substring(0,10);
      ani.doi = (ani.doi as string).substring(0,10);
    }
  }
}
