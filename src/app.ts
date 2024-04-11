import { ADMIN_USERNAME, ADMINS_IDS, BOT_TOKEN } from './lib/bot/constants';
import { buildBot } from './lib/bot';
import { QuestionsStorageManager } from './local-storage/questions-stotage';
import { AnswersStorageManager } from './local-storage/answers-storage';
import { SettingsStorageManager } from './local-storage/admin-settings-stotage';

export const QuestionStorage = new QuestionsStorageManager();
export const AnswersStorage = new AnswersStorageManager();
export const SettingsStorage = new SettingsStorageManager();

async function main() {
  if (!BOT_TOKEN) {
    throw new Error('BOT_TOKEN is not declared');
  }
  if (!ADMINS_IDS) {
    throw new Error('ADMINS_IDS is not declared');
  }
  if (!ADMIN_USERNAME) {
    throw new Error('ADMIN_USERNAME is not declared');
  }

  const bot = await buildBot(BOT_TOKEN);

  return bot.start({
    onStart: botInfo => console.log(`Bot started under @${botInfo.username}`),
  });
}

main();