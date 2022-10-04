module.exports = {
  testRegex: '.*\\.test\\.tsx?$',
  transform: {
    '^.+\\.(t|j)sx?$': 'ts-jest',
  },
  setupFilesAfterEnv: ['./setupTests.ts'],
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{js,ts,tsx}',
    '!src/api/**',
    '!coverage/**',
    '!data-scripts/**',
    '!node_modules/**',
    '!**/@enums/**',
    '!**/@interfaces/**',
    '!**/@mocks/**',
    '!**/@types/**',
    '!**/**/index.ts',
    '!**/**.d.ts',
    '!src/client/index.tsx',
    '!src/client/services/**',
    '!scripts/average-work.ts',
    '!jest.config.js',
    '!setupTests.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 85,
      functions: 95,
      statements: 85,
    },
  },
};
