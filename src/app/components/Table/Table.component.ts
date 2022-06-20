import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { Component, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { MatDialog } from "@angular/material/dialog";
import { IElements } from "src/app/interfaces/IElements";
import { ExportService } from "src/app/services/export.service";
import { ImportService } from "src/app/services/import.service";
import { DialogBoxComponent } from "../DialogBox/DialogBox.component";
import { Router } from "@angular/router";

@Component({
  selector: "app-Table",
  templateUrl: "./Table.component.html",
  styleUrls: ["./Table.component.scss"],
  animations: [
    trigger("detailExpand", [
      state("collapsed", style({ height: "0px", minHeight: "0" })),
      state("expanded", style({ height: "*" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
      ),
    ]),
  ],
})
export class TableComponent {
  constructor(
    public exportService: ExportService,
    public dialog: MatDialog,
    public importService: ImportService,
    private _router: Router
  ) {}
  dataList: any[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTable) table: MatTable<IElements>;
  @ViewChild(MatSort) sort: MatSort;
  columns = [
    "Artikelname",
    "Bildname",
    "Geschlecht",
    "Grammatur",
    "Hauptartikelnr",
    "Hersteller",
    "Herstellung",
    "Kragen",
    "Material",
    "Produktart",
    "Aermel",
    "Action",
  ];
  columnsToDisplayWithExpand = [...this.columns, "expand"];
  expandedElement: IElements | null;
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  isHidden = true;
  editableToggle: boolean = false;
  object: IElements = {
    Artikelname: "",
    Bein: "",
    Beschreibung: "",
    Bildname: "",
    Geschlecht: "",
    Grammatur: "",
    Hauptartikelnr: "",
    Hersteller: "",
    Herstellung: "",
    Kragen: "",
    Material: "",
    Materialangaben: "",
    Produktart: "",
    Taschenart: "",
    Ursprungsland: "",
    Aermel: "",
  };
  /**
   * upload csv file and assign its data to mat-Table
   * @param files
   */
  uploadCSV(files: any) {
    this.importService
      .uploadCSV(files)
      .then((result: any) => {
        this.dataList = result;
        // initialization dataSource, paginator and sorting
        this.passDataToDataSource(this.dataList, this.paginator, this.sort);
        this.isHidden = false;
      })
      .catch((error) => console.log(error));
  }
  /**
   * Tracks by fn
   * @param index
   * @param item
   * @returns
   */
  trackByFn(index: any, item: any) {
    return index;
  }
  /**
   * Pass data to data source
   * @param data
   * @param paginator
   * @param sort
   */
  passDataToDataSource(data: any[], paginator: MatPaginator, sort: MatSort) {
    this.dataSource.data = data;
    this.dataSource.paginator = paginator;
    this.dataSource.sort = sort;
  }
  /**
   * Opens dialog
   * @param action
   * @param obj
   */
  openDialog(action: any, obj: IElements) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      // width: "600px",
      data: obj,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.event == "Add") {
        this.addRowData(result.data);
      } else if (result?.event == "Update") {
        this.updateRowData(result.data);
      } else if (result?.event == "Delete") {
        this.deleteRowData(result.data);
      }
    });
  }
  /**
   * Adds row data
   * @param row_obj
   */
  addRowData(row_obj: IElements) {
    this.dataList.push({
      Id: this.dataList.length - 1 + 1,
      Artikelname: row_obj.Artikelname,
      Bein: row_obj.Bein,
      Beschreibung: row_obj.Beschreibung,
      Bildname: row_obj.Bildname,
      Geschlecht: row_obj.Geschlecht,
      Grammatur: row_obj.Grammatur,
      Hauptartikelnr: row_obj.Hauptartikelnr,
      Hersteller: row_obj.Hersteller,
      Herstellung: row_obj.Herstellung,
      Kragen: row_obj.Kragen,
      Material: row_obj.Material,
      Materialangaben: row_obj.Materialangaben,
      Produktart: row_obj.Produktart,
      Taschenart: row_obj.Taschenart,
      Ursprungsland: row_obj.Ursprungsland,
      Aermel: row_obj.Aermel,
    });
    this.passDataToDataSource(this.dataList, this.paginator, this.sort);
    this.table.renderRows();
  }
  /**
   * Updates row data
   * @param row_obj
   */
  updateRowData(row_obj: IElements) {
    this.dataList = this.dataList.filter((value, key) => {
      if (value.Id == row_obj.Id) {
        value.Artikelname = row_obj.Artikelname;
        value.Bein = row_obj.Bein;
        value.Beschreibung = row_obj.Beschreibung;
        value.Bildname = row_obj.Bildname;
        value.Geschlecht = row_obj.Geschlecht;
        value.Grammatur = row_obj.Grammatur;
        value.Hauptartikelnr = row_obj.Hauptartikelnr;
        value.Hersteller = row_obj.Hersteller;
        value.Herstellung = row_obj.Herstellung;
        value.Kragen = row_obj.Kragen;
        value.Material = row_obj.Material;
        value.Materialangaben = row_obj.Materialangaben;
        value.Produktart = row_obj.Produktart;
        value.Taschenart = row_obj.Taschenart;
        value.Ursprungsland = row_obj.Ursprungsland;
        value.Aermel = row_obj.Aermel;
      }
      return true;
    });
    this.passDataToDataSource(this.dataList, this.paginator, this.sort);
  }
  /**
   * Deletes row data
   * @param row_obj
   */
  deleteRowData(row_obj: IElements) {
    this.dataList = this.dataList.filter((value, key) => {
      return value.Id != row_obj.Id;
    });
    this.passDataToDataSource(this.dataList, this.paginator, this.sort);
  }
  /**
   * Exports csv
   */
  exportCSVFile() {
    this.exportService.downloadCSVFile(this.dataList);
  }
  /**
   * Exports excel
   */
  exportExcel() {
    const data = this.dataList.map((obj) => {
      return {
        Artikelname: obj.Artikelname ? obj.Artikelname : "",
        Bildname: obj.Bildname ? obj.Bildname : "",
        Geschlecht: obj.Geschlecht ? obj.Geschlecht : "",
        Grammatur: obj.Grammatur ? obj.Grammatur : "",
        Hauptartikelnr: obj.Hauptartikelnr ? obj.Hauptartikelnr : "",
        Hersteller: obj.Hersteller ? obj.Hersteller : "",
        Herstellung: obj.Herstellung ? obj.Herstellung : "",
        Kragen: obj.Kragen ? obj.Kragen : "",
        Material: obj.Material ? obj.Material : "",
        Produktart: obj.Produktart ? obj.Produktart : "",
        Aermel: obj.Aermel ? obj.Aermel : "",
        Beschreibung: obj.Beschreibung ? obj.Beschreibung : "",
        Materialangaben: obj.Materialangaben ? obj.Materialangaben : "",
        Taschenart: obj.Taschenart ? obj.Taschenart : "",
        Bein: obj.Bein ? obj.Bein : "",
        Ursprungsland: obj.Ursprungsland ? obj.Ursprungsland : "",
      };
    });
    this.exportService.exportExcel(data);
  }
  /**
   * Navigation to chart
   */
  navChart(): void {
    this._router.navigate(["/chart"]);
  }
}
