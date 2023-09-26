import db from '@/db/db';
import { Unit } from '@/lib/types';

export async function getUnits() {
  return db.select('*').from<Unit>('unit');
}
