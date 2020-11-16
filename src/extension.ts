// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
const player = require('node-wav-player');


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	let musicPath: string;
	let time: Date;
	let timerFlag: boolean = false;

	console.log('Congratulations, your extension "leave-wildly-timer" is now active!');

	let statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right);
	statusBar.tooltip = "tool tip";
	statusBar.show();
	context.subscriptions.push(statusBar);

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('leave-wildly-timer.set', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInputBox({
			prompt: `Set music file path`,
			password: true
		})
			.then(value => {
				if (value !== null && value !== undefined) {
					musicPath = value;
					vscode.window.showInputBox({
						prompt: `Set Time (Example: 19:00)`
					})
						.then(value => {
							if (value !== null && value !== undefined) {
								const inputTime: string[] = value.split(":");

								time = new Date();
								time.setHours(parseInt(inputTime[0]));
								time.setMinutes(parseInt(inputTime[1]));
								time.setSeconds(0);
								timerFlag = false;
							}
						});
				}
			});


	});
	context.subscriptions.push(disposable);

	const command = `leave-wildly-timer.enabled`;
	context.subscriptions.push(vscode.commands.registerCommand(command, () => {
		timerFlag = true;
	}));

	context.subscriptions.push(vscode.commands.registerCommand('leave-wildly-timer.notify', () => {
		vscode.window.showInformationMessage('Timer notify');
	}));


	setInterval(() => {
		let date2 = new Date();
		statusBar.text = date2.getHours() + ":" + date2.getMinutes() + " " + date2.getSeconds() + timerFlag;
		if (date2.getHours() === time.getHours() && date2.getMinutes() === time.getMinutes() && timerFlag) {
			vscode.commands.executeCommand('leave-wildly-timer.notify');
			playSound(musicPath);
			timerFlag = false;
		}
	}, 1000);

}

function playSound(path: string) {
	player.play({
		path
	}).then(() => {
		console.log('The wav file started to be played successfully.');
	}).catch((error: any) => {
		console.error(error);
	});
}


// this method is called when your extension is deactivated
export function deactivate() { }
