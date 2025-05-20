import React from 'react';

interface RetroFrameProps {
  children: React.ReactNode;
  title?: string;
  withGrid?: boolean;
  className?: string;
}

const RetroFrame: React.FC<RetroFrameProps> = ({
  children,
  title,
  withGrid = false,
  className = '',
}) => {
  return (
    <div className={`crt-effect ${className}`}>
      {title && (
        <div className="terminal-header">
          <div className="terminal-dot red"></div>
          <div className="terminal-dot yellow"></div>
          <div className="terminal-dot green"></div>
          <div className="terminal-title">{title}</div>
        </div>
      )}
      <div className={`p-4 ${withGrid ? 'grid-bg' : ''}`}>{children}</div>
    </div>
  );
};

export default RetroFrame;
