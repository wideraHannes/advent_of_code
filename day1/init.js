import { readFileSync } from "fs"
export function sort_calories_by_elv_descending() {
  const no_newline_chars = fetch_and_clean_input()
  const calorie_sum_by_elv = no_newline_chars.map((elv_calories) => {
    return elv_calories.reduce((acc, item) => {
      acc += parseInt(item)
      return acc
    }, 0)
  })
  // sorting in descending order
  const sorted_calories = calorie_sum_by_elv.sort((a, b) => b - a)
  return sorted_calories
}

function fetch_and_clean_input() {
  const data = readFileSync("./input.txt", "utf8")
  const calories_by_elv = data.split("\n\n")
  const no_newline_chars = calories_by_elv.map((line) => line.split("\n"))
  return no_newline_chars
}
