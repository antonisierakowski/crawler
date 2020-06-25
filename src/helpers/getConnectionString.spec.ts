import { getConnectionString } from './getConnectionString';

describe('getConnectionString function', () => {
	process.env = {
		DB_USER: 'tester',
		DB_PASSWORD: 'ilovetests',
		DB_HOST: 'myHost',
		DB_PORT: '1234',
		DB_DATABASE: 'myDb',
	};

	it('should compose valid mongoDb connection string from environment variables', () => {
		expect(getConnectionString()).toBe(
			'mongodb+srv://tester:ilovetests@myHost:1234/myDb',
		);
	});

	it('should use default port if none specified', () => {
		process.env.DB_PORT = undefined;
		expect(getConnectionString()).toBe(
			'mongodb+srv://tester:ilovetests@myHost:27017/myDb',
		);
	});
});
