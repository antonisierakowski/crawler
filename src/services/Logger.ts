import { injectable } from 'inversify';
import readlineSync from 'readline-sync';

enum MessageType {
	MSG = 'Msg',
	ERR = 'Err',
	WARN = 'Warn',
	PROMPT = 'Prompt',
}

@injectable()
export class Logger {

	constructor(
		// todo: inject logger repository
	) { }

	private static getBaseString(msgType: MessageType): string {
		const now = new Date().toLocaleString();
		return `[${now}] [${msgType}]`;
	}

	static msg(msg: string): void {
		const templatedMsg = `${this.getBaseString(MessageType.MSG)}: ${msg}`;
		console.log(templatedMsg);
	}

	static warn(msg: string): void {
		const templatedMsg = `${this.getBaseString(MessageType.WARN)}: ${msg}`;
		console.warn(templatedMsg);
	}

	static err(error: string | Error): void {
		const templatedMsg = `${this.getBaseString(MessageType.ERR)}: ${error}`;
		console.error(templatedMsg);
	}

	static execLog(className: string, methodName: string, execTime: string) {
		console.log(
			`[${className}] -> [${methodName}] took ${execTime}ms.`,
		);
	}

	static getYesOrNo(question: string): boolean {
		let response = null;
		while (response !== false && response !== true) {
			const input = readlineSync.keyIn(
				`${this.getBaseString(MessageType.PROMPT)}: ${question} Y/N `,
			);
			switch (input.toLowerCase()) {
				case 'y': {
					response = true;
					break;
				}
				case 'n': {
					response = false;
					break;
				}
				default: {
					this.msg('Please input Y or N.');
					break;
				}
			}
		}
		return response;
	}
}
