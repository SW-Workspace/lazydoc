import { useState } from "react";
import Editor from "./Editor";
import { Pencil, Eye } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Props {
  initialContent?: string;
  namespace: string;
  placeholder: string;
}

const GITHUB_MD_STYLES = `
.gh-md {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans",
    Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  font-size: 16px;
  line-height: 1.5;
  word-wrap: break-word;
  color: #e6edf3;
}
.gh-md h1,
.gh-md h2,
.gh-md h3,
.gh-md h4,
.gh-md h5,
.gh-md h6 {
  margin-top: 24px;
  margin-bottom: 16px;
  font-weight: 600;
  line-height: 1.25;
}
.gh-md h1 { font-size: 2em; padding-bottom: 0.3em; border-bottom: 1px solid #3d444d; }
.gh-md h2 { font-size: 1.5em; padding-bottom: 0.3em; border-bottom: 1px solid #3d444d; }
.gh-md h3 { font-size: 1.25em; }
.gh-md h4 { font-size: 1em; }
.gh-md h5 { font-size: 0.875em; }
.gh-md h6 { font-size: 0.85em; color: #9198a1; }
.gh-md p { margin-top: 0; margin-bottom: 16px; }
.gh-md > *:first-child { margin-top: 0 !important; }
.gh-md > *:last-child { margin-bottom: 0 !important; }
.gh-md a { color: #4493f8; text-decoration: none; }
.gh-md a:hover { text-decoration: underline; }
.gh-md code {
  padding: 0.2em 0.4em;
  margin: 0;
  font-size: 85%;
  white-space: break-spaces;
  background-color: #656c7633;
  border-radius: 6px;
  font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, "Liberation Mono", monospace;
}
.gh-md pre {
  margin-top: 0;
  margin-bottom: 16px;
  padding: 16px;
  overflow: auto;
  font-size: 85%;
  line-height: 1.45;
  background-color: #161b22;
  border-radius: 6px;
  border: 1px solid #3d444d;
}
.gh-md pre code {
  display: inline;
  padding: 0;
  margin: 0;
  overflow: visible;
  line-height: inherit;
  word-wrap: normal;
  background-color: transparent;
  border: 0;
  font-size: 100%;
  white-space: pre;
  color: #e6edf3;
}
.gh-md blockquote {
  margin: 0 0 16px 0;
  padding: 0 1em;
  color: #9198a1;
  border-left: 0.25em solid #3d444d;
}
.gh-md blockquote > :first-child { margin-top: 0; }
.gh-md blockquote > :last-child { margin-bottom: 0; }
.gh-md ul,
.gh-md ol {
  margin-top: 0;
  margin-bottom: 16px;
  padding-left: 2em;
}
.gh-md ul { list-style-type: disc; }
.gh-md ol { list-style-type: decimal; }
.gh-md li { margin-top: 0.25em; }
.gh-md li + li { margin-top: 0.25em; }
.gh-md li > p { margin-top: 16px; }
.gh-md ul ul, .gh-md ul ol, .gh-md ol ol, .gh-md ol ul { margin-top: 0; margin-bottom: 0; }
.gh-md .contains-task-list { list-style: none; padding-left: 0; }
.gh-md .task-list-item { display: flex; align-items: flex-start; gap: 8px; }
.gh-md .task-list-item input[type="checkbox"] {
  margin-top: 3px;
  accent-color: #1f6feb;
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}
.gh-md hr {
  height: 0.25em;
  padding: 0;
  margin: 24px 0;
  background-color: #3d444d;
  border: 0;
}
.gh-md table {
  display: block;
  width: max-content;
  max-width: 100%;
  overflow: auto;
  margin-top: 0;
  margin-bottom: 16px;
  border-spacing: 0;
  border-collapse: collapse;
}
.gh-md table th,
.gh-md table td { padding: 6px 13px; border: 1px solid #3d444d; }
.gh-md table th { font-weight: 600; background-color: #161b22; }
.gh-md table tr { background-color: #0d1117; border-top: 1px solid #3d444db3; }
.gh-md table tr:nth-child(2n) { background-color: #161b22; }
.gh-md img { max-width: 100%; box-sizing: content-box; border-style: none; }
.gh-md strong { font-weight: 600; }
.gh-md del { color: #9198a1; }
.gh-md kbd {
  display: inline-block;
  padding: 3px 5px;
  font-size: 11px;
  line-height: 10px;
  color: #e6edf3;
  vertical-align: middle;
  background-color: #161b22;
  border: solid 1px #3d444d;
  border-radius: 6px;
  box-shadow: inset 0 -1px 0 #3d444d;
  font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, "Liberation Mono", monospace;
}
.gh-md .footnotes {
  font-size: 12px;
  color: #9198a1;
  border-top: 1px solid #3d444d;
  margin-top: 24px;
  padding-top: 16px;
}
.gh-md .footnotes ol { padding-left: 16px; }
.gh-md .footnote-ref { font-size: 12px; }
`;

export default function EditorWrapper({
  initialContent = "",
  namespace,
  placeholder,
}: Props) {
  const [tab, setTab] = useState<boolean>(true);
  const [value, setValue] = useState<string>(initialContent);

  return (
    <div
      className="w-full rounded-2xl h-[520px]"
      style={{
        background: "rgba(14,14,26,0.9)",
        border: "1px solid rgba(255,255,255,0.07)",
        backdropFilter: "blur(24px)",
        boxShadow:
          "0 32px 80px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.07)",
      }}
    >
      <style>{GITHUB_MD_STYLES}</style>

      <div
        style={{
          height: 1,
          background:
            "linear-gradient(90deg,transparent,rgba(124,58,237,0.5) 50%,transparent)",
        }}
      />

      <div
        className="flex items-center px-3"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
      >
        {(
          [
            [true, <Pencil size={13} />, "Write"],
            [false, <Eye size={13} />, "Preview"],
          ] as const
        ).map(([val, icon, label]) => (
          <button
            key={label}
            onClick={() => {
              setTab(val);
            }}
            className="flex items-center gap-1.5 px-4 py-3 text-[12px] font-medium transition-all relative cursor-pointer"
            style={{ color: tab === val ? "#a78bfa" : "#6b6b6b" }}
          >
            {icon}
            {label}
            {tab === val ? (
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

      {tab ? (
        <Editor
          namespace={namespace}
          placeholder={placeholder}
          value={value}
          onChange={setValue}
        />
      ) : null}

      {!tab ? (
        <div className="h-[calc(520px-41px)] overflow-y-auto px-6 py-5">
          {value.trim() ? (
            <div className="gh-md">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  ul({ children, className, ...props }) {
                    const isTaskList =
                      className?.includes("contains-task-list");
                    return (
                      <ul
                        {...props}
                        className={
                          isTaskList ? "contains-task-list" : className
                        }
                      >
                        {children}
                      </ul>
                    );
                  },
                  li({ children, className, ...props }) {
                    const isTask = className?.includes("task-list-item");
                    return (
                      <li
                        {...props}
                        className={isTask ? "task-list-item" : className}
                      >
                        {children}
                      </li>
                    );
                  },
                  input({ ...props }) {
                    return <input {...props} disabled />;
                  },
                }}
              >
                {value}
              </ReactMarkdown>
            </div>
          ) : (
            <p
              style={{
                color: "#3a3a3a",
                fontSize: 14,
                userSelect: "none",
                margin: 0,
              }}
            >
              Nothing to preview.
            </p>
          )}
        </div>
      ) : null}
    </div>
  );
}
