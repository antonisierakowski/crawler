// https://jestjs.io/docs/en/configuration.html
module.exports = {
  // automock: false,
  clearMocks: true,
  coveragePathIgnorePatterns: [
    "/node_modules/"
  ],
  // dependencyExtractor: undefined,
  errorOnDeprecated: true,
  testEnvironment: "node",
  testMatch: [
    "**/src/**/*.spec.ts",
  ],
  testPathIgnorePatterns: [
    "/node_modules/"
  ],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
};
