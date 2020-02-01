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
  min: Moment;
  holidays: Moment[] = [
    moment("2020-03-08"),
    moment("2020-03-09"),
    moment("2020-04-20"),
    moment("2020-05-01"),
    moment("2020-05-09")
  ];

  ngOnInit() {
    this.form = new FormGroup({
      from: new FormControl(
        moment()
          .utc()
          .startOf("day"),
        Validators.required
      ),
      to: new FormControl(
        moment()
          .utc()
          .startOf("day"),
        Validators.required
      ),
      amount: new FormControl("")
    });
    this.updateAmount();
    this.min = this.form.get("from").value;

    this.form.controls.from.valueChanges.subscribe(value => {
      this.min = value;
      this.updateAmount();
    });

    this.form.controls.to.valueChanges.subscribe(() => this.updateAmount());
  }

  myFilter = (d: Moment): boolean => {
    const day = d.get("isoWeekday");
    let include = this.holidays
      .map(h => h.get("dayOfYear"))
      .includes(d.get("dayOfYear"));
    return day !== 6 && day !== 7 && !include;
  };

  updateAmount() {
    if (this.form.controls.from.valid && this.form.controls.to.valid) {
      let startOfVacation: Moment = this.form.controls.from.value;
      let endOfVacation: Moment = this.form.controls.to.value;

      const days: Moment[] = [];
      let day: Moment = startOfVacation;

      while (day.isSameOrBefore(endOfVacation)) {
        days.push(day);
        day = day.clone().add(1, "day");
      }

      const diff = [...days].filter(day => this.myFilter(day));
      console.log(diff);
      this.form.controls.amount.setValue(diff.length);
    }
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
}
