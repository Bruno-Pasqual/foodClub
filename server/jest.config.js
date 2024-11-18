/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
  coveragedirectory: "coverage",
  coverageReporters: ['text', 'html', 'lcov', 'json'],
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.{d.ts}'],
  coveragethrsehold: { //Minimum coverage required to pass
    global: {
      branches: 80,
      functions: 75,
      lines: 87,
      statements: 81
    }
  }
};