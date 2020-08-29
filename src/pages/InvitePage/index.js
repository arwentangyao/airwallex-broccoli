import React, {useState} from 'react';
import styled from 'styled-components/macro';
import Hero from "../../blocks/Hero";
import {useModal} from '../../utils';
import InvitationForm from "../../blocks/InvitationForm";
import InvitationSent from "../../blocks/InvitationSent";

const InvitePageStyled = styled.div`
	align-items: center;
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	justify-content: center;
	margin-top: 62px;
	text-align: center;
`;

const InvitePage = (props) => {
	const [submitted, setSubmitted] = useState(false);
	const [Modal, openModal, closeModal] = useModal();

	const onSuccess = () => setSubmitted(true);

	return (
		<InvitePageStyled {...props}>
			<Hero onCtaClick={openModal}/>
			<Modal>
				{!submitted ? <InvitationForm onSuccess={onSuccess}/>
					: <InvitationSent onCtaClick={closeModal} />
				}
			</Modal>
		</InvitePageStyled>
	)
};

export default InvitePage;
