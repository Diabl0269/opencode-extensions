"use strict"
const { Plugin, Slot, createKeyed } = require("@opencode/plugin/gui")
const { createSignal, createEffect, onCleanup } = require("solid-js")

const clock = (at) =>
  new Date(at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })

const lastTime = (messages) => {
  for (let i = (messages ? messages.length : 0) - 1; i >= 0; i--) {
    const m = messages[i]
    if (!m || m.role !== "assistant") continue
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

    const SVG =
      '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>'

    ctx.add(Slot, {
      at: "session.header",
      order: 100,
      render: (input) => {
        const el = document.createElement("span")
        el.title = "Time of the last received message"
        el.style.cssText =
          "display:inline-flex;align-items:center;gap:6px;opacity:.7;font-size:12px;white-space:nowrap;pointer-events:none;user-select:none"
        createEffect(() => {
          const id = input.session.id
          let at
          try {
            at = lastTime(input.session.server.data.session.message.list(id))
          } catch {}
          at = at || seen()[id]
          el.style.display = at ? "inline-flex" : "none"
          el.innerHTML = at ? SVG + "<span>Last reply " + clock(at) + "</span>" : ""
        })
        return el
      },
    })
  },
})
