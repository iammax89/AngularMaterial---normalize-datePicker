import { Component, OnInit } from "@angular/core";
import * as _moment from "moment";
import { default as _rollupMoment, Moment } from "moment";
import { FormGroup, FormControl, Validators } from "@angular/forms";
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

  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.form.controls.date.value;
    ctrlValue.year(normalizedYear.year());
    this.form.controls.date.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment) {
    const ctrlValue = this.form.controls.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.form.controls.date.setValue(ctrlValue);
  }
  chosenDayHandler(normalizedDay: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.form.controls.date.value;
    ctrlValue.day(normalizedDay.day());
    this.form.controls.date.setValue(ctrlValue);
    datepicker.close();
  }
  submit() {}
}
