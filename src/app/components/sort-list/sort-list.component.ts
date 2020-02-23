import { Component, OnInit } from "@angular/core";

export interface Dessert {
  calories: number;
  carbs: number;
  fat: number;
  name: string;
  protein: number;
}

@Component({
  selector: "app-sort-list",
  templateUrl: "./sort-list.component.html",
  styleUrls: ["./sort-list.component.scss"]
})
export class SortListComponent implements OnInit {
  desserts: Dessert[] = [
    { name: "Frozen yogurt", calories: 159, fat: 6, carbs: 24, protein: 4 },
    {
      name: "Ice cream sandwich",
      calories: 237,
      fat: 9,
      carbs: 37,
      protein: 4
    },
    { name: "Eclair", calories: 262, fat: 16, carbs: 24, protein: 6 },
    { name: "Cupcake", calories: 305, fat: 4, carbs: 67, protein: 4 },
    { name: "Gingerbread", calories: 356, fat: 16, carbs: 49, protein: 4 }
  ];

  sortedData: Dessert[];
  isAsc: boolean = false;

  ngOnInit() {
    this.sortedData = this.desserts.slice();
  }

  onSortData(value: string) {
    this.isAsc = !this.isAsc;
    const data = this.desserts.slice();
    this.sortedData = data.sort((a, b) => {
      switch (value) {
        case "name":
          return compare(a.name, b.name, this.isAsc);
        case "calories":
          return compare(a.calories, b.calories, this.isAsc);
        case "fat":
          return compare(a.fat, b.fat, this.isAsc);
        case "carbs":
          return compare(a.carbs, b.carbs, this.isAsc);
        case "protein":
          return compare(a.protein, b.protein, this.isAsc);
        default:
          return 0;
      }
    });
  }
}

function compare(
  a: number | string,
  b: number | string,
  isAsc: boolean
): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
