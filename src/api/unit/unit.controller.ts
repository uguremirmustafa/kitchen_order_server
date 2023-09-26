import { NextFunction, Request, Response } from 'express';
import { Unit } from '@/lib/types';
import { getUnits } from './unit.service';

export async function getAll(req: Request, res: Response<Unit[]>, next: NextFunction) {
  try {
    const units = await getUnits();
    res.json(units);
  } catch (error) {
    next(error);
  }
}
