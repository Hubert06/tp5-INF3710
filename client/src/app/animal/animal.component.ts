import { Component } from "@angular/core";
import { CommunicationService } from "../communication.service";

@Component({
  selector: "app-animal",
  templateUrl: "./animal.component.html",
  styleUrls: ["./animal.component.css"]
})

export class AnimalComponent {

  public constructor(private communicationService: CommunicationService) { }


  public duplicateError: boolean = false;

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
}
