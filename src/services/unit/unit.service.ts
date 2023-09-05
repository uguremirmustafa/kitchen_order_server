import db from '@db/db';
import { Unit } from '@models/unit';

export async function getAll(): Promise<Unit[]> {
  const data = await getUnits();
  return data ?? [];
}

export async function getUnits() {
  return db.select('*').from<Unit>('unit');
}
