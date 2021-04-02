module.exports = {
  clearMocks: true,
  collectCoverageFrom: [
    'src/**/*',
  ],
  coverageDirectory: "coverage",
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    }
  },
  moduleFileExtensions: [
    "js",
    "ts",
  ],
  testEnvironment: "node",
  testMatch: [
    "**/*.test.ts",
  ],
  transform: {
    '\\.ts$': 'ts-jest',
  },
};
