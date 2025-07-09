import { cn } from '@/lib/utils';

import { AlertCircle, AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  message?: string;
  className?: string;
  variant?: 'inline' | 'page' | 'card';
  showRetry?: boolean;
  onRetry?: () => void;
  title?: string;
  icon?: 'triangle' | 'circle' | 'refresh';
}

export function Error({
  message = 'Ha ocurrido un error',
  className,
  variant = 'page',
  showRetry = false,
  onRetry,
  title = 'Error',
  icon = 'triangle',
}: Props) {
  const variantClasses = {
    inline: 'flex items-center gap-2 text-red-400',
    page: 'flex flex-col items-center justify-center min-h-[200px] text-white',
    card: 'flex flex-col items-center justify-center p-8 rounded-lg bg-gray-900/50 text-white',
  };

  const iconMap = {
    triangle: AlertTriangle,
    circle: AlertCircle,
    refresh: RefreshCw,
  };

  const IconComponent = iconMap[icon];

  return (
    <div className={cn(variantClasses[variant], className)}>
      <div className="flex flex-col items-center gap-3 text-center">
        <IconComponent className="h-12 w-12 text-red-500" />

        {variant !== 'inline' && (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            <p className="max-w-md text-sm text-gray-300">{message}</p>
          </div>
        )}

        {variant === 'inline' && <span className="text-sm font-medium">{message}</span>}

        {showRetry && onRetry && (
          <button
            onClick={onRetry}
            className="mt-2 flex items-center gap-2 rounded-full bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-green-700"
          >
            <RefreshCw className="h-4 w-4" />
            Intentar de nuevo
          </button>
        )}
      </div>
    </div>
  );
}
