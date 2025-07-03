// components/MarkdownRenderer.jsx
import { marked } from "marked";
import DOMPurify from "dompurify";

export default function MarkdownRenderer({ markdownText }) {
  const cleanHTML = DOMPurify.sanitize(marked.parse(markdownText || "⚠️ No AI response"));

  return (
    <div
      className="prose prose-sm dark:prose-invert max-w-none"
      dangerouslySetInnerHTML={{ __html: cleanHTML }}
    />
  );
}
