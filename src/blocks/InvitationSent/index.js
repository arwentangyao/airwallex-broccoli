import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import Button from "../../components/Button";

const InvitationSentStyled = styled.div`
	padding: 3rem 2.4rem;
	width: 100%;
	max-width: 375px;
`;

const Title = styled.h2`
	display: block;
	color: ${({theme}) => theme.colors.grey900};
	font-size: ${({theme}) => theme.fontSizes[2]};
	font-weight: ${({theme}) => theme.fontWeights.bold};
	line-height: 1.31;
	margin-bottom: 3.6rem;
	position: relative;
	
	&::after {
	background-color: ${({theme}) => theme.colors.grey400};
		bottom: -12px;
		content: ' ';
		height: 2px;
		left: calc(50% - 25px);
		position: absolute;
		width: 50px;
	}
`;

const MessageText = styled.div`
	color: ${({theme}) => theme.colors.grey600};
	display: block;
	font-size: ${({theme}) => theme.fontSizes[1]};
	font-weight: ${({theme}) => theme.fontWeights.semiBold};
	line-height: 1.3;
	margin-top: 2.4rem;
	margin-bottom: 4rem;
	text-align: center;
`;

const InvitationSent = ({
		title, onCtaClick,
		messageText, ctaText, ...props
	}) => {

	return (
		<InvitationSentStyled {...props}>
			<Title>{title}</Title>
			<MessageText>{messageText}</MessageText>
			<Button
				expanded={true}
				onClick={onCtaClick}
			>
				{ctaText}
			</Button>

		</InvitationSentStyled>
	)
};

InvitationSent.propTypes = {
	title: PropTypes.string,
	ctaText: PropTypes.string,
	messageText: PropTypes.string,
	onCtaClick: PropTypes.func,
};

InvitationSent.defaultProps = {
	title: 'All done!',
	ctaText: 'OK',
	messageText: 'You will be one of the first to experience Broccoli & Co. when we launch.',
};

export default InvitationSent;
