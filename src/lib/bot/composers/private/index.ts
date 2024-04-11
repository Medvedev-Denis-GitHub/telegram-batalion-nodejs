import { Composer, session } from 'grammy';
import { UserFlow, PrivateContext, PrivateSessionData } from '../../types';
import { startCommandHandler } from './handlers/startCommandHandler';
import { isAdminMw } from './middlewares/isAdminMw';
import { AdminMenu } from './admin/adminMenu';
import { flowRouter } from './admin';

export const privateComposer = new Composer<PrivateContext>();

privateComposer.use(
  session({
    initial: (): PrivateSessionData => ({
      completedQuestions: 0,
      flow: UserFlow.NONE,
    })
  }),
);
privateComposer.use(AdminMenu);

privateComposer.command('start', startCommandHandler);
privateComposer.command('admin', isAdminMw, ctx => {
  return ctx.reply('⚙️ Настройки бота:', {  reply_markup: AdminMenu });
});

privateComposer.use(flowRouter);
