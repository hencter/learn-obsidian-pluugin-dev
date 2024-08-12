import { App, Modal } from "obsidian";

export class HelloModal extends Modal {
    constructor(app: App) {
        super(app);
    }

    onOpen() {
        let { contentEl } = this;

        contentEl.setText("Look at me, I'm a modal! 👀");

        const book = this.contentEl.createEl("div", { cls: "book" });
        book.createEl("div", { text: "How to Take Smart Notes", cls: "book__title" });
        book.createEl("small", { text: "Sönke Ahrens", cls: "book__author" });
    }

    onClose() {
        let { contentEl } = this;
        contentEl.empty();
    }
}