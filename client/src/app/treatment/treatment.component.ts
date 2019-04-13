import { Component, OnInit } from "@angular/core";
import { Treatment } from "../../../../common/tables/Treatment";
import { CommunicationService } from "../communication.service";

@Component({
  selector: "app-treatment",
  templateUrl: "./treatment.component.html",
  styleUrls: ["./treatment.component.css"]
})
export class TreatmentComponent implements OnInit {
  public treatments: Treatment[];
  public currentAnimal: string;

  public constructor(private communicationService: CommunicationService) { }

  public ngOnInit(): void {
    
  }

  public findAnimalTreatments(numAni: string): void {
    this.currentAnimal = numAni;
    this.communicationService.getTreatmentsHistory(numAni).subscribe((treatments: Treatment[]) => {
      this.treatments = treatments;
      console.log(this.treatments);
    });
  }

}
