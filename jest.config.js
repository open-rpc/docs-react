module.exports = {
  "clearMocks": true,
  "coverageDirectory": "../coverage",
  "resetMocks": true,
  "restoreMocks": true,
  "rootDir": "./src",
  "testEnvironment": "jsdom",
  "testPathIgnorePatterns": ["./build"],
  "preset": "ts-jest",
  "transformIgnorePatterns": ['^.+\\.js$'],
  "moduleNameMapper": {
    "\\.(css|less|sass|scss)$": "jest-transform-css",
  },
};
