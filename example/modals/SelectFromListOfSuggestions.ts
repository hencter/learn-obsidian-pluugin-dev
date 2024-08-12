import { App, Notice, SuggestModal } from "obsidian";


interface Book {
    title: string;
    author: string;
}

const ALL_BOOKS = [
    {
        title: "How to Take Smart Notes",
        author: "Sönke Ahrens",
    },
    {
        title: "Thinking, Fast and Slow",
        author: "Daniel Kahneman",
    },
    {
        title: "Deep Work",
        author: "Cal Newport",
    },
]

export class SelectFromListOfSuggestions extends SuggestModal<Book> {
    // Returns all available suggestions.
    getSuggestions(query: string): Book[] | Promise<Book[]> {
        return ALL_BOOKS.filter((book) => {
            book.title.toLowerCase().includes(query.toLowerCase())
        })
    }

    // Renders each suggestion item.
    renderSuggestion(book: Book, el: HTMLElement) {
        el.createEl("div", { text: book.title });
        el.createEl("small", { text: book.author });
    }

    // Perform action on the selected suggestion.
    onChooseSuggestion(book: Book, evt: MouseEvent | KeyboardEvent) {
        new Notice(`Selected ${book.title}`);
    }
}