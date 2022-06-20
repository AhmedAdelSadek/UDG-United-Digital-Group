import { Injectable } from "@angular/core";
import FileSaver, { saveAs } from "file-saver"; // npm install file-saver

@Injectable()
export class ExportService {
  constructor() {}
  /**
   * Exports excel
   * @param data
   */
  exportExcel(data: any[]) {
    if (data.length > 0) {
      import("xlsx").then((xlsx) => {
        const worksheet = xlsx.utils.json_to_sheet(data);
        const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
        const excelBuffer: any = xlsx.write(workbook, {
          bookType: "xlsx",
          type: "array",
        });
        this.saveAsExcelFile(excelBuffer, "ExportExcel");
      });
    }
  }
  /**
   * Saves as excel file
   * @param buffer
   * @param fileName
   */
  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    let EXCEL_EXTENSION = ".xlsx";
    const CSV_EXTENSION = ".csv";
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    FileSaver.saveAs(
      data,
      fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
    );
  }
  /**
   * Downloads csvfile
   * @param data
   */
  downloadCSVFile(data: any) {
    const replacer = (key: any, value: null) => (value === null ? "" : value); // specify how you want to handle null values here
    const header = Object.keys(data[0]);
    let csv = data.map((row: { [x: string]: any }) =>
      header
        .map((fieldName) => JSON.stringify(row[fieldName], replacer))
        .join(",")
    );
    csv.unshift(header.join(","));
    let csvArray = csv.join("\r\n");

    var blob = new Blob([csvArray], { type: "text/csv" });
    saveAs(blob, "myFile.csv");
  }
}
