import React from 'react';
import { cleanup, render } from '../../utils/test-utils';
import Hero from "./index";

describe('<Hero/> block', () => {
	afterEach(cleanup);

	const {defaultProps} = Hero;

	it('renders the Hero heading', () => {
		const { container } = render(<Hero />);
		expect(container.textContent).toMatch(defaultProps.title);
	});

	it('renders the Hero sub-heading', () => {
		const { container } = render(<Hero />);
		expect(container.textContent).toMatch(defaultProps.subTitle);
	});

	it('renders the Request invite button', () => {
		const { container } = render(<Hero />);
		const button = container.querySelector('button');
		expect(button.textContent).toMatch(defaultProps.ctaText);
	});

	it('calls onCtaClick when clicked the Request invite button', () => {
		const mockOnCtaClick = jest.fn();
		const { getByText } = render(<Hero onCtaClick={mockOnCtaClick}/>);
		getByText(defaultProps.ctaText).click()
		expect(mockOnCtaClick.mock.calls.length).toEqual(1);
	});
});
