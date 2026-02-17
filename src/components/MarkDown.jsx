"use client";

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";

// Copy button component for code blocks
const CopyButton = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      toast.success("Code copied!", {
        icon: <Check className="h-4 w-4 text-green-500" />,
        duration: 2000,
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy code");
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`
        absolute top-2 right-2 p-2 rounded-md
        transition-all duration-200 ease-in-out
        ${copied
          ? "bg-green-500/20 text-green-400"
          : "bg-gray-700/50 text-gray-400 hover:bg-gray-600/50 hover:text-gray-200"
        }
      `}
      title={copied ? "Copied!" : "Copy code"}
    >
      {copied ? (
        <Check className="h-4 w-4 animate-scale-check" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
    </button>
  );
};

const MarkDown = ({ content }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          const codeString = String(children).trim();

          return !inline && match ? (
            <div className="relative group my-4">
              {/* Language badge */}
              <div className="absolute top-0 left-0 px-3 py-1 text-xs font-medium text-gray-400 bg-gray-800 rounded-tl-md rounded-br-md">
                {match[1]}
              </div>

              {/* Copy button */}
              <CopyButton code={codeString} />

              <SyntaxHighlighter
                customStyle={{
                  fontSize: "14px",
                  borderRadius: "6px",
                  paddingTop: "2.5rem",
                }}
                style={coldarkDark}
                language={match[1]}
                PreTag="div"
                {...props}
              >
                {codeString}
              </SyntaxHighlighter>
            </div>
          ) : (
            <code
              className={`${className || ""} text-sm bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded`}
              {...props}
            >
              {children}
            </code>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkDown;