module.exports = {
  "clearMocks": true,
  "coverageDirectory": "../coverage",
  "resetMocks": true,
  "restoreMocks": true,
  "rootDir": "./src",
  "testEnvironment": "jsdom",
  "testPathIgnorePatterns": ["./build"],
  "preset": "ts-jest",
  "moduleNameMapper": {
    "\\.(css|less|sass|scss)$": "jest-transform-css"
  }
}
