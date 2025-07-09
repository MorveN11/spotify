import Image from 'next/image';

export function LoadingPage() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-8">
        <div className="relative">
          <Image src="/logo.webp" alt="Spotify Logo" width={80} height={80} className="animate-pulse" priority />
        </div>

        <div className="relative">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-muted border-t-primary"></div>
        </div>

        <div className="text-center">
          <h2 className="mb-2 text-xl font-bold text-white">Cargando Spotify</h2>
          <p className="text-sm text-muted-foreground">Preparando tu música...</p>
        </div>

        <div className="h-1 w-64 overflow-hidden rounded-full bg-muted">
          <div className="h-full animate-pulse rounded-full bg-primary"></div>
        </div>
      </div>
    </div>
  );
}
