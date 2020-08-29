import React from 'react';
import PropTypes from 'prop-types';
import styled, {css} from 'styled-components/macro';
import Input from "../../components/Input";
import {validate, useForm} from '../../utils';
import Button from "../../components/Button";

const InvitationFormStyled = styled.form`
	display: block;
	padding: 3.2rem 2.4rem;
	width: 300px;
	${({theme}) => css`
		${theme.mediaQueries.md} {
			width: 375px;
		}
	`};
`;
const ErrorContainer = styled.div`
	margin-top: 2rem;
`;

const FormTitle = styled.h2`
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

const ErrorMessage = styled.div`
	color: ${({theme}) => theme.colors.error};
	font-size: ${({theme}) => theme.fontSizes[0]};
	font-weight: ${({theme}) => theme.fontWeights.medium};
	padding: 0.6rem;
	text-align: center;
`;

const InvitationForm = ({
		formTitle, onSuccess, ctaText,
		ctaTextSending, ...props
	}) => {
	const {
		values,
		errors,
		handleChange,
		handleSubmit,
		isSubmitting
	} = useForm(validate, onSuccess);
	const errorKeys = Object.keys(errors);
	return (
		<InvitationFormStyled
			onSubmit={handleSubmit}
			{...props}
		>
			<FormTitle>{formTitle}</FormTitle>
			<div>
				<Input
					id="fullName"
					name="fullName"
					aria-label="Enter full name"
					placeholder="Full name"
					value={values.fullName}
					onChange={handleChange}
					error={!!errors.fullName}
				/>
				<Input
					id="email"
					name="email"
					aria-label="Enter email address"
					placeholder="Email"
					value={values.email}
					onChange={handleChange}
					error={!!errors.email}
				/>
				<Input
					id="confirmEmail"
					name="confirmEmail"
					aria-label="Confirm email address"
					placeholder="Confirm email"
					value={values.confirmEmail}
					onChange={handleChange}
					error={!!errors.confirmEmail}
				/>
				<Button
					type="submit"
					expanded={true}
					disabled={!!isSubmitting}
				>
					{isSubmitting ? ctaTextSending : ctaText}
				</Button>
				{(errorKeys.length > 0) && <ErrorContainer>
					{errorKeys.map((err, idx) => (
						<ErrorMessage key={idx}>
							{errors[err]}
						</ErrorMessage>
					))}
				</ErrorContainer>}
			</div>
		</InvitationFormStyled>
	)
};

InvitationForm.propTypes = {
	formTitle: PropTypes.string,
	ctaText: PropTypes.string,
	ctaTextSending: PropTypes.string,
	onSuccess: PropTypes.func,
};

InvitationForm.defaultProps = {
	formTitle: 'Request an invite',
	ctaText: 'Send',
	ctaTextSending: 'Sending, please wait',
};

export default InvitationForm;
