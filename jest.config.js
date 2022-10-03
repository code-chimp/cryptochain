module.exports = {
  testRegex: '.*\\.test\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{js,ts}',
    '!coverage/**',
    '!data-scripts/**',
    '!node_modules/**',
    '!@enums/**',
    '!@interfaces/**',
    '!@types/**',
    '!**/**/index.ts',
    '!**/**.d.ts',
    '!scripts/average-work.ts',
    '!pub-sub.ts',
    '!jest.config.js',
  ],
  coverageThreshold: {
    global: {
      branches: 85,
      functions: 95,
      statements: 85,
    },
  },
};
