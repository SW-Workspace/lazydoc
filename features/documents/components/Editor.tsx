import { useRef, useCallback } from "react";
import Toolbar from "./Toolbar";
import { useMarkdownShortcuts } from "../hooks/Usemarkdownshortcuts";

interface Props {
  namespace: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}

export default function Editor({ placeholder, value, onChange }: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { handleKeyDown } = useMarkdownShortcuts(textareaRef, onChange);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange(e.target.value);
    },
    [onChange],
  );

  return (
    <div
      className="relative w-full overflow-hidden rounded-b-2xl transition-shadow duration-200 focus-within:shadow-[0_0_0_1px_rgba(124,58,237,0.5)]"
      style={{
        background: "rgba(14,14,26,0.9)",
        border: "1px solid rgba(255,255,255,0.07)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        boxShadow:
          "0 4px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)",
      }}
    >
      <Toolbar textareaRef={textareaRef} setValue={onChange} />

      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        spellCheck={false}
        className={[
          "relative w-full min-h-[320px] h-[calc(520px-41px)]",
          "rounded-b-2xl resize-none overflow-y-auto",
          "px-6 py-5 text-[14px] leading-relaxed",
          "text-[#e6edf3] bg-transparent",
          "outline-none caret-[#7c3aed]",
          "font-mono",
          "placeholder:text-[#3a3a3a]",
        ].join(" ")}
      />
    </div>
  );
}
