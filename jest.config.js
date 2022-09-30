module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{js,ts}',
    '!**/coverage/**',
    '!**/node_modules/**',
    '!jest.config.js',
  ],
};
