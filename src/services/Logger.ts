import { LoggerInterface } from '../interfaces/LoggerInterface';
import { injectable } from 'inversify';
import readlineSync from 'readline-sync';

@injectable()
export class Logger implements LoggerInterface {
	err = this.msg;
	warn = this.msg;

	constructor(
		// todo: inject logger repository
	) { }

	msg(msg: string) {
		console.log(msg);
	}

	getYesOrNo(question: string): boolean {
		let response = null;
		while (response !== false && response !== true) {
			const input = readlineSync.keyIn(`${question} Y/N`);
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
