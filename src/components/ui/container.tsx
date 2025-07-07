import { type ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface Props {
  children: ReactNode;
  centered?: boolean;
  fullScreen?: boolean;
  className?: string;
}

export function Container({ children, centered = true, fullScreen = false, className = '' }: Props) {
  return (
    <div
      className={cn(
        'custom-container',
        centered && 'flex items-center justify-center',
        fullScreen && 'h-screen',
        className,
      )}
    >
      {children}
    </div>
  );
}
