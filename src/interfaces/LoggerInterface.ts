export interface LoggerInterface {
	msg(msg: string): void;
	err(msg: string): void;
	warn(msg: string): void;
	getYesOrNo(query: string): boolean;
}
