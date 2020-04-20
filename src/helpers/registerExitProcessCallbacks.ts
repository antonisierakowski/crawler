export function registerExitProcessCallbacks(callback: () => void): void {
	process.on('exit', callback);

	process.on('uncaughtException', (e) => {
		console.log('Uncaught Exception...');
		console.log(e.stack);
		process.exit(99);
	});
}

