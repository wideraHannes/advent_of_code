import { sort_calories_by_elv_descending } from "./init.js";

function find_top_n_elves(n) {
  const top_n = sort_calories_by_elv_descending().slice(0, n);
  return top_n.reduce((acc, n_th_elv_sum) => {
    acc += n_th_elv_sum;
    return acc;
  }, 0);
}

console.log(find_top_n_elves(3));
