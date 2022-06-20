import { Component, OnInit, ViewChild } from "@angular/core";
import { ChartConfiguration, ChartData, ChartType } from "chart.js";
import DatalabelsPlugin from "chartjs-plugin-datalabels"; // npm i chartjs-plugin-datalabels
import { BaseChartDirective } from "ng2-charts";
import { ImportService } from "src/app/services/import.service";

@Component({
  selector: "PieChart",
  templateUrl: "./PieChart.component.html",
  styleUrls: ["./PieChart.component.scss"],
})
export class PieChartComponent implements OnInit {
  headersProductType: any[] = [];
  valuesProductType: any[] = [];
  constructor(public importService: ImportService) {}
  ngOnInit() {
    const types = this.importService.productsType;
    for (let k in types) {
      this.headersProductType.push(k);
      this.valuesProductType.push(types[k].length);
    }
  }
  // Pie Chart
  @ViewChild(BaseChartDirective) chartPie: BaseChartDirective | undefined;
  pieChartOptions: ChartConfiguration["options"] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "left",
      },
      title: {
        display: true,
        text: "Product Type",
        position: "top",
        padding: {
          top: 0,
          bottom: 0,
        },
      },
    },
  };
  pieChartData: ChartData<"pie", number[], string | string[]> = {
    labels: this.headersProductType,
    datasets: [
      {
        data: this.valuesProductType,
        // borderColor: [
        //   "rgba(255, 99, 132, 1)",
        //   "rgba(54, 162, 235, 1)",
        //   "rgba(255, 206, 86, 1)",
        //   "rgba(75, 192, 192, 1)",
        //   "rgba(153, 102, 255, 1)",
        //   "rgba(255, 159, 64, 1)",
        // ],
        // borderWidth: 1,
      },
    ],
  };
  pieChartType: ChartType = "pie";
  pieChartPlugins = [DatalabelsPlugin];
  /**
   * Changes legend position
   */
  changeLegendPosition(): void {
    if (this.pieChartOptions?.plugins?.legend) {
      this.pieChartOptions.plugins.legend.position =
        this.pieChartOptions.plugins.legend.position === "left"
          ? "top"
          : "left";
    }
    this.chartPie?.render();
  }
  /**
   * Toggles legend
   */
  toggleLegend(): void {
    if (this.pieChartOptions?.plugins?.legend) {
      this.pieChartOptions.plugins.legend.display =
        !this.pieChartOptions.plugins.legend.display;
    }
    this.chartPie?.render();
  }
}
