module.exports = {
    transform: {
      "^.+\\.jsx?$": "babel-jest",
    },
    moduleDirectories: ["node_modules", "src"],
    moduleNameMapper: {
      "\\.(css|less|scss|sass)$": "identity-obj-proxy",
      '^react-router-dom$': '<rootDir>/node_modules/react-router-dom',
    },
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["@testing-library/jest-dom"],
  };
  