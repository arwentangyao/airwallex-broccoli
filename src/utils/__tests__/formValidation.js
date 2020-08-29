import {validate} from "../formValidation";

describe('form validation utility', () => {

	it('should validate full name', () => {
		const resultNoValue = validate({fullName: ''});
		const resultWithIncorrectValue = validate({fullName: 'John'});
		const resultWithCorrectValue = validate({fullName: 'John doe'});
		expect(resultNoValue.fullName).toBe('Full name is required');
		expect(resultWithIncorrectValue.fullName).toBe('Full name is invalid');
		expect(resultWithCorrectValue.fullName).toBe(undefined);
	});

	it('should validate email', () => {
		const resultNoValue = validate({email: ''});
		const resultWithIncorrectValue = validate({email: 'John@d.c'});
		const resultWithCorrectValue = validate({email: 'Johndoe@email.com'});
		expect(resultNoValue.email).toBe('Email address is required');
		expect(resultWithIncorrectValue.email).toBe('Email address is invalid');
		expect(resultWithCorrectValue.email).toBe(undefined);
	});

	it('should validate email', () => {
		const resultNoValue = validate({confirmEmail: ''});
		const resultWithIncorrectValue = validate({email: 'Johndoe@email.com', confirmEmail: 'John@d.c'});
		const resultWithCorrectValue = validate({email: 'Johndoe@email.com', confirmEmail: 'Johndoe@email.com'});
		expect(resultNoValue.confirmEmail).toBe('Confirmation email is required');
		expect(resultWithIncorrectValue.confirmEmail).toBe('Email doesn\'t match');
		expect(resultWithCorrectValue.confirmEmail).toBe(undefined);
	});
});
