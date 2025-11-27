// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Suprimir warnings de act() para interações do userEvent
// Esses warnings são esperados em testes que simulam interações de formulário
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      ((args[0].includes('Warning: An update to') &&
        args[0].includes('inside a test was not wrapped in act')) ||
        args[0].includes('Warning: `ReactDOMTestUtils.act` is deprecated'))
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});
