const calculate_player_score = require("./1_index.js")

test("3 rounds of schnick schnack schnuck all diffrent", () => {
  expect(calculate_player_score("test1.txt")).toBe(15)
})

test("Enemy nimmt Rock=A und player nimmt Paper=Y", () => {
  /* 
    win=3
    paper=2
    18 = 3xWin für Player
    6 = 3x2 
    24
  */
  expect(calculate_player_score("test2.txt")).toBe(24)
})
