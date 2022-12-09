/* correct answer = 6498 */
/* 
T follows H
left right normal
H macht 1 step right -> T 1 step right (ausser die covern sich gegenseitig)
up down special: 
......
....H.
s..T..
bei so müssen wir noch nichts machen
erst beim nächsten down muss sich T bewegen


after we have all position: count up all positions the tail visited at least once

coordinatensystem mit:

starting: [1,1]
bottom-right: [1,n]
top-left: [m,1]
top-right: [m,n]
*/

const unique_coordinates = []

const add_coordinate = ([newX, newY]) => {
  /* console.log(unique_coordinates) */
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
const pos_t = [1, 1]

const move_h = {
  R: () => pos_h[1]++,
  L: () => pos_h[1]--,
  U: () => pos_h[0]++,
  D: () => pos_h[0]--,
}

const move_t = () => {
  const [H_x, H_y] = pos_h
  const [T_x, T_y] = pos_t
  const x_difference = H_x - T_x
  const x_abs = Math.abs(x_difference)
  const x_normalized_diffrence = x_difference / x_abs // +-1
  const y_difference = H_y - T_y
  const y_abs = Math.abs(y_difference)
  const y_normalized_diffrence = y_difference / y_abs // +-1

  if (x_abs === 2 && y_abs === 1) {
    pos_t[0] += x_normalized_diffrence
    pos_t[1] += y_difference
    return
  }
  if (x_abs === 1 && y_abs === 2) {
    pos_t[1] += y_normalized_diffrence
    pos_t[0] += x_difference
    return
  }
  if (x_abs === 2) {
    pos_t[0] += x_normalized_diffrence
    return
  }
  if (y_abs === 2) {
    pos_t[1] += y_normalized_diffrence
    return
  }
}

data.forEach((movement) => {
  let [direction, steps] = movement.split(" ")
  while (steps > 0) {
    move_h[direction]()
    move_t()
    add_coordinate(pos_t)
    steps--
  }
})

console.log(unique_coordinates.length)
