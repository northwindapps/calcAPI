const {Service} = require('../service');
const service = new Service();

test('adds 1 + 2 to equal 3', () => {
  expect(parseFloat(service.excecute(`1+2`))).toBe(3);
});

test('adds cos45 * sin45 to equal 0.5', () => {
  expect(parseFloat(service.excecute(`cos45 * sin45`))).toBeCloseTo(0.5,5);
});