#!/usr/bin/env tsx
import { seedService } from '@/services/seed.service';

async function testSeed() {
  console.log('🧪 Iniciando prueba de seed con subida de archivos...');

  try {
    // Ejecutar solo el seed de géneros como prueba
    await seedService.seedAll();
    console.log('✅ Prueba completada exitosamente');
  } catch (error) {
    console.error('❌ Error en la prueba:', error);
  }
}

if (require.main === module) {
  testSeed();
}
