import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-Chart",
  templateUrl: "./Chart.component.html",
  styleUrls: ["./Chart.component.scss"],
})
export class ChartComponent implements OnInit {
  constructor(private _router: Router) {}
  ngOnInit() {}
  /**
   * Determines whether back on
   */
  onBack(): void {
    this._router.navigate(["/"]);
  }
}
