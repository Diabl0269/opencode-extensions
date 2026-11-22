function money(value) {
  if (value === undefined || value === null) return "—"
  return `$${Number(value).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  })}`
}

export function formatCost(costs) {
  const tiers = (costs ?? []).filter((cost) => cost?.tier?.type === "context")
  const selected = tiers.slice().sort((a, b) => (a.tier?.size ?? 0) - (b.tier?.size ?? 0))[0] ?? costs?.[0]
  if (!selected) return "price unavailable"

  return [
    `${money(selected.input)} in`,
    `${money(selected.output)} out`,
    `${money(selected.cache?.read)} cached`,
    `${money(selected.cache?.write)} cache write`,
  ].join(" · ") + " / 1M"
}

export function formatCatalogName(name, costs) {
  return `${name}  -  ${formatCost(costs)}`
}
