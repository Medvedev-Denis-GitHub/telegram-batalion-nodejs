import fs from 'fs';
import { resolve } from 'path';

export interface QuestionsStorageData {
  questions: string[],
}

export class QuestionsStorageManager {
  private readonly filename = 'questions-storage.json';
  private readonly filePath = resolve(process.cwd(), `data/${this.filename}`);

  constructor() {
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(
        `data/${this.filename}`, JSON.stringify({ questions: [] }), 'utf8');
    }
  }

  save(question: string): void {
    const instance = this.get();

    instance.questions.push(question);
    fs.writeFileSync(this.filePath, JSON.stringify(instance));
  }

  getRandomQuestion(): string {
    const questions = this.get().questions;
    const questionIndex = Math.floor(Math.random() * questions.length);

    return questions[questionIndex];
  }

  private get(): QuestionsStorageData {
    return JSON.parse(fs.readFileSync(this.filePath, 'utf-8'));
  }
}
