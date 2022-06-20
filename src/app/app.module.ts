import { registerLocaleData } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import localeDe from "@angular/common/locales/de";
import localeDeExtra from "@angular/common/locales/extra/de";
import { LOCALE_ID, NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatTableExporterModule } from "mat-table-exporter"; // npm install --save mat-table-exporter
import { NgChartsModule } from "ng2-charts"; // npm install --save ng2-charts   // npm install --save chart.js
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BarChartComponent } from "./components/BarChart/BarChart.component";
import { ChartComponent } from "./components/Chart/Chart.component";
import { DialogBoxComponent } from "./components/DialogBox/DialogBox.component";
import { PieChartComponent } from "./components/PieChart/PieChart.component";
import { TableComponent } from "./components/Table/Table.component";
import { ExportService } from "./services/export.service";
import { ImportService } from "./services/import.service";
registerLocaleData(localeDe, "de-DE", localeDeExtra);

// solve problem => Missing locale data for the locale "de-DE".
// https://codehunter.cc/a/typescript/missing-locale-data-for-the-locale-de-de

@NgModule({
  declarations: [
    AppComponent,
    DialogBoxComponent,
    TableComponent,
    ChartComponent,
    PieChartComponent,
    BarChartComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatTableExporterModule,
    MatSortModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    AppRoutingModule,
    NgChartsModule,
  ],
  providers: [
    ImportService,
    ExportService,
    {
      provide: LOCALE_ID,
      useValue: "de-DE", // 'de-DE' for Germany
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
