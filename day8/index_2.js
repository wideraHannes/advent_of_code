const { readFileSync } = require("fs")
/* 268464 correct answer right */
const data = readFileSync("./input.txt", "utf-8")
const rows = data.split("\n")
const matrix = rows.map((row) => [...row].map(Number))
const WIDTH = matrix[0].length
const HEIGHT = matrix.length
const OUTTER_TREES = 2 * WIDTH + 2 * HEIGHT - 4

/* wir brauchen die erste und letzte reihe sowie erste und letzte Spalte nicht
  Die bäume sind ganz aussen und eh sichtbar  */
let biggest_scenic_score = 0
for (let row = 1; row < HEIGHT - 1; row++) {
  for (let col = 1; col < WIDTH - 1; col++) {
    const tree = matrix[row][col]
    const tree_scenic_score = scenic_score(tree, row, col)
    if (tree_scenic_score > biggest_scenic_score) {
      biggest_scenic_score = tree_scenic_score
    }
  }
}
console.log(biggest_scenic_score)

function scenic_score(element, row, col) {
  return (
    scenic_score_top(element, row, col) *
    scenic_score_right(element, row, col) *
    scenic_score_bottom(element, row, col) *
    scenic_score_left(element, row, col)
  )
}

function calculate_number_of_trees(element, trees) {
  let number_of_trees = 0
  for (const tree of trees) {
    if (element > tree) {
      number_of_trees++
    }
    if (element <= tree) {
      number_of_trees++
      return number_of_trees
    }
  }
  return number_of_trees
}

function scenic_score_top(element, row, col) {
  /* erste reihe bis aktuelle -1 so ist slice defininert */
  const rows_on_top = matrix.slice(0, row)
  const trees_on_top = rows_on_top.map((row) => row[col]).reverse()

  return calculate_number_of_trees(element, trees_on_top)
}
function scenic_score_bottom(element, row, col) {
  const rows_on_bottom = matrix.slice(row + 1)
  const trees_on_bottom = rows_on_bottom.map((row) => row[col])
  return calculate_number_of_trees(element, trees_on_bottom)
}

function scenic_score_right(element, row, col) {
  const current_row_of_trees = matrix[row]
  const tree_to_right = current_row_of_trees.slice(col + 1)
  return calculate_number_of_trees(element, tree_to_right)
}
function scenic_score_left(element, row, col) {
  const current_row_of_trees = matrix[row]
  const tree_to_left = current_row_of_trees.slice(0, col).reverse()
  return calculate_number_of_trees(element, tree_to_left)
}
