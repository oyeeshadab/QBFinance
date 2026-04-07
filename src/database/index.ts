import { runMigrations } from './migrations';
import { SecretUserRepo } from './repository/secretLogin.repo';
export const initDatabase = async () => {
  const isLoggedIn = await SecretUserRepo.getKeepLoggedIn();
  console.log('🚀 ~ initDatabase ~ isLoggedIn:', isLoggedIn);
  try {
    if (!isLoggedIn) {
      await runMigrations();
    }
    console.log('✅ Database ready');
  } catch (e) {
    console.error('❌ DB init failed', e);
  }
};
