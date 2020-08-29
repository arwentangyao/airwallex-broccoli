import React from 'react';
import { cleanup, render } from '../../utils/test-utils';
import InvitationSent from "./index";

describe('<InvitationSent/> block', () => {
	afterEach(cleanup);

	const {defaultProps} = InvitationSent;

	it('renders the title', () => {
		const { container } = render(<InvitationSent />);
		expect(container.textContent).toMatch(defaultProps.title);
	});

	it('renders the success message', () => {
		const { container } = render(<InvitationSent />);
		expect(container.textContent).toMatch(defaultProps.messageText);
	});

	it('renders the cta button', () => {
		const { container } = render(<InvitationSent />);
		expect(container.textContent).toMatch(defaultProps.title);
	});

	it('calls onCtaClick when button is clicked', () => {
		const mockHandleClick = jest.fn();
		const { getByText } = render(<InvitationSent onCtaClick={mockHandleClick}/>);
		getByText(defaultProps.ctaText).click();
		expect(mockHandleClick.mock.calls.length).toEqual(1);
	});

});
