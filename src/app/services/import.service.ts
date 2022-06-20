import { Injectable } from "@angular/core";
import * as Papa from "papaparse"; // npm i papaparse

@Injectable({
  providedIn: "root",
})
export class ImportService {
  dataList: any[] = [];
  productsType: any[] = [];
  manufacturers: any[] = [];
  constructor() {}
  /**
   * upload csv file and assign its data to mat-Table
   * @param files
   */
  uploadCSV = (files: any) => {
    return new Promise((resolve, reject) => {
      if (files[0]) {
        Papa.parse(files[0], {
          header: true,
          skipEmptyLines: true,
          complete: (result, file) => {
            this.dataList = result.data;
            // adding new property(id) dynamically, rename Ärmel property and resort properties Object
            this.dataList = this.dataList.map((element, index) => {
              const container: any = {
                Id: index,
                ...element,
              };
              container["Aermel"] = container["Ärmel"];
              delete container["Ärmel"];
              return container;
            });
            resolve(this.dataList);
            this.productsType = this.groupArrayOfObjects(
              this.dataList,
              "Produktart"
            );
            this.manufacturers = this.groupArrayOfObjects(
              this.dataList,
              "Hersteller"
            );
          },
        });
      } else {
        reject("No Connection !!");
      }
    });
  };
  /**
   * aggregate the properties of objects
   * @param list
   * @param key
   * @returns
   */
  groupArrayOfObjects(list: any[], key: string) {
    return list.reduce((rv, x) => {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  }
}
