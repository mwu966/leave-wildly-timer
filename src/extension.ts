// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "leave-wildly-timer" is now active!');

	let statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right);
	statusBar.tooltip = "tool tip";
	statusBar.show();
	context.subscriptions.push(statusBar);

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('leave-wildly-timer.time', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from leave-wildly-timer!');
	});

	context.subscriptions.push(disposable);

	let timerFlag: Boolean = true;
	setInterval(() => {
		let date2 = new Date();
		statusBar.text = date2.getHours() + ":" + date2.getMinutes() + " " + date2.getSeconds();
		if (date2.getHours() === 15 && date2.getMinutes() === 45 && timerFlag) {
			vscode.commands.executeCommand('leave-wildly-timer.time');
			timerFlag = false;
		}
	}, 1000);


}


// this method is called when your extension is deactivated
export function deactivate() { }
