const {Service} = require('../service');
const service = new Service();

test('adds 1 + 2 to equal 3', () => {
  expect(parseFloat(service.excecute(`1+2`))).toBe(3);
});

test('cos45 * sin45 to equal 0.5', () => {
  expect(parseFloat(service.excecute(`cos45 * sin45`))).toBeCloseTo(0.5,5);
});

test('cos45 * (sin45^-1) to equal 1', () => {
  expect(parseFloat(service.excecute(`cos45 * (sin45^-1)`))).toBeCloseTo(1,5);
});

test('(0 + 5) * (0 - 5) to equal -25', () => {
  expect(parseFloat(service.excecute(`(0 + 5) * (0 - 5)`))).toBeCloseTo(-25,5);
});

