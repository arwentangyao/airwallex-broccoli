import React from 'react';
import styled, {css} from 'styled-components/macro';
import PropTypes from "prop-types";
import Button from "../../components/Button";

const HeroStyled = styled.section`
	display: flex;
	flex-direction: column;
	max-width: 575px;
	padding: 1.6rem;
	text-align: center;
	
	button {
		align-self: center;
	}
`;

const HeroTitle = styled.h1`
	display: block;
	color: ${({theme}) => theme.colors.grey900};
	font-size: ${({theme}) => theme.fontSizes[3]};
	font-weight: ${({theme}) => theme.headingWeight};
	line-height: 1.1;
	white-space: pre-wrap;
	${({theme}) => css`
		${theme.mediaQueries.md} {
			font-size: ${theme.fontSizes[5]};
		}
	`}
`;

const HeroSubTitle = styled.div`
	display: block;
	color: ${({theme}) => theme.colors.grey700};
	font-size: ${({theme}) => theme.fontSizes[1]};
	font-weight: ${({theme}) => theme.fontWeights.medium};
	line-height: 1.31;
	margin: 2.4rem 0;
	white-space: pre-wrap;
	${({theme}) => css`
		${theme.mediaQueries.md} {
			font-size: ${theme.fontSizes[2]};
			margin: 3.2rem 0;
		}
	`}
`;

const Hero = ({title, subTitle, ctaText, onCtaClick, ...props}) => {
	return (
		<HeroStyled {...props}>
			<HeroTitle>{title}</HeroTitle>
			<HeroSubTitle>{subTitle}</HeroSubTitle>
			<Button
				size={"large"}
				onClick={onCtaClick}
			>
				{ctaText}
			</Button>
		</HeroStyled>
	)
};

Hero.propTypes = {
	title: PropTypes.string,
	subTitle: PropTypes.string,
	ctaText: PropTypes.string,
	onCtaClick: PropTypes.func
};

Hero.defaultProps = {
	title: 'A better way\n to enjoy every day.',
	subTitle: 'Be the first to know when we launch.',
	ctaText: 'Request an invite',
};

export default Hero;
