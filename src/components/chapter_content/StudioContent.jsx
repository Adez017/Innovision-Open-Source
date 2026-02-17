"use client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Card } from "@/components/ui/card";

export default function StudioContent({ content }) {
  return (
    <Card className="p-8">
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />,
            h2: ({ node, ...props }) => <h2 className="text-2xl font-bold mt-6 mb-3" {...props} />,
            h3: ({ node, ...props }) => <h3 className="text-xl font-bold mt-4 mb-2" {...props} />,
            p: ({ node, ...props }) => <p className="mb-4 leading-7" {...props} />,
            ul: ({ node, ...props }) => <ul className="list-disc list-inside mb-4 space-y-2" {...props} />,
            ol: ({ node, ...props }) => <ol className="list-decimal list-inside mb-4 space-y-2" {...props} />,
            li: ({ node, ...props }) => <li className="ml-4" {...props} />,
            code: ({ node, inline, ...props }) =>
              inline
                ? <code className="bg-muted px-2 py-1 rounded text-sm font-mono" {...props} />
                : <code className="block bg-muted p-4 rounded-lg text-sm font-mono overflow-x-auto mb-4" {...props} />,
            blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-blue-500 pl-4 italic my-4 text-muted-foreground" {...props} />,
            strong: ({ node, ...props }) => <strong className="font-bold" {...props} />,
            em: ({ node, ...props }) => <em className="italic" {...props} />,
          }}
        >
          {content || "No content available"}
        </ReactMarkdown>
      </div>
    </Card>
  );
}
