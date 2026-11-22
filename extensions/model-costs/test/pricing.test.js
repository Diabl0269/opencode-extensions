import test from "node:test"
import assert from "node:assert/strict"
import { formatCost, formatCatalogName } from "../src/pricing.js"

test("formats all exact model prices", () => {
  assert.equal(
    formatCost([{ input: 3, output: 15, cache: { read: 0.3, write: 3.75 } }]),
    "$3.00 in · $15.00 out · $0.30 cached · $3.75 cache write / 1M",
  )
})

test("uses the smallest context tier", () => {
  assert.equal(
    formatCost([
      { tier: { type: "context", size: 1_000_000 }, input: 5, output: 20 },
      { tier: { type: "context", size: 200_000 }, input: 2, output: 8 },
    ]),
    "$2.00 in · $8.00 out · — cached · — cache write / 1M",
  )
})

test("handles models without pricing", () => {
  assert.equal(formatCost([]), "price unavailable")
})

test("appends prices to a catalog display name", () => {
  assert.equal(
    formatCatalogName("Example", [{ input: 1, output: 5 }]),
    "Example  -  $1.00 in · $5.00 out · — cached · — cache write / 1M",
  )
})
