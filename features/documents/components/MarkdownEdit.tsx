"use client";

import { useState, useRef, useMemo } from "react";
import { marked } from "marked";
import { undo, redo } from "prosemirror-history";
import "github-markdown-css/github-markdown-dark.css";
import {
  Heading,
  Bold,
  Italic,
  Quote,
  Code,
  Link,
  List,
  ListOrdered,
  CheckSquare,
  Eye,
  Pencil,
  Minus,
  Undo,
  Redo,
} from "lucide-react";
import { DOMSerializer } from "prosemirror-model";
import { defaultMarkdownParser, schema } from "prosemirror-markdown";

marked.setOptions({ gfm: true, breaks: true });

interface Props {
  initialMarkdown?: string;
  onchange?: (markdown: string) => void;
}

type Tab = "write" | "preview";

export default function MarkdownEdit({
  initialMarkdown = "",
  onchange,
}: Props) {
  const [tab, setTab] = useState<Tab>("write");
  const [markdown, setMarkdown] = useState(initialMarkdown);
  const [history, setHistory] = useState<string[]>([initialMarkdown]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const preview = useMemo(() => {
    if (tab !== "preview") return "";

    const doc = defaultMarkdownParser.parse(markdown);
    const serializer = DOMSerializer.fromSchema(schema);
    const fragment = serializer.serializeFragment(doc.content);
    const div = document.createElement("div");
    div.appendChild(fragment);
    return div.innerHTML;
  }, [tab, markdown]);

  const handleChange = (value: string) => {
    setMarkdown(value);
    setHistory((prev) => [...prev.slice(0, historyIndex + 1), value]);
    setHistoryIndex((prev) => prev + 1);
    onchange?.(value);
  };

  const execCommand = (cmd: string) => {
    const ta = textareaRef.current;
    if (ta === null) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const selected = markdown.slice(start, end);
    const before = markdown.slice(0, start);
    const after = markdown.slice(end);

    const wrap = (prefix: string, suffix = prefix) => {
      const result = selected
        ? `${before}${prefix}${selected}${suffix}${after}`
        : `${before}${prefix}texto${suffix}${after}`;
      setMarkdown(result);
      onchange?.(result);
    };

    const wrapLine = (prefix: string) => {
      const result = selected
        ? `${before}${prefix}${selected}${after}`
        : `${before}${prefix}texto${after}`;
      setMarkdown(result);
      onchange?.(result);
    };

    switch (cmd) {
      case "bold": {
        wrap("**");
        return;
      }
      case "italic": {
        wrap("_");
        return;
      }
      case "code": {
        wrap("`");
        return;
      }
      case "heading": {
        wrapLine("## ");
        return;
      }
      case "quote": {
        wrapLine("> ");
        return;
      }
      case "link": {
        wrap("[", "](url)");
        return;
      }
      case "ul": {
        wrapLine("- ");
        return;
      }
      case "ol": {
        wrapLine("1. ");
        return;
      }
      case "task": {
        wrapLine("- [ ] ");
        return;
      }
      case "hr": {
        const result = `${before}\n---\n${after}`;
        setMarkdown(result);
        onchange?.(result);
        break;
      }
      case "undo": {
        if (historyIndex > 0) {
          const newIndex = historyIndex - 1;
          setHistoryIndex(newIndex);
          setMarkdown(history[newIndex]);
          onchange?.(history[newIndex] ?? "");
        }
        break;
      }
      case "redo": {
        if (historyIndex < history.length - 1) {
          const newIndex = historyIndex + 1;
          setHistoryIndex(newIndex);
          setMarkdown(history[newIndex]);
          onchange?.(history[newIndex] ?? "");
        }
        break;
      }
    }

    ta.focus();
  };

  const toolbarGroups = [
    [
      { cmd: "heading", icon: <Heading size={15} />, title: "Heading" },
      { cmd: "bold", icon: <Bold size={15} />, title: "Bold" },
      { cmd: "italic", icon: <Italic size={15} />, title: "Italic" },
      { cmd: "quote", icon: <Quote size={15} />, title: "Quote" },
      { cmd: "code", icon: <Code size={15} />, title: "Code" },
      { cmd: "link", icon: <Link size={15} />, title: "Link" },
    ],
    [
      { cmd: "ol", icon: <ListOrdered size={15} />, title: "Ordered list" },
      { cmd: "ul", icon: <List size={15} />, title: "Unordered list" },
      { cmd: "task", icon: <CheckSquare size={15} />, title: "Task list" },
    ],
    [
      { cmd: "hr", icon: <Minus size={15} />, title: "Divider" },
      { cmd: "undo", icon: <Undo size={15} />, title: "Undo" },
      { cmd: "redo", icon: <Redo size={15} />, title: "Redo" },
    ],
  ];

  return (
    <div
      className="w-full rounded-2xl overflow-hidden"
      style={{
        background: "rgba(14,14,26,0.9)",
        border: "1px solid rgba(255,255,255,0.07)",
        backdropFilter: "blur(24px)",
        boxShadow:
          "0 32px 80px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.07)",
      }}
    >
      <div
        style={{
          height: 1,
          background:
            "linear-gradient(90deg,transparent,rgba(124,58,237,0.5) 50%,transparent)",
        }}
      />

      <div
        className="flex items-center justify-between px-3 gap-3 flex-wrap"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
      >
        <div className="flex">
          {(
            [
              ["write", <Pencil size={13} />, "Write"],
              ["preview", <Eye size={13} />, "Preview"],
            ] as const
          ).map(([id, icon, label]) => (
            <button
              key={id}
              onClick={() => {
                setTab(id);
              }}
              className="flex items-center gap-1.5 px-4 py-3 text-[12px] font-medium transition-all relative cursor-pointer"
              style={{ color: tab === id ? "#a78bfa" : "#6b6b6b" }}
            >
              {icon}
              {label}
              {tab === id ? (
                <span
                  className="absolute bottom-0 inset-x-0 h-[2px]"
                  style={{
                    background: "#7c3aed",
                    boxShadow: "0 0 8px rgba(124,58,237,0.6)",
                  }}
                />
              ) : null}
            </button>
          ))}
        </div>

        {tab === "write" ? (
          <div className="flex items-center gap-0.5 py-1.5 flex-wrap">
            {toolbarGroups.map((group, gi) => (
              <div key={gi} className="flex items-center gap-0.5">
                {group.map(({ cmd, icon, title }) => (
                  <button
                    key={cmd}
                    title={title}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      execCommand(cmd);
                    }}
                    className="flex items-center justify-center w-8 h-8 rounded-md transition-colors cursor-pointer hover:bg-white/5 hover:text-[#f0f0f0]"
                    style={{ color: "#6b6b6b" }}
                  >
                    {icon}
                  </button>
                ))}
                {gi < toolbarGroups.length - 1 ? (
                  <div
                    className="w-px h-4 mx-1"
                    style={{ background: "rgba(255,255,255,0.07)" }}
                  />
                ) : null}
              </div>
            ))}
          </div>
        ) : null}
      </div>

      {tab === "write" ? (
        <textarea
          ref={textareaRef}
          value={markdown}
          onChange={(e) => {
            handleChange(e.target.value);
          }}
          className="w-full min-h-[480px] p-6 bg-transparent outline-none resize-none font-mono text-[14px] leading-relaxed text-[#d4d4d8] caret-[#a78bfa] placeholder:text-[#2e2e45]"
          placeholder="Write your markdown here..."
          spellCheck={false}
        />
      ) : null}

      {tab === "preview" ? (
        <div
          className="markdown-body h-[480px] overflow-y-auto p-6"
          style={{ background: "transparent" }}
          dangerouslySetInnerHTML={{ __html: preview }}
        />
      ) : null}
    </div>
  );
}
