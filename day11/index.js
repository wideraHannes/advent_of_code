const { readFileSync } = require("fs")

function extract_operation(operation_raw) {
  const operation_extracted = operation_raw.split(" ").slice(3).join(" ")
  const operation = eval("(old) => " + operation_extracted) // transform text into function
  return operation
}

function extract_test(test_raw, test_true_raw, test_false_raw) {
  const test_condition = parseInt(test_raw.split(" ").slice(-1)[0]) // integer
  const test_true = parseInt(test_true_raw.split(" ").slice(-1)[0])
  const test_false = parseInt(test_false_raw.split(" ").slice(-1)[0])
  const test = eval(
    `(worry_number) => (worry_number % ${test_condition} === 0)  ? ${test_true}: ${test_false}`
  )
  return [test, test_condition]
}

function get_monkey_data() {
  const data = readFileSync("./input.txt", "utf-8").split("\n\n")
  const raw_monkeys = data.map((monkey) => monkey.split("\n"))
  return raw_monkeys.reduce((monkeys, raw_monkey) => {
    const trimmed_data = raw_monkey.map((item) => item.trim())
    const [
      monkey_name_raw,
      items_raw,
      operation_raw,
      test_raw,
      test_true_raw,
      test_false_raw,
    ] = trimmed_data
    const monkey_name = parseInt(monkey_name_raw.split(" ")[1][0])
    const items = items_raw
      .split(" ")
      .slice(2)
      .map((item) => parseInt(item))
    const operation = extract_operation(operation_raw) // transform text into function
    const [test, test_condition] = extract_test(
      test_raw,
      test_true_raw,
      test_false_raw
    )
    monkeys[monkey_name] = {
      items,
      operation,
      test,
      test_condition,
      inspects_items: 0,
    }
    return monkeys
  }, {})
}

function make_monkey_turn(monkey, divider) {
  monkey.items.forEach((item) => {
    const worry_value_after_inspect = monkey.operation(item)
    const worry_value_after_bored =
      Math.floor(worry_value_after_inspect / divider) % super_modulo
    const pass_item_to_monkey = monkey.test(worry_value_after_bored)
    monkeys[pass_item_to_monkey].items.push(worry_value_after_bored)
    monkey.inspects_items++
  })
  monkey.items = []
}

function calc_score(rounds, divider) {
  for (let index = 1; index < rounds + 1; index++) {
    Object.keys(monkeys).forEach((key) => {
      make_monkey_turn(monkeys[key], divider)
    })
  }

  const sorted_inspections_descending = Object.entries(monkeys)
    .map(([monkey_key, monkey_value]) => monkey_value.inspects_items)
    .sort((a, b) => b - a)

  console.log(sorted_inspections_descending)
  const [first, second, ...rest] = sorted_inspections_descending
  const score = first * second
  console.log(score)
}

const monkeys = get_monkey_data()
/* falls zahlen zu gross werden durch den super modulo bleiben sie durch die gleiche test_condition teilbar */
const super_modulo = Object.entries(monkeys).reduce(
  (acc, [key, monkey]) => acc * monkey.test_condition,
  1
)

/* Teil 1 */
/* calc_score(20, 3) */
/* Teil 2 */
calc_score(10000, 1)

/* supermodulo: Brauchen wir da die zahlen sonst unendlich gross werden.
 */

/* 60 ist durch jeden modulo operator exact teilbar */

/* Modulo: 3,4,5 */
/* 
100 % 3 = 1
100 % 4 = 0
100 % 5 = 0 
*/
/* annahme nicht 100 sondern viel grössere zahl mit welchem modulo wird es in den gleichen koffer geworfen */
/* 3*4*5 = 60 */

/* 
zuerst 100 % 60 = 40

40 % 3 = 1
40 % 4 = 0
40 % 5 = 0

*/
