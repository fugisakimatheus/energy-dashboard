const nextJest = require('next/jest.js')

const createJestConfig = nextJest({
  dir: './',
})

/** @type {import('jest').Config} */
const config = {
  testEnvironment: 'jsdom',
  coverageProvider: 'v8',
  coverageDirectory: 'jest-coverage',
  clearMocks: true,
  collectCoverage: true,
  testPathIgnorePatterns: [
    '/e2e-tests/',
    '/node_modules/', 
    '/__mocks__/',
    '/models/',
    '/scripts/',
    '/utils/test.tsx',
  ],
  coveragePathIgnorePatterns: [
    '/e2e-tests/',
    '/node_modules/',
    '/__mocks__/',
    '/models/',
    '/scripts/',
    '/utils/test.tsx',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!<rootDir>/out/**',
    '!<rootDir>/.next/**',
    '!<rootDir>/*.config.js',
    '!<rootDir>/*.config.ts',
    '!<rootDir>/jest-coverage/**',
  ],
};

module.exports = createJestConfig(config)
