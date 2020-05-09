export function registerExitProcessCallbacks(callbacks: (() => void)[]): void {
	const exitCallback = () => {
		callbacks.forEach(cb => cb());
	};
	process.on('SIGINT', exitCallback);
	process.on('SIGTERM', exitCallback);
}

