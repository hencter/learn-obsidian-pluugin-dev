import { addIcon, Editor, MarkdownView, Menu, Notice, Platform, Plugin, setIcon } from "obsidian"
import { HelloModal } from "./example/modals/hello"
import { AcceptUserInputModal } from "example/modals/accept-user-input"
import { SelectFromListOfSuggestions } from "example/modals/SelectFromListOfSuggestions"

export default class ExamplePlugin extends Plugin {

	async onload() {
		// 配置插件所需的资源。
		console.log('载入插件')

		// 移动端判定
		if (Platform.isMobile) {
			console.log('现在为：移动端')
		} else {
			console.log('现在为：桌面端')
		}

		// 命令
		this.addCommand({
			id: 'example-command',
			name: 'Example commands',
			callback: () => {
				console.log('Hello world!')
			}
		})

		// 条件命令
		this.addCommand({
			id: 'example-conditional-commands',
			name: 'Exameple Conditional commands',
			// highlight-next-line
			checkCallback: (checking: boolean) => {
				const value = this.getRequiredValue();

				if (value) {
					if (!checking) {
						this.doCommand(value);
					}
					return true
				}

				return false;
			},
		})


		// 编辑器命令
		this.addCommand({
			id: 'editor-command',
			name: 'Editor commands',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const sel = editor.getSelection

				console.log(`You have selected: ${sel}`);
			},
		})

		// 快捷键
		this.addCommand({
			id: 'example-hotkey',
			name: 'Example hotkey',
			hotkeys: [{ modifiers: ['Mod', 'Shift'], key: 'A' }],
			callback: () => {
				console.log("Hello HotKey!")
			}
		})

		// 上下文菜单
		this.addRibbonIcon("dice-1", "打开菜单", (event) => {
			const menu = new Menu();

			menu.addItem((item) => {
				item
					.setTitle("复制")
					.setIcon("copy")
					.onClick(() => {
						new Notice("复制成功")
					})
			})

			menu.addItem((item) =>
				item
					.setTitle("粘贴")
					.setIcon("paste")
					.onClick(() => {
						new Notice("粘贴成功");
					})
			);

			// 下面函数用于打开使用鼠标单击功能区域按钮后的菜单
			menu.showAtMouseEvent(event);
		})

		// 文件右键菜单
		this.registerEvent(
			this.app.workspace.on('file-menu', (menu, file) => {
				menu.addItem((item) => {
					item.setTitle('打印文件路径')
						.setIcon('document')
						.onClick(() => {
							new Notice(file.path)
						})
				})
			}
			)
		)


		// 模态弹窗
		this.addCommand({
			id: 'hello-modal',
			name: 'Hello Modal',
			callback: () => {
				new HelloModal(this.app).open()
			}
		})


		// 图标
		const item = this.addStatusBarItem()
		setIcon(item, "info")

		addIcon("circle", `<circle cx="50" cy="50" r="50" fill="currentColor" />`);
		this.addRibbonIcon("circle", "Click me", () => {
			console.log("Hello, you!");
		});

		// 可接受用户输入的模态弹窗
		this.addCommand({
		    id: 'input-modal',
		    name: 'Accept User Input Modal',
			callback: () => {
				new AcceptUserInputModal(this.app, (result) => {{
					new Notice(`Hello, ${result}`)
				}}).open()
			}
		})

		// 建议列表的选择
		this.addCommand({
			id: 'suggest-modal',
			name: 'Select from list of suggestions',
			callback: () => {
				new SelectFromListOfSuggestions(this.app).open()
			}
		})

	};

	async onunload() {
		// 释放插件所需要的资源
		console.log('卸载插件')
	};

	getRequiredValue() {
		return true
	};

	doCommand(value: boolean) {
		return !value
	};
}

