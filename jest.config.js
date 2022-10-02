module.exports = {
  testRegex: '.*\\.test\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{js,ts}',
    '!**/coverage/**',
    '!**/node_modules/**',
    '!**/@enums/**',
    '!**/@interfaces/**',
    '!**/@types/**',
    '!**/**/index.ts',
    '!jest.config.js',
    '!**/**.d.ts',
    '!average-work.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 85,
      functions: 95,
      statements: 85,
    },
  },
};
