"use client";

import EditorWrapper from "@/features/documents/components/EditorWrapper";

export default function Page() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#080812]">
      {/* orbs */}
      <div
        className="pointer-events-none fixed inset-0 overflow-hidden"
        aria-hidden
      >
        <div
          className="absolute rounded-full"
          style={{
            width: 600,
            height: 600,
            top: "-15%",
            left: "-10%",
            background:
              "radial-gradient(circle,rgba(124,58,237,0.35),transparent 70%)",
            filter: "blur(120px)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 500,
            height: 500,
            top: "-10%",
            right: "-8%",
            background:
              "radial-gradient(circle,rgba(6,182,212,0.35),transparent 70%)",
            filter: "blur(120px)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 700,
            height: 700,
            bottom: "-20%",
            left: "50%",
            transform: "translateX(-50%)",
            background:
              "radial-gradient(circle,rgba(236,72,153,0.3),transparent 70%)",
            filter: "blur(140px)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-5 pt-16 pb-20 flex flex-col items-center">
        {/* badge */}
        <div
          className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full"
          style={{
            background: "rgba(124,58,237,0.1)",
            border: "1px solid rgba(124,58,237,0.22)",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{
              background: "#7c3aed",
              boxShadow: "0 0 8px rgba(124,58,237,0.9)",
            }}
          />
          <span
            className="text-[10px] font-medium tracking-widest uppercase"
            style={{ color: "rgba(167,139,250,0.85)" }}
          >
            Markdown editor
          </span>
        </div>

        <h1
          className="font-bold text-[#f0f0f0] text-center mb-3"
          style={{
            fontSize: "clamp(2rem,5vw,3.2rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.04em",
          }}
        >
          Edit your{" "}
          <span
            style={{
              background:
                "linear-gradient(135deg,#a78bfa 0%,#06b6d4 50%,#ec4899 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontStyle: "italic",
            }}
          >
            README.
          </span>
        </h1>

        <p
          className="mb-10 text-center font-mono text-[14px]"
          style={{ color: "#6b6b6b" }}
        >
          Write in markdown. Ship in seconds.
        </p>

        <EditorWrapper />
      </div>
    </div>
  );
}
