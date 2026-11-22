# Model Costs

OpenCode V2 server extension that adds exact token prices directly to model names in the original model picker.

It displays input, output, cache-read, and cache-write prices per one million tokens while preserving the picker’s native search, scrolling, favorites, recent models, provider filtering, and thinking variants.

## Pricing source and updates

**Prices are dynamic.** They come from the active OpenCode model catalog (`Model.Info.cost`), which OpenCode builds from models.dev, provider integrations, and your configuration. The extension does not ship or maintain its own price table.

When OpenCode refreshes its model catalog, the extension’s model transform runs again and replaces the displayed prices with the latest catalog values. This keeps prices aligned with the models currently available in the project.

One caveat: when OpenCode cannot reach its catalog sources, it may continue using its last cached catalog. During that offline period, the displayed prices reflect the cached catalog and can be temporarily stale; they update automatically after the next successful refresh.

## Install

From a cloned `opencode-extensions` repository, reference this directory in `~/.config/opencode/opencode.json`:

```json
{
  "plugins": [
    "/path/to/opencode-extensions/extensions/model-costs"
  ]
}
```

No slash command or replacement picker is used.
