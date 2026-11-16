import { Plugin, usePlugin } from "@opencode/plugin/tui"
import { createSignal, onCleanup, Show } from "solid-js"

const [lastReceived, setLastReceived] = createSignal<Record<string, number>>({})

function mark(sessionID: string | undefined, at = Date.now()) {
  if (!sessionID) return
  setLastReceived((prev) => ({ ...prev, [sessionID]: at }))
}

function clock(at: number) {
  return new Date(at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })
}

function ago(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000))
  if (s < 60) return `${s}s ago`
  const m = Math.floor(s / 60)
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  return `${h}h ${m % 60}m ago`
}

function LastMessage(props: { sessionID?: string }) {
  const context = usePlugin()
  const [now, setNow] = createSignal(Date.now())
  const timer = setInterval(() => setNow(Date.now()), 1000)
  onCleanup(() => clearInterval(timer))

  const at = () => (props.sessionID ? lastReceived()[props.sessionID] : undefined)
  return (
    <Show when={at()}>
      {(value) => (
        <text fg={context.theme.text.muted}>
          Last reply {clock(value())} ({ago(now() - value())})
        </text>
      )}
    </Show>
  )
}

export default Plugin.define({
  id: "diabl0269.last-message-time",
  setup(context) {
    const stop = context.data.on("session.execution.succeeded", (event: any) => {
      mark(event?.data?.sessionID ?? event?.sessionID)
    })
    const unslot = context.ui.slot({
      append: "prompt.footer.status",
      render: (props: any) => <LastMessage sessionID={props?.sessionID} />,
    })
    return () => {
      stop()
      unslot()
    }
  },
})
