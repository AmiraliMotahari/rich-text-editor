import { Extension } from "@tiptap/core";
import { Plugin, PluginKey } from "prosemirror-state";
import { Decoration, DecorationSet } from "prosemirror-view";
import type { Node as ProsemirrorNode } from "prosemirror-model";

export const AICommands = Extension.create({
  name: "aiCommands",

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey("aiCommands"),
        props: {
          decorations: (state) => {
            const { doc } = state;
            const decorations: Decoration[] = [];

            doc.descendants((node: ProsemirrorNode, pos: number) => {
              const from = pos;
              const to = pos + node.nodeSize;

              if (node.isTextblock && node.textContent.startsWith("/")) {
                decorations.push(
                  Decoration.inline(from, to, {
                    class: "ai-command",
                  })
                );
              }
            });

            return DecorationSet.create(doc, decorations);
          },
        },
      }),
    ];
  },
});
