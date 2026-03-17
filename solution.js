// We use Node's built-in "fs" module so we can read all input from standard input.
// In USACO and most competitive programming problems, input is usually provided through stdin.
const fs = require('fs');

// Read the entire input as a single string.
// - fs.readFileSync(0, 'utf8') reads from file descriptor 0, which is standard input.
// - 'utf8' tells Node to interpret the bytes as text.
const rawInput = fs.readFileSync(0, 'utf8');

// Remove extra whitespace at the beginning and end, then split by any whitespace.
// This means spaces and newlines are all treated as separators.
// Example:
//   "3\n8\n10\n12\n"  ->  ["3", "8", "10", "12"]
const tokens = rawInput.trim().split(/\s+/);

// The first token is T, the number of test cases.
// Number(...) converts the string into a JavaScript number.
const T = Number(tokens[0]);

// We will store each answer ('B' or 'E') in this array,
// then print everything at the end.
const answers = [];

// Process each test case one by one.
// The test cases start at tokens[1], tokens[2], ..., tokens[T].
for (let i = 1; i <= T; i++) {
  // Read the current pile size S as a STRING, not as a number.
  // This is extremely important.
  // The problem allows S to be astronomically large, much bigger than what JavaScript's
  // normal Number type can safely represent.
  // By keeping it as a string, we avoid overflow and precision issues completely.
  const s = tokens[i];

  // We only care about the LAST DIGIT of S.
  // In a string, the last character is at index s.length - 1.
  const lastDigit = s[s.length - 1];

  // Core game theory result:
  // - If the number ends in '0', the starting player loses with optimal play.
  // - Otherwise, the starting player wins with optimal play.
  //
  // Why?
  // 1. Every positive palindrome must end in a nonzero digit.
  //    (If it ended in 0, it would also have to begin with 0, which is not allowed.)
  // 2. Therefore, from a number ending in 0, any legal subtraction changes the last digit
  //    away from 0.
  // 3. From a number ending in a nonzero digit d, the player can subtract d itself,
  //    because every one-digit number 1..9 is a palindrome.
  //    That move leaves a number ending in 0.
  //
  // So numbers ending in 0 are losing positions, and all others are winning positions.
  if (lastDigit === '0') {
    // If S ends in 0, then Bessie (the first player) loses under optimal play,
    // so Elsie wins. The problem wants us to print 'E'.
    answers.push('E');
  } else {
    // If S does not end in 0, then Bessie can force a win,
    // so we print 'B'.
    answers.push('B');
  }
}

// Print all answers, one per line.
// join('\n') places a newline between each answer.
console.log(answers.join('\n'));
