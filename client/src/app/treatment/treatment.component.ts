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
  public billCost: number;

  public constructor(private communicationService: CommunicationService) { }

  public ngOnInit(): void {
    
  }

  public findBill(numAni: string): void {
    this.communicationService.getBill(numAni).subscribe((bill: number[]) => {
      this.billCost = bill[0];
      console.log(this.billCost);
    });
  }

  public findAnimalTreatments(numAni: string): void {
    this.currentAnimal = numAni;
    this.communicationService.getTreatmentsHistory(numAni).subscribe((treatments: Treatment[]) => {
      this.treatments = treatments;
      console.log(this.treatments);
    });
  }

}
