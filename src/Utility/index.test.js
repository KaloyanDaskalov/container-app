import {
	emailValidation,
	checkLength,
	actionType,
} from './index';


describe('Check helper functions', () => {
	test('email validation', () => {
		expect(emailValidation('test@test.com')).toBe(true);
	});
	test('check length', () => {
		expect(checkLength(6, 15, 'length'.length)).toBe(true);
	});
	test('actions type', () => {
		expect(actionType('go forward')).toBe('GO_FORWARD');
	});
});