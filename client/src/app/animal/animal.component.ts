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
  public treatmentsHistory: Treatment[] = [];
  public animalsInfo: Animal[] = [];

  public ngOnInit(): void {
    this.getOwnerNumbers();
  }

  // public insertAnimal(animalNo: string, animalName: string, animalCity: string): void {
  //   const animal: any = {
  //       "animalNo" : animalNo,
  //       "animalName" : animalName,
  //       "city" : animalCity
  //   };
  //   this.communicationService.insertHotel(animal).subscribe((res: number) => {
  //       if (res > 0) {
  //           this.communicationService.filter("update");
  //       }
  //       this.duplicateError = (res === -1);
  //   });
  // }

  public findAnimalInformation(nomAni: string): void {
    this.communicationService.getAnimalInformation(nomAni).subscribe((animalsInfo: Animal[]) => {
      this.animalsInfo = animalsInfo;
      console.log(this.animalsInfo);
    });
  }

  public getOwnerNumbers(): void {
    this.communicationService.getOwnerNumbers().subscribe((ownerNumbers: number[]) => {
      this.ownerNumbers = ownerNumbers;
  });
  }
}
