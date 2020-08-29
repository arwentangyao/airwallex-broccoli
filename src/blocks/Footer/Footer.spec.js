import React from 'react';
import { cleanup, render } from '../../utils/test-utils';
import Footer from "./index";

describe('<Footer/> block', () => {
	const copyRightYear = new Date().getFullYear().toString();
	const footerContent = `Made with ❤ ️in Melbourne.© ${copyRightYear} Broccoli & Co. All rights reserved.`;
	afterEach(cleanup);

	it('renders a \'footer\' HTML element', () => {
		const { container } = render(<Footer />);
		expect(container.querySelectorAll('footer')).toHaveLength(1);
	});

	it('renders current year for copyright text correctly', () => {
		const { container } = render(<Footer />);
		expect(container.textContent).toMatch(copyRightYear)
	});

	it('renders footer content', () => {
		const { container } = render(<Footer />);
		expect(container.textContent).toMatch(footerContent)
	});
});
