import { compilerOptions } from "./tsconfig.json"
import { pathsToModuleNameMapper } from 'ts-jest';

export default {
  maxWorkers: 3,
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: 'src',
  moduleFileExtensions: ['js', 'json', 'ts'],
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
  testRegex: '.*\\.spec\\.ts$',
  collectCoverageFrom: [
    "**/*.(t|j)s"
  ],
  coverageDirectory: "../coverage",
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/dist/",
    "/cdk/"
  ],
  // Reportes de cobertura en múltiples formatos
  coverageReporters: [
    'text',           // Muestra en consola
    'text-summary',   // Resumen en consola
    'lcov',           // Para herramientas como SonarQube
    'cobertura',      // Para Azure DevOps (coverage)
    'html',           // Reporte HTML local
    'json'            // JSON para procesamiento adicional
  ],
  // Reportes de resultados de tests
  reporters: [
    'default',        // Reporter estándar de Jest
    ['jest-junit', {
      outputDirectory: './coverage',
      outputName: 'junit.xml',
      ancestorSeparator: ' › ',
      uniqueOutputName: false,
      suiteNameTemplate: '{filepath}',
      classNameTemplate: '{classname}',
      titleTemplate: '{title}',
      addFileAttribute: true
    }]
  ]
}