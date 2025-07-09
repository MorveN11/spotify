import { cn } from '@/lib/utils';

import { Loader2 } from 'lucide-react';

interface Props {
  message?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'inline' | 'page' | 'card';
}

export function Loading({ message = 'Cargando...', className, size = 'md', variant = 'page' }: Props) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  const variantClasses = {
    inline: 'flex items-center gap-2 text-gray-300',
    page: 'flex flex-col items-center justify-center min-h-[200px] text-white',
    card: 'flex flex-col items-center justify-center p-8 rounded-lg bg-gray-900/50 text-white',
  };

  return (
    <div className={cn(variantClasses[variant], className)}>
      <Loader2 className={cn(sizeClasses[size], 'animate-spin text-green-500')} />
      <span className="animate-pulse text-sm font-medium">{message}</span>
    </div>
  );
}
