import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ChartComponent } from "./components/Chart/Chart.component";
import { TableComponent } from "./components/Table/Table.component";

// Define the routes
const routes: Routes = [
  { path: "table", component: TableComponent },
  { path: "chart", component: ChartComponent },
  { path: "", redirectTo: "table", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
