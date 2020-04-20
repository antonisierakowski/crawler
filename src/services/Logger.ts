import { LoggerInterface } from '../interfaces/Logger';
import { injectable } from 'inversify';
import readline from 'readline-sync';

@injectable()
export class Logger implements LoggerInterface {
	// private rl: readline.Interface;

	constructor(
		// todo: inject logger repository
	) {
		// this.rl = readline.createInterface({
		// 	input: process.stdin,
		// 	output: process.stdout,
		// });
	}

	msg(msg: string) {
		// this.rl.write(`${content}\n`);
		console.log(msg);
	}

	async getYesOrNo(question: string): Promise<boolean> {
		let response = null;
		while (response !== false && response !== true) {
			const input = await readline.question(question);
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
		// return Promise.resolve(true);
	}
}
