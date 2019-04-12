import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AnimalComponent } from "./animal/animal.component";
import { AppComponent } from "./app.component";
import { TreatmentComponent } from "./treatment/treatment.component";

const routes: Routes = [
  { path: "app", component: AppComponent },
  { path: "treatment", component: TreatmentComponent },
  { path: "animal", component: AnimalComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
