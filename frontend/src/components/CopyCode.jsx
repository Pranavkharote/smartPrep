import React, { useState } from "react";

const CopyCode = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  return (
    <div className="relative">
     

      <button
        onClick={handleCopy}
        className="absolute top-0 right-0 px-2 py-1 text-xs bg-gray-800 text-white rounded hover:bg-gray-700 transition"
      >
        {copied ? "Copied!" : "Copy"}
      </button>

      <pre className="bg-gray-900 text-white p-4 rounded-md overflow-x-auto text-sm leading-relaxed">
        {code}
      </pre>
    </div>
  );
};

export default CopyCode;
