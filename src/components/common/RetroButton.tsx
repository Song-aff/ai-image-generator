import React from 'react';

interface RetroButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  type?: 'primary' | 'secondary' | 'danger';
  isLoading?: boolean;
  className?: string;
  disabled?: boolean;
}

const RetroButton: React.FC<RetroButtonProps> = ({
  onClick,
  children,
  type = 'primary',
  isLoading = false,
  className = '',
}) => {
  const getButtonStyle = () => {
    switch (type) {
      case 'primary':
        return 'border-[var(--color-accent-blue)] text-[var(--color-accent-blue)]';
      case 'secondary':
        return 'border-[var(--color-accent-pink)] text-[var(--color-accent-pink)]';
      case 'danger':
        return 'border-[var(--color-error)] text-[var(--color-error)]';
      default:
        return 'border-[var(--color-accent-blue)] text-[var(--color-accent-blue)]';
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={`retro-button ${getButtonStyle()} ${className} relative overflow-hidden`}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <span className="animate-pulse mr-2">Loading</span>
          <span className="inline-block animate-bounce mr-1">.</span>
          <span className="inline-block animate-bounce delay-100 mr-1">.</span>
          <span className="inline-block animate-bounce delay-200">.</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default RetroButton;
