import type { KeyboardEvent, RefObject } from "react";
import { useCallback } from "react";
import type { Syntax, WrapSyntax, LineSyntax } from "../types";

const KEYBOARD_SHORTCUTS = {
  b: { type: "wrap", before: "**", after: "**" },
  i: { type: "wrap", before: "_", after: "_" },
  k: { type: "wrap", before: "[", after: "](url)" },
  "`": { type: "wrap", before: "`", after: "`" },
  e: { type: "wrap", before: "`", after: "`" },
} as const satisfies Record<string, Syntax>;

const applyWrapSyntax = (
  textarea: HTMLTextAreaElement,
  syntax: WrapSyntax,
  setValue: (v: string) => void,
) => {
  const { selectionStart, selectionEnd, value } = textarea;
  const selectedText = value.slice(selectionStart, selectionEnd);

  const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(
    `^${escape(syntax.before)}(.*?)${escape(syntax.after)}$`,
    "s",
  );

  let newValue: string;
  let newStart: number;
  let newEnd: number;

  if (regex.test(selectedText)) {
    const unwrapped = selectedText.replace(regex, "$1");
    newValue =
      value.slice(0, selectionStart) + unwrapped + value.slice(selectionEnd);
    newStart = selectionStart;
    newEnd = selectionStart + unwrapped.length;
  } else if (selectedText.length > 0) {
    const wrapped = `${syntax.before}${selectedText}${syntax.after}`;
    newValue =
      value.slice(0, selectionStart) + wrapped + value.slice(selectionEnd);
    newStart = selectionStart;
    newEnd = selectionStart + wrapped.length;
  } else {
    const markers = `${syntax.before}${syntax.after}`;
    newValue =
      value.slice(0, selectionStart) + markers + value.slice(selectionEnd);
    newStart = selectionStart + syntax.before.length;
    newEnd = newStart;
  }

  setValue(newValue);
  requestAnimationFrame(() => {
    textarea.setSelectionRange(newStart, newEnd);
    textarea.focus();
  });
};

const applyLineSyntax = (
  textarea: HTMLTextAreaElement,
  syntax: LineSyntax,
  setValue: (v: string) => void,
) => {
  const { selectionStart, value } = textarea;
  const lineStart = value.lastIndexOf("\n", selectionStart - 1) + 1;
  const lineContent = value.slice(lineStart);
  const lineEnd = lineContent.indexOf("\n");
  const currentLine =
    lineEnd === -1 ? lineContent : lineContent.slice(0, lineEnd);

  let newValue: string;
  let cursorOffset: number;

  if (currentLine.startsWith(syntax.prefix)) {
    newValue =
      value.slice(0, lineStart) +
      currentLine.slice(syntax.prefix.length) +
      value.slice(lineStart + currentLine.length);
    cursorOffset = -syntax.prefix.length;
  } else {
    newValue =
      value.slice(0, lineStart) + syntax.prefix + value.slice(lineStart);
    cursorOffset = syntax.prefix.length;
  }

  setValue(newValue);
  const newCursor = selectionStart + cursorOffset;
  requestAnimationFrame(() => {
    textarea.setSelectionRange(newCursor, newCursor);
    textarea.focus();
  });
};

const dispatchSyntax = (
  textarea: HTMLTextAreaElement,
  syntax: Syntax,
  setValue: (v: string) => void,
) => {
  if (syntax.type === "wrap") {
    applyWrapSyntax(textarea, syntax, setValue);
  } else {
    applyLineSyntax(textarea, syntax, setValue);
  }
};

export const applyMarkdownSyntax = (
  textarea: HTMLTextAreaElement,
  syntax: Syntax,
  setValue: (v: string) => void,
) => {
  dispatchSyntax(textarea, syntax, setValue);
};

export const useMarkdownShortcuts = (
  ref: RefObject<HTMLTextAreaElement>,
  setValue: (v: string) => void,
) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (!e.ctrlKey && !e.metaKey) return;

      const key = e.key.toLowerCase() as keyof typeof KEYBOARD_SHORTCUTS;
      const syntax = KEYBOARD_SHORTCUTS[key];

      const textarea = ref.current;

      e.preventDefault();
      dispatchSyntax(textarea, syntax, setValue);
    },
    [ref, setValue],
  );

  return { handleKeyDown };
};
