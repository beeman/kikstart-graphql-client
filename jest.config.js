"use strict";

module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.ts", "src/**/*.js"],
  testPathIgnorePatterns: [
    "src/server/*.ts", "src/server/*.js"
  ],
  coverageThreshold: {
    global: {
      branches: 20,
      functions: 50,
      lines: 80,
      statements: 80,
    },
  },
  testEnvironment: "node",
  preset: "ts-jest",
};
