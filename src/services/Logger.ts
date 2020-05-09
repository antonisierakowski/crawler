import { LoggerInterface } from '../interfaces/LoggerInterface';
import { injectable } from 'inversify';
import * as rl from 'readline';

@injectable()
export class Logger implements LoggerInterface {
	readline: rl.Interface;
	err = this.msg;
	warn = this.msg;

	constructor(
		// todo: inject logger repository
	) {
		this.readline = rl.createInterface({
			input: process.stdin,
			output: process.stdout,
		});
	}

	msg(msg: string) {
		console.log(msg);
	}

	async getYesOrNo(question: string): Promise<boolean> {
		let response = null;

		while (response !== false && response !== true) {
			const input = await this.query(`${question}  Y/N: `);
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

	private async query(msg: string): Promise<string> {
		return new Promise(resolve => this.readline.question(msg, (answer) => {
			this.readline.close();
			resolve(answer);
		}));
	}
}
