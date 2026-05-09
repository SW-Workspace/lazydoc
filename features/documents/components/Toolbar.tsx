import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  Link,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Quote,
  Minus,
} from "lucide-react";
import type { RefObject } from "react";
import { applyMarkdownSyntax } from "../hooks/Usemarkdownshortcuts";
import type { Syntax } from "../types";

const BUTTONS: {
  title: string;
  icon: React.ReactNode;
  syntax: Syntax;
  dividerBefore?: boolean;
}[] = [
  {
    title: "Heading 1",
    icon: <Heading1 size={14} />,
    syntax: { type: "line", prefix: "# " },
  },
  {
    title: "Heading 2",
    icon: <Heading2 size={14} />,
    syntax: { type: "line", prefix: "## " },
  },
  {
    title: "Bold (Ctrl+B)",
    icon: <Bold size={14} />,
    syntax: { type: "wrap", before: "**", after: "**" },
    dividerBefore: true,
  },
  {
    title: "Italic (Ctrl+I)",
    icon: <Italic size={14} />,
    syntax: { type: "wrap", before: "_", after: "_" },
  },
  {
    title: "Strikethrough",
    icon: <Strikethrough size={14} />,
    syntax: { type: "wrap", before: "~~", after: "~~" },
  },
  {
    title: "Inline Code (Ctrl+E)",
    icon: <Code size={14} />,
    syntax: { type: "wrap", before: "`", after: "`" },
    dividerBefore: true,
  },
  {
    title: "Link (Ctrl+K)",
    icon: <Link size={14} />,
    syntax: { type: "wrap", before: "[", after: "](url)" },
  },
  {
    title: "Quote",
    icon: <Quote size={14} />,
    syntax: { type: "line", prefix: "> " },
    dividerBefore: true,
  },
  {
    title: "Bullet List",
    icon: <List size={14} />,
    syntax: { type: "line", prefix: "- " },
  },
  {
    title: "Numbered List",
    icon: <ListOrdered size={14} />,
    syntax: { type: "line", prefix: "1. " },
  },
  {
    title: "Horizontal Rule",
    icon: <Minus size={14} />,
    syntax: { type: "line", prefix: "---" },
  },
];

function ToolbarButton({
  title,
  onClick,
  children,
}: {
  title: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      onMouseDown={(e) => {
        e.preventDefault();
        onClick();
      }}
      className="flex items-center justify-center w-7 h-7 rounded-md transition-all duration-150 text-[#9198a1] hover:text-[#e6edf3] hover:bg-[rgba(255,255,255,0.07)] cursor-pointer select-none"
    >
      {children}
    </button>
  );
}

function Divider() {
  return <div className="w-px h-4 bg-[rgba(255,255,255,0.1)] mx-1" />;
}

interface ToolbarProps {
  textareaRef: RefObject<HTMLTextAreaElement | null>;
  setValue: (v: string) => void;
}

export default function Toolbar({ textareaRef, setValue }: ToolbarProps) {
  const handleApply = (syntax: Syntax) => {
    if (!textareaRef.current) return;
    applyMarkdownSyntax(textareaRef.current, syntax, setValue);
  };

  return (
    <div
      className="flex items-center gap-0.5 px-3 py-2 border-b"
      style={{
        borderColor: "rgba(255,255,255,0.07)",
        background: "rgba(255,255,255,0.02)",
      }}
    >
      {BUTTONS.map((btn, i) => (
        <span key={i} className="flex items-center">
          {btn.dividerBefore ? <Divider /> : null}
          <ToolbarButton
            title={btn.title}
            onClick={() => {
              handleApply(btn.syntax);
            }}
          >
            {btn.icon}
          </ToolbarButton>
        </span>
      ))}
    </div>
  );
}
