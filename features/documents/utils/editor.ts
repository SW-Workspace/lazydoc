import { EditorState } from "prosemirror-state";
import { history } from "prosemirror-history";
import { keymap } from "prosemirror-keymap";
import { baseKeymap } from "prosemirror-commands";
import { undo, redo } from "prosemirror-history";
import { defaultMarkdownParser } from "prosemirror-markdown";

export const createState = (markdown = "") => {
  return EditorState.create({
    doc: defaultMarkdownParser.parse(markdown),
    plugins: [
      history(),
      keymap({ "Mod-z": undo, "Mod-y": redo }),
      keymap(baseKeymap),
    ],
  });
};
