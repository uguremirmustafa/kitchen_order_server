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

export async function createBrand(brand: Partial<Omit<Brand, 'id'>>): Promise<Brand | null> {
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
