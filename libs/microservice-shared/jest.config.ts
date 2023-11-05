/* eslint-disable */
export default {
    displayName: 'microservice-shared',
    preset: '../../jest.preset.js',
    testEnvironment: 'node',
    transform: {
        '^.+\\.[tj]s$': [
            'ts-jest',
            { tsconfig: '<rootDir>/tsconfig.spec.json' },
        ],
    },
    moduleFileExtensions: ['ts', 'js', 'html'],
    coverageDirectory: '../../coverage/libs/microservice-shared',
    setupFiles: ['./.jest/setEnvVars.ts'],
};
