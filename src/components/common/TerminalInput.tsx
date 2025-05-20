import React from 'react';

interface TerminalInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  title?: string;
  subTitle?: string;
}

const TerminalInput: React.FC<TerminalInputProps> = ({
  value,
  onChange,
  placeholder = '// Enter your prompt here...',
  rows = 5,
  title = 'Image Generator',
  subTitle = 'generate_image',
}) => {
  return (
    <div className="w-full mb-4">
      <div className="terminal-header">
        <div className="terminal-dot red"></div>
        <div className="terminal-dot yellow"></div>
        <div className="terminal-dot green"></div>
        <div className="terminal-title">{title}</div>
      </div>
      <div className="terminal-content">
        <div className="flex items-center mb-2">
          <span className="text-[var(--color-accent-pink)] mr-2">$</span>
          <span className="text-[var(--color-text-primary)]">{subTitle}</span>
        </div>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          className="w-full bg-transparent border-none text-[var(--color-text-primary)] font-[var(--font-mono)] focus:outline-none resize-none"
        />
      </div>
    </div>
  );
};

export default TerminalInput;
