# opencode-last-message-time

OpenCode TUI plugin that shows the time the last assistant reply was received
(e.g. `Last reply 14:32:05 (2m ago)`) in the prompt footer status area.

## Install

**Desktop app** (reads `opencode.json`, not `cli.json`) - add to `~/.config/opencode/opencode.json`:

```json
{ "plugins": ["github:Diabl0269/opencode-last-message-time"] }
```

The pill appears above the composer: `Last reply 14:32:05`.

**Terminal UI** - add to `~/.config/opencode/cli.json`:

Add to `~/.config/opencode/cli.json`:

```json
{ "plugins": ["github:Diabl0269/opencode-last-message-time"] }
```

Or clone the repo and reference the local path:

```json
{ "plugins": ["/path/to/opencode-last-message-time"] }
```

## Notes

- The Desktop GUI plugin API is experimental. The time is read from the last assistant message, falling back to the moment a run finishes.
- OpenCode's plugin API has no slot inside the per-message metadata line
  (model / tokens / duration), so the time is shown in the prompt footer.
- The time shows after the first reply received in the current TUI run.
