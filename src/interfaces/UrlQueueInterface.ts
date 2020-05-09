export interface UrlQueueInterface {
	add(url: string): void;
	size: number;
	remove(url: string): void;
	collectAndSave(): Promise<boolean>;
	current: string;
	preload(initial: string): Promise<void>
}
