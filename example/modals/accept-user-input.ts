import { App, Modal, Setting } from "obsidian";

export class AcceptUserInputModal extends Modal {
  userName: string;
  onSubmit: (result: string) => void;

  constructor(app: App, onSubmit: (result: string) => void) {
    super(app);
    this.onSubmit = onSubmit;
  }

  onOpen() {
    let { contentEl } = this;
    contentEl.setText("AcceptUserInputModal");
    contentEl.createEl("h1", { text: "您的姓名是？" })

    new Setting(contentEl)
      .setName("Name")
      .addText((text) =>
        text.onChange((value) => {
          this.userName = value
        }));

    new Setting(contentEl)
      .addButton((btn) =>
        btn
          .setButtonText("Submit")
          .setCta()
          .onClick(() => {
            this.close();
            this.onSubmit(this.userName);
          }));
  }

  onClose() {
    let { contentEl } = this;
    contentEl.empty();
  }
}