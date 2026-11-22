# Last Message Time

OpenCode V2 Desktop + TUI extension that shows when the last assistant reply was received.

- Desktop: pill above the composer, such as `Last reply 14:32:05`
- TUI: status text in the prompt footer

## Install

From a cloned `opencode-extensions` repository, reference this directory:

```json
{
  "plugins": [
    "/path/to/opencode-extensions/extensions/last-message-time"
  ]
}
```

Desktop reads `~/.config/opencode/opencode.json`; the TUI can read the same extension from `~/.config/opencode/cli.json`.

## Notes

- The Desktop GUI plugin API is experimental.
- The time comes from the last assistant message, with session execution completion as a fallback.
- The native TUI has no slot inside per-message metadata, so the status appears in the prompt footer.
