export interface LoggerInterface {
	msg(content: string): void;
	getYesOrNo(question: string): Promise<boolean>;
}
