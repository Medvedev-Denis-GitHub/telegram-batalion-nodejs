import { PrivateContext } from '../../../types';
import { NextFunction } from 'grammy';
import { ADMINS_IDS } from '../../../constants';

export async function isAdminMw(ctx: PrivateContext, next: NextFunction) {
  const { id } = ctx.from;

  if (ADMINS_IDS!.split(',').includes(`${id}`)) {
    return next();
  }

  return;
}