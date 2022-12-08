const { readFileSync } = require("fs")
/* https://en.wikipedia.org/wiki/Lexicographic_order */
async function fetchData() {
  const data = readFileSync("./input.txt", "utf8")
  const pairs = data.split("\n")
  return Promise.all(pairs.map((pair) => pair.split(",")))
}

async function teil1() {
  const split_up_pairs = await fetchData()
  const intervalls = split_up_pairs.reduce((acc, pair) => {
    const [elv1, elv2] = pair
    const [minElv1, maxElv1] = elv1.split("-").map(Number)
    const [minElv2, maxElv2] = elv2.split("-").map(Number)
    if (minElv1 <= minElv2 && maxElv1 >= maxElv2) {
      acc++
      return acc
    }
    if (minElv2 <= minElv1 && maxElv2 >= maxElv1) {
      acc++
      return acc
    }
    return acc
  }, 0)
  console.log(`Teil 1 komplett einschliessen ${intervalls}`)
}

async function teil2() {
  const split_up_pairs = await fetchData()
  const intervalls = split_up_pairs.reduce((acc, pair) => {
    const [elv1, elv2] = pair
    const [minElv1, maxElv1] = elv1.split("-").map(Number)
    const [minElv2, maxElv2] = elv2.split("-").map(Number)

    /* 
    4 Fälle überprüfen
    erste teilaufgabe (komplett beinhalten)
    min2 <= min1 <= max1 <= max2
    min1 <= min2 <= max2 <= max1
    zweite teilaufgabe (überlappen beinhalten)
    min2 <= min1 <= max2 <= max1
    min1 <= min2 <= max1 <= max2
    */
    if (minElv1 <= minElv2 && maxElv1 >= maxElv2) {
      acc++
      return acc
    }
    if (minElv2 <= minElv1 && maxElv2 >= maxElv1) {
      acc++
      return acc
    }
    if (minElv1 >= minElv2 && minElv1 <= maxElv2) {
      acc++
      return acc
    }
    if (maxElv1 >= minElv2 && maxElv1 <= maxElv2) {
      acc++
      return acc
    }
    return acc
  }, 0)
  console.log(`Teil 2 überlappen ${intervalls}`)
}

/* alternative_teil1() */
/* function sectionContains(sections1, section2) {
  const [minSection1, maxSection1] = sections1.split("-")
  const [minSection2, maxSection2] = section2.split("-")
  return minSection1 <= minSection2 && maxSection1 >= maxSection2
}

async function second_solution() {
  const split_up_pairs = await fetchData()
  const section_include_the_other = split_up_pairs.filter(([elv1, elv2]) => {
    return sectionContains(elv1, elv2) || sectionContains(elv2, elv1)
  })
  console.log(section_include_the_other.length)
}
 */

teil1()
teil2()
