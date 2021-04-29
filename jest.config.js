module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  moduleNameMapper: {
    '^.+\\.(sass|scss)$': 'jest-css-modules'
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json']
};
