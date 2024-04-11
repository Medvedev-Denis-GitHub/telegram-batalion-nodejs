import { Bot, Composer } from 'grammy';
import { PrivateContext } from './types';
import { privateComposer } from './composers/private';

export async function buildBot(token: string) {
  const bot = new Bot<PrivateContext>(token);

  bot.chatType('private').use(privateComposer as unknown as Composer<PrivateContext>);

  await bot.api.setMyCommands([{ command: 'start', description: 'Начать диалог 💬' }]);

  bot.catch(e => {
    console.error(e);
  });

  return bot;
}