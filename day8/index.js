const { readFileSync } = require("fs")
/* 1484 not right */
const data = readFileSync("./input.txt", "utf-8")
const rows = data.split("\n")
const matrix = rows.map((row) => [...row].map(Number))
const WIDTH = matrix[0].length
const HEIGHT = matrix.length
const OUTTER_TREES = 2 * WIDTH + 2 * HEIGHT - 4
console.log(OUTTER_TREES)
console.log(matrix)

/* wir brauchen die erste und letzte reihe sowie erste und letzte Spalte nicht
  Die bäume sind ganz aussen und eh sichtbar  */
let inside_visibility_counter = 0
for (let row = 1; row < HEIGHT - 1; row++) {
  for (let col = 1; col < WIDTH - 1; col++) {
    const tree = matrix[row][col]
    if (is_visibile(tree, row, col)) {
      inside_visibility_counter++
    }
  }
}
console.log(inside_visibility_counter + OUTTER_TREES)

function is_visibile(element, row, col) {
  return (
    is_visible_top(element, row, col) ||
    is_visible_right(element, row, col) ||
    is_visible_bottom(element, row, col) ||
    is_visible_left(element, row, col)
  )
}
function is_visible(element, trees) {
  const biggest_tree = Math.max(...trees)
  if (element > biggest_tree) {
    return true
  }
  return false
}
function is_visible_top(element, row, col) {
  /* erste reihe bis aktuelle -1 so ist slice defininert */
  const rows_on_top = matrix.slice(0, row)
  const trees_on_top = rows_on_top.map((row) => row[col])
  return is_visible(element, trees_on_top)
}
function is_visible_bottom(element, row, col) {
  const rows_on_bottom = matrix.slice(row + 1)
  const trees_on_bottom = rows_on_bottom.map((row) => row[col])
  return is_visible(element, trees_on_bottom)
}

function is_visible_right(element, row, col) {
  const current_row_of_trees = matrix[row]
  const tree_to_right = current_row_of_trees.slice(col + 1)
  return is_visible(element, tree_to_right)
}
function is_visible_left(element, row, col) {
  const current_row_of_trees = matrix[row]
  const tree_to_left = current_row_of_trees.slice(0, col)
  return is_visible(element, tree_to_left)
}
