import { sort_calories_by_elv_descending } from "./init.js";
// input: number of calories each elv is carrying

function find_elv_with_most_calories() {
  return sort_calories_by_elv_descending()[0];
}

console.log(find_elv_with_most_calories);
