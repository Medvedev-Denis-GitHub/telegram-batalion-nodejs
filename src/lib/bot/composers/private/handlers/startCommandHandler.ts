import { PrivateContext, UserFlow } from '../../../types';
import { QuestionStorage } from '../../../../../app';

export async function startCommandHandler(ctx: PrivateContext) {
  ctx.session.completedQuestions = 0;
  ctx.session.flow = UserFlow.NONE;

  return ctx.reply(QuestionStorage.getRandomQuestion());
}
