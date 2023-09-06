import db from '@db/db';
import { Brand } from '@models/brand';

export async function getAll(): Promise<Brand[]> {
  const brands = await getBrandNames();
  return brands ?? [];
}

export async function getBrandNames(): Promise<Brand[]> {
  return db.select({ id: 'id', name: 'name' }).from<Brand>('brand');
}

export async function getBrandsWithLogo(): Promise<Brand[]> {
  return db.select({ id: 'id', name: 'name', logo: 'logo' }).from<Brand>('brand');
}

export async function createOne(brand: Partial<Omit<Brand, 'id'>>): Promise<Brand | null> {
  try {
    const res = await db
      .insert({ logo: brand.logo, name: brand.name })
      .into('brand')
      .returning('*');

    if (res.length && res.length === 1) {
      return res[0];
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function updateOne(
  data: Partial<Omit<Brand, 'id'>>,
  id: Brand['id']
): Promise<Brand | null> {
  try {
    const res = await db.update(data).into<Brand>('brand').where({ id }).returning('*');

    if (res.length && res.length === 1) {
      return res[0];
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function deleteOne(id: Brand['id']): Promise<boolean> {
  try {
    const hasRelatedIngredients = await db('ingredient').where({ brand_id: id }).first();

    if (hasRelatedIngredients) {
      throw new Error('Cannot delete brand with connected ingredients.');
    }

    const res = await db('brand').delete().where({ id });

    if (res === 1) {
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}
