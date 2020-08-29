import React from 'react';
import { cleanup, render } from '../../utils/test-utils';
import InvitationForm from "./index";

describe('<InvitationForm/> block', () => {
	afterEach(cleanup);

	const {defaultProps} = InvitationForm;

	it('renders the title', () => {
		const { container } = render(<InvitationForm />);
		expect(container.textContent).toMatch(defaultProps.formTitle);
	});

	it('renders input fields', () => {
		const { container } = render(<InvitationForm />);
		const inputs = container.querySelectorAll('input');
		expect(inputs).toHaveLength(3);
		expect(inputs[0].placeholder).toEqual('Full name');
		expect(inputs[1].placeholder).toEqual('Email');
		expect(inputs[2].placeholder).toEqual('Confirm email');
	});

	it('renders the submit button', () => {
		const { container } = render(<InvitationForm />);
		const button = container.querySelector('button');
		expect(button.textContent).toMatch(defaultProps.ctaText);
	});
});
