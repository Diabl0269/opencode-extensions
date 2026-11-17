"use strict"
const { Plugin, ComposerPill, createKeyed } = require("@opencode/plugin/gui")
const { createSignal, onCleanup } = require("solid-js")

const clock = (at) => {
  const d = new Date(at)
  const time = d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })
  if (d.toDateString() === new Date().toDateString()) return time
  return d.toLocaleDateString([], { month: "short", day: "numeric" }) + " " + time
}

const lastTime = (messages) => {
  for (let i = (messages ? messages.length : 0) - 1; i >= 0; i--) {
    const m = messages[i]
    if (!m || (m.role !== "assistant" && m.type !== "assistant")) continue
    const t = m.time && (m.time.completed || m.time.created)
    if (typeof t === "number") return t
  }
}

exports.default = Plugin.define({
  setup(ctx) {
    const [seen, setSeen] = createSignal({})

    createKeyed(
      () => ctx.servers.get("sidecar") && ctx.servers.get("sidecar").data,
      (data) =>
        onCleanup(
          data.on("session.execution.succeeded", (event) => {
            const id = event.data.sessionID
            setSeen((prev) => ({ ...prev, [id]: Date.now() }))
          }),
        ),
    )

    ctx.add(ComposerPill, {
      id: "last-reply",
      show: (input) => {
        const id = input.session.id
        let at
        try {
          at = lastTime(input.session.server.data.session.message.list(id))
        } catch {}
        at = at || seen()[id]
        if (!at) return undefined
        return { label: "🕐 Last reply " + clock(at), title: "Time of the last received message" }
      },
    })
  },
})
