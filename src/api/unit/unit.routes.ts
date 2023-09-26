import express from 'express';
import * as UnitController from './unit.controller';
import isAuth from '../auth/isAuth.middleware';

const router = express.Router();

router.get('/', isAuth, UnitController.getAll);

export default router;
