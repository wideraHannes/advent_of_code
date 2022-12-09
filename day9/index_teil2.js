/* Korrekt answer 2531 */

// wir haben jetzt nurnoch einen head und 9 knots die folgen müssen
const unique_coordinates = []
/* TODO vollziehe das kleine beispiel erstmal nach */
const add_coordinate = ([newX, newY]) => {
  let counter = 0
  unique_coordinates.forEach(([x, y]) => {
    if (x === newX && y === newY) {
      counter++
    }
  })
  if (counter > 0) {
    return
  }
  unique_coordinates.push([newX, newY])
}

const { readFileSync } = require("fs")
const data = readFileSync("./input.txt", "utf-8").split("\n")

const pos_h = [1, 1]
/* const pos_t = [1, 1] */
const pos_knots = [
  [1, 1],
  [1, 1],
  [1, 1],
  [1, 1],
  [1, 1],
  [1, 1],
  [1, 1],
  [1, 1],
  [1, 1],
]

const move_h = {
  R: () => pos_h[1]++,
  L: () => pos_h[1]--,
  U: () => pos_h[0]++,
  D: () => pos_h[0]--,
}

const move_knots = () => {
  /* Die direction ist immer die des vormannes */
  let knot_to_follow = pos_h
  for (let knot = 0; knot < pos_knots.length; knot++) {
    const current_knot = pos_knots[knot]

    if (knot > 0) {
      knot_to_follow = pos_knots[knot - 1]
    }

    const [H_x, H_y] = knot_to_follow
    const [T_x, T_y] = current_knot
    const x_difference = H_x - T_x
    const x_abs = Math.abs(x_difference)
    const x_normalized_difference = x_difference / x_abs // +-1

    const y_difference = H_y - T_y
    const y_abs = Math.abs(y_difference)
    const y_normalized_difference = y_difference / y_abs // +-1

    if (x_abs === 2 && y_abs === 2) {
      /* Neuer spezialfall da der parent auch quer sich bewegen kann
        jetzt gibt es auch einen diagonalen abstand von 2 */
      current_knot[1] += y_normalized_difference
      current_knot[0] += x_normalized_difference
      continue
    }
    if (x_abs === 2 && y_abs === 1) {
      current_knot[1] += y_difference
      current_knot[0] += x_normalized_difference
      continue
    }
    if (x_abs === 1 && y_abs === 2) {
      current_knot[1] += y_normalized_difference
      current_knot[0] += x_difference
      continue
    }
    if (x_abs === 2) {
      current_knot[0] += x_normalized_difference
      continue
    }
    if (y_abs === 2) {
      current_knot[1] += y_normalized_difference
      continue
    }
  }
}

data.forEach((movement) => {
  let [direction, steps] = movement.split(" ")
  while (steps > 0) {
    move_h[direction]()
    move_knots()
    /* Add the "tail" knot to our array */
    add_coordinate(pos_knots[8])
    steps--
  }
})

console.log(unique_coordinates.length)
