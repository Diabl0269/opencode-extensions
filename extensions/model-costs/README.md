# Model Costs

OpenCode V2 server extension that adds exact token prices directly to model names in the original model picker.

It displays input, output, cache-read, and cache-write prices per one million tokens while preserving the picker’s native search, scrolling, favorites, recent models, provider filtering, and thinking variants.

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
