import { Plugin } from "@opencode/plugin"
import { formatCatalogName } from "./src/pricing.js"

export default Plugin.define({
  id: "opencode-model-costs",
  async setup(ctx) {
    await ctx.model.transform((editor) => {
      editor.list().forEach((model) => {
        editor.update(model.providerID, model.id, (draft) => {
          draft.name = formatCatalogName(model.name ?? model.id, model.cost)
        })
      })
    })
  },
})
