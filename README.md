# USACO 2024 February Bronze - Problem 1: Palindrome Game

This repository contains a JavaScript solution for the USACO Bronze problem **Palindrome Game**.

It includes:

- `solution.js` - a runnable Node.js solution
- a step-by-step explanation of the idea
- GitHub setup instructions

---

## Problem summary

You start with a pile of `S` stones.

Bessie and Elsie take turns removing stones, with **Bessie going first**.

On each turn, a player must remove a **positive palindrome number** of stones.

A palindrome is a number that reads the same forward and backward, such as:

- `1`
- `7`
- `121`
- `9009`

A number like `10` is **not** a palindrome.

If it is your turn and there are no stones left, you lose.

For each test case, we must print:

- `B` if Bessie wins with perfect play
- `E` if Elsie wins with perfect play

---

## The most important observation

The losing positions are exactly the numbers that end in `0`.

That means:

- if `S` ends in `0`, answer is `E`
- otherwise, answer is `B`

That is the entire solution.

The hard part is understanding **why** this is true.

---

## Step 1: What palindromes can we always use?

Every one-digit positive number is a palindrome:

- `1`
- `2`
- `3`
- ...
- `9`

So if a number ends in digit `d` where `d` is from `1` to `9`, then we are always allowed to remove exactly `d` stones.

That is useful because removing the last digit lets us control whether the result ends in `0`.

---

## Step 2: Why numbers ending in 0 are bad

Suppose the current pile size ends in `0`.

Can the current player remove a palindrome and still leave another number ending in `0`?

No.

Why?

Because a positive palindrome **cannot end in `0`**.

If a palindrome ended in `0`, then it would also have to start with `0`, because the first and last digits must match. But normal decimal numbers cannot start with `0`.

So every positive palindrome has last digit in `{1,2,3,4,5,6,7,8,9}`.

Now think about this:

- current number ends in `0`
- you subtract a number ending in `1` to `9`

The result cannot still end in `0`.

So from a number ending in `0`, **every legal move goes to a number that does not end in `0`**.

That means a number ending in `0` is a candidate for a losing position.

---

## Step 3: Why numbers not ending in 0 are good

Now suppose the current pile size does **not** end in `0`.

Let its last digit be `d`, where `d` is one of `1` through `9`.

Since `d` itself is a one-digit palindrome, the current player can remove exactly `d` stones.

That makes the new pile size end in `0`.

So from any number not ending in `0`, the player can move to a number ending in `0`.

---

## Step 4: Put the two observations together

We proved:

1. From any number ending in `0`, every move goes to a number **not** ending in `0`.
2. From any number **not** ending in `0`, there is a move to a number ending in `0`.

That is exactly the definition of winning and losing positions in a normal impartial game:

- positions ending in `0` are **losing**
- positions not ending in `0` are **winning**

So:

- `S % 10 == 0` -> Elsie wins -> print `E`
- otherwise -> Bessie wins -> print `B`

---

## Why this works even for huge numbers

The problem says `S` can be extremely large, even up to `10^(10^5)` in size.

That means `S` does **not** fit in normal JavaScript numbers.

But we do not need the whole number.

We only care about its **last digit**.

So we can read `S` as a string and check:

```js
S[S.length - 1]
```

If that last character is `'0'`, answer `E`. Otherwise answer `B`.

---

## Example walkthrough

### Example: `S = 10`

- `10` ends in `0`
- Bessie cannot move to another number ending in `0`
- whatever palindrome she removes, the result ends in a nonzero digit
- then Elsie can remove that last digit and return to a number ending in `0`

So `10` is losing for the starting player.

Answer: `E`

### Example: `S = 12`

- `12` does not end in `0`
- last digit is `2`
- Bessie removes `2`
- pile becomes `10`
- `10` is losing for the next player

So `12` is winning.

Answer: `B`

### Example: `S = 8`

- `8` is itself a palindrome
- Bessie can remove all `8` stones immediately

But even without noticing that, `8` does not end in `0`, so our rule already says it is winning.

Answer: `B`

---

## Algorithm

For each test case:

1. Read `S` as a string
2. Look at the last character
3. If the last character is `'0'`, print `E`
4. Otherwise, print `B`

---

## Time complexity

Let `L` be the number of digits in `S`.

For each test case:

- reading the string takes `O(L)` because the input must be read
- checking the last character is `O(1)`

So the processing work after input is constant time per test case.

---

## JavaScript solution

See `solution.js` for the full implementation with detailed comments.

---

## How to run

Make sure you have Node.js installed.

Run:

```bash
node solution.js < input.txt
```

---

## Example input

```text
3
8
10
12
```

## Example output

```text
B
E
B
```

---

## How to create a GitHub repository for this

### 1. Create a new folder and place the files inside

Your folder should look like this:

```text
usaco-palindrome-game/
  README.md
  solution.js
```

### 2. Initialize git

```bash
git init
```

### 3. Add the files

```bash
git add README.md solution.js
```

### 4. Commit them

```bash
git commit -m "Add USACO Palindrome Game solution"
```

### 5. Create a new GitHub repository

Create a new empty repository on GitHub, for example:

```text
usaco-palindrome-game
```

### 6. Connect your local repo to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/usaco-palindrome-game.git
```

### 7. Push it

```bash
git branch -M main
git push -u origin main
```

---

## Final takeaway

Even though the problem looks like a game involving huge numbers and arbitrary palindromes, the only thing that matters is the **last digit**.

- ending in `0` -> losing
- anything else -> winning

That makes the solution simple, fast, and safe for extremely large inputs.
