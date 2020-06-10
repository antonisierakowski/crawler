import { Logger } from '../services/Logger';

export function logExecution(): MethodDecorator {
	return function(
		target: Object,
		propertyKey: string,
		descriptor: PropertyDescriptor,
	) {
		const originalMethod = descriptor.value;
		descriptor.value = async function(...args: any[]) {
			const start = Date.now();
			const result = await originalMethod.apply(this, args);
			const executionTime = (Date.now() - start).toString();
			Logger.execLog(
				target.constructor.name,
				propertyKey,
				executionTime,
			);
			return result;
		};
		return descriptor;
	};

}


