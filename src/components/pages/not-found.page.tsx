'use client';

import Image from 'next/image';
import Link from 'next/link';

export function NotFoundPage() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-8 text-center">
        <div className="relative">
          <Image src="/logo.webp" alt="Spotify Logo" width={60} height={60} className="opacity-50" />
        </div>

        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-white">404</h1>
          <h2 className="text-2xl font-semibold text-white">Página no encontrada</h2>
          <p className="max-w-md text-muted-foreground">
            Lo sentimos, no pudimos encontrar la página que estás buscando.
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
          <Link
            href="/"
            className="rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Ir a Inicio
          </Link>
          <button
            onClick={() => window.history.back()}
            className="rounded-full border border-muted px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-muted/10"
          >
            Volver Atrás
          </button>
        </div>
      </div>
    </div>
  );
}
