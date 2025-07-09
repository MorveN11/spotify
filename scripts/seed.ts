#!/usr/bin/env tsx
import { seedService } from '@/services/seed.service';

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  try {
    switch (command) {
      case 'seed':
        console.log('🌱 Ejecutando seed de datos...');
        await seedService.seedAll();
        break;

      case 'clear':
        console.log('🧹 Limpiando base de datos...');
        await seedService.clearAll();
        break;

      case 'reseed':
        console.log('🔄 Reiniciando seed completo...');
        await seedService.reseedAll();
        break;

      default:
        console.log(`
📖 Uso del script de seed:

Comandos disponibles:
  seed    - Ejecuta el seed de datos (géneros, artistas, canciones)
  clear   - Limpia toda la base de datos
  reseed  - Limpia y vuelve a ejecutar el seed completo

Ejemplos:
  pnpm seed seed      # Ejecutar seed
  pnpm seed clear     # Limpiar datos
  pnpm seed reseed    # Reiniciar seed completo
        `);
        break;
    }
  } catch (error) {
    console.error('💥 Error:', error);
    process.exit(1);
  }
}

main().catch(console.error);
