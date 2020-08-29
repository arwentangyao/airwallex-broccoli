import React from 'react';
import styled from 'styled-components/macro';
import Container from "../../components/Container";

const FooterStyled = styled.footer`
	align-items: center;
	background-color: ${({theme}) => theme.colors.grey50};
	border-top: 2px solid ${({theme}) => theme.colors.grey200};
	display: flex;
	padding: 1.6rem 0;
`;

const FooterText = styled.div`
	display: block;
	color: ${({theme}) => theme.colors.grey800};
	font-size: ${({theme}) => theme.fontSizes[0]};
	font-weight: ${({theme}) => theme.fontWeights.medium};
	line-height: 1.3;
	text-align: center;
`;

const Footer = (props) => {
	const copyRightYear = new Date().getFullYear();
	return (
		<FooterStyled {...props}>
			<Container>
				<FooterText>
					Made with
					<span role="img" aria-label="love"> ❤ ️</span>
					in Melbourne.
					<br />
					© {copyRightYear} Broccoli &amp; Co. All rights reserved.
				</FooterText>
			</Container>
		</FooterStyled>
	)
};

Footer.displayName = "Footer";

export default Footer;
