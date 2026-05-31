import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import './CodeSnippet.css';

const CodeSnippet = ({ title, code, language = 'csharp' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-snippet-widget">
      <div className="code-snippet-header">
        <h3 className="code-snippet-title">{title}</h3>
        <button
          className="code-snippet-copy"
          onClick={handleCopy}
          title="Copy code"
        >
          {copied ? (
            <>
              <Check size={18} />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy size={18} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      <pre className="code-snippet-pre">
        <code className={`code-snippet-code language-${language}`}>
          {code}
        </code>
      </pre>
    </div>
  );
};

export default CodeSnippet;
