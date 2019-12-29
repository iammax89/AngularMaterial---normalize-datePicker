import { Component, OnInit } from "@angular/core";
import * as _moment from "moment";
import { default as _rollupMoment, Moment } from "moment";
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl
} from "@angular/forms";
import { MatDatepicker } from "@angular/material/datepicker";

const moment = _rollupMoment || _moment;

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  form: FormGroup;

  ngOnInit() {
    this.form = new FormGroup({
      date: new FormControl(moment(new Date()), Validators.required)
    });
    console.log(this.form.value);
  }

  chosenYearHandler(normalizedYear: Moment, ctrl: AbstractControl) {
    const ctrlValue = ctrl.value;
    ctrlValue.year(normalizedYear.year());
    ctrl.setValue(ctrlValue);
  }

  chosenMonthHandler(
    normalizedMonth: Moment,
    ctrl: AbstractControl,
    datepicker: MatDatepicker<Moment>
  ) {
    const ctrlValue = ctrl.value;
    ctrlValue.month(normalizedMonth.month());
    ctrl.setValue(ctrlValue);
    datepicker.close();
  }

  submit() {}
}
