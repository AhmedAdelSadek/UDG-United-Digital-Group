import { Component, OnInit, ViewChild } from "@angular/core";
import { ChartConfiguration, ChartData, ChartType } from "chart.js";
import DatalabelsPlugin from "chartjs-plugin-datalabels"; // npm i chartjs-plugin-datalabels
import { BaseChartDirective } from "ng2-charts";
import { ImportService } from "src/app/services/import.service";

@Component({
  selector: "BarChart",
  templateUrl: "./BarChart.component.html",
  styleUrls: ["./BarChart.component.scss"],
})
export class BarChartComponent implements OnInit {
  headerManufacturer: any[] = [];
  valuesManufacturer: any[] = [];
  constructor(public importService: ImportService) {}
  ngOnInit() {
    const manufs = this.importService.manufacturers;
    for (let k in manufs) {
      this.headerManufacturer.push(k);
      this.valuesManufacturer.push(manufs[k].length);
    }
  }
  // Bar Chart
  @ViewChild(BaseChartDirective) chartBar: BaseChartDirective | undefined;
  barChartOptions: ChartConfiguration["options"] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 10,
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Manufacturers",
      },
      legend: {
        display: false,
      },
      datalabels: {
        anchor: "end",
        align: "end",
      },
    },
  };
  barChartType: ChartType = "bar";
  barChartPlugins = [DatalabelsPlugin];
  barChartData: ChartData<"bar"> = {
    labels: this.headerManufacturer,
    datasets: [
      {
        data: this.valuesManufacturer,
        borderWidth: 1,
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
      },
    ],
  };
}
