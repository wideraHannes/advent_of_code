/* 
Appreciative of your help yesterday, one Elf gives you an encrypted strategy guide (your puzzle input) that they 
say will be sure to help you win. "The first column is what your opponent is going to play: A for Rock, B for Paper,
and C for Scissors. The second column--" Suddenly, the Elf is called away to help with someone's tent.
*/

/* 
A Y
B X
C Z

A=X=Rock=1
B=Y=Paper=2
C=Z=Scissors=3

Rock > Scissors > Paper 

Loose=1
Draw=3
Win=6

*/
const fetch_and_clean_input = require("./init.js")

const player_enemy_decrypt = {
  /* Rock */
  X: {
    win: "C",
    draw: "A",
    lose: "B",
    score: 1,
  },
  /* Paper */
  Y: {
    win: "A",
    draw: "B",
    lose: "C",
    score: 2,
  },
  /* Scissor */
  Z: {
    win: "B",
    draw: "C",
    lose: "A",
    score: 3,
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
    const [enemy, player] = round_tuple
    // lose
    if (player_enemy_decrypt[player].lose === enemy) {
      acc += lose + player_enemy_decrypt[player].score
    }
    // draw
    if (player_enemy_decrypt[player].draw === enemy) {
      acc += draw + player_enemy_decrypt[player].score
    }
    // win
    if (player_enemy_decrypt[player].win === enemy) {
      acc += win + player_enemy_decrypt[player].score
    }
    return acc
  }, 0)
  return player_score
}

console.log(calculate_player_score())

module.exports = calculate_player_score
