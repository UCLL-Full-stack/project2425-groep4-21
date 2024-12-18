module.exports = {
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
        '^.+\\.(js|jsx)$': 'babel-jest',
    },
    moduleNameMapper: {
        '^@components/(.*)$': '<rootDir>/components/$1',
        '^@services/(.*)$': '<rootDir>/services/$1',
        '^@types$': '<rootDir>/types/index.ts',
        '^@styles/(.*)$': '<rootDir>/styles/$1',
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};
