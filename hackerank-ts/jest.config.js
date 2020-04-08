module.exports = {
  roots: ["<rootDir>/src"],
  // Jest transformations -- this adds support for TypeScript
  // using ts-jest
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  // Runs special logic, such as cleaning up components
  // when using React Testing Library and adds special
  // extended assertions to Jest
  setupFilesAfterEnv: [
    "@testing-library/jest-dom/extend-expect"
  ],
  // Test spec file resolution pattern
  // should contain `spec`.
  testRegex: ".*?(\.spec).tsx?$",
   // Module file extensions for importing
   moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"]
}