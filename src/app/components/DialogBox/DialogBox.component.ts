import { Component, Inject, OnDestroy, Optional } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { BehaviorSubject, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { IElements } from "src/app/interfaces/IElements";

@Component({
  selector: "app-DialogBox",
  templateUrl: "./DialogBox.component.html",
  styleUrls: ["./DialogBox.component.scss"],
})
export class DialogBoxComponent implements OnDestroy {
  action: string;
  local_data: any;
  status: FormControl;
  _onResultChanged: BehaviorSubject<any> = new BehaviorSubject(null);
  _unsubscribe: Subject<any> = new Subject();
  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: IElements
  ) {
    console.log(data);
    this.status = new FormControl("", [Validators.required]);
    this.local_data = { ...data };
    this.action = this.local_data.action;
    this._onResultChanged
      .pipe(takeUntil(this._unsubscribe))
      .subscribe((res) => {
        let result = res;
        result ? this.status.setValue(true) : this.status.setValue(false);
      });
  }
  /**
   * Do action
   */
  doAction() {
    this.dialogRef.close({ event: this.action, data: this.local_data });
  }
  /**
   * Closes dialog
   */
  closeDialog() {
    this.dialogRef.close({ event: "Cancel" });
  }
  /**
   * Determines whether the Object has null prop
   * @param obj
   * @returns
   */
  hasNullProp(obj: any): boolean {
    for (const key of Object.keys(obj)) {
      if (!obj[key]) {
        return false;
      }
    }
    return true;
  }
  /**
   * Detects data changes
   * @returns data changes
   */
  detectDataChanges() {
    let r = this.hasNullProp(this.local_data);
    this._onResultChanged.next(r);
  }
  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from  subscriptions
    this._unsubscribe.next(null);
    this._unsubscribe.complete();
  }
}
