# OpenCode Extensions

A collection of OpenCode V2 extensions by Diabl0269.

## Extensions

| Extension | Description |
| --- | --- |
| [`last-message-time`](extensions/last-message-time/) | Shows when the last assistant reply was received. |
| [`model-costs`](extensions/model-costs/) | Adds dynamic prices from OpenCode’s model catalog to the original model picker. |

## Install a local extension

Clone this repository, then add the desired extension directory to your OpenCode configuration:

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "plugins": [
    "/path/to/opencode-extensions/extensions/last-message-time",
    "/path/to/opencode-extensions/extensions/model-costs"
  ]
}
```

Desktop loads plugins from `opencode.json` or `opencode.jsonc`. TUI-only extensions can be configured in `cli.json` when appropriate; see each extension's README.

## Repository layout

```text
extensions/
  last-message-time/
  model-costs/
```

Add future extensions under `extensions/<extension-name>/` with their own `package.json`, README, source, and tests.
