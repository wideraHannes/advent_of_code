const fetch_and_clean_input = require("./init.js")

/* 
A=X=Rock=1
B=Y=Paper=2
C=Z=Scissors=3 */

/* X need to loose */
/* Y need to draw */
/* Z win */

const score_map = {
  /* Rock */
  X: 1,
  /* Paper */
  Y: 2,
  /* Scissor */
  Z: 3,
}
const player_enemy_decrypt = {
  /* Rock */
  A: {
    win: "Y",
    draw: "X",
    lose: "Z",
  },
  /* Paper */
  B: {
    win: "Z",
    draw: "Y",
    lose: "X",
    score: 2,
  },
  /* Scissor */
  C: {
    win: "X",
    draw: "Z",
    lose: "Y",
  },
}

function calculate_player_score(filename = "input.txt") {
  const rounds = fetch_and_clean_input(filename)
  const lose = 0
  const draw = 3
  const win = 6
  counter = 0
  const player_score = rounds.reduce((acc, round_tuple) => {
    counter++
    const [enemy, win_lose_or_draw] = round_tuple
    // lose
    if (win_lose_or_draw === "X") {
      acc += lose + score_map[player_enemy_decrypt[enemy].lose]
    }
    // draw
    if (win_lose_or_draw === "Y") {
      acc += draw + score_map[player_enemy_decrypt[enemy].draw]
    }
    // win
    if (win_lose_or_draw === "Z") {
      acc += win + score_map[player_enemy_decrypt[enemy].win]
    }
    return acc
  }, 0)
  return player_score
}

console.log(calculate_player_score())
