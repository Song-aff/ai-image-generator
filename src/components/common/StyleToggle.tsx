import React from 'react';

interface StyleToggleProps {
  id: string;
  label: string;
  isSelected: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
}

const StyleToggle: React.FC<StyleToggleProps> = ({
  id,
  label,
  isSelected,
  onClick,
  icon,
}) => {
  return (
    <div
      className={`
        relative cursor-pointer p-3 border-2 rounded-md transition-all duration-300
        ${
          isSelected
            ? 'border-[var(--color-accent-pink)] bg-[rgba(255,0,255,0.1)]'
            : 'border-[var(--color-accent-blue)] bg-[var(--color-bg-secondary)]'
        }
      `}
      onClick={onClick}
    >
      <div className="flex flex-col items-center">
        {icon && <div className="mb-2">{icon}</div>}
        <span
          className={`
          text-sm font-[var(--font-mono)] transition-all duration-300
          ${
            isSelected
              ? 'text-[var(--color-accent-pink)] font-medium'
              : 'text-[var(--color-text-primary)]'
          }
        `}
        >
          {label}
        </span>
        <div
          className={`
          absolute -top-1 -right-1 w-4 h-4 rounded-full transition-all duration-300
          ${
            isSelected
              ? 'bg-[var(--color-accent-pink)] shadow-[0_0_10px_var(--color-accent-pink)]'
              : 'bg-[var(--color-bg-primary)]'
          }
        `}
        ></div>
      </div>
    </div>
  );
};

export default StyleToggle;
