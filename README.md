# opencode-last-message-time

OpenCode TUI plugin that shows the time the last assistant reply was received
(e.g. `Last reply 14:32:05 (2m ago)`) in the prompt footer status area.

## Install

Add to `~/.config/opencode/cli.json`:

```json
{ "plugins": ["github:Diabl0269/opencode-last-message-time"] }
```

Or clone the repo and reference the local path:

```json
{ "plugins": ["/path/to/opencode-last-message-time"] }
```

## Notes

- OpenCode's plugin API has no slot inside the per-message metadata line
  (model / tokens / duration), so the time is shown in the prompt footer.
- The time shows after the first reply received in the current TUI run.
