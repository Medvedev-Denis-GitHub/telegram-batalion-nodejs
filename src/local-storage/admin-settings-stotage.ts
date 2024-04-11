import fs from 'fs';
import { resolve } from 'path';

export interface SettingStorageData {
  chatLink: string,
}

export class SettingsStorageManager {
  private readonly filename = 'settings-storage.json';
  private readonly filePath = resolve(process.cwd(), `data/${this.filename}`);

  constructor() {
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(
        `data/${this.filename}`, JSON.stringify({}), 'utf8');
    }
  }

  saveChatLink(chatLink: string): void {
    const instance = this.get();

    instance.chatLink = chatLink;
    fs.writeFileSync(this.filePath, JSON.stringify(instance));
  }

  getChatLink(): string | undefined {
    return this.get().chatLink;
  }

  private get(): SettingStorageData {
    return JSON.parse(fs.readFileSync(this.filePath, 'utf-8'));
  }
}
