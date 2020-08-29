import React, {useState, useEffect, useRef} from 'react';
import styled from 'styled-components/macro';
import {isClient} from "../";

const ModalOverlay = styled.div`
	align-items: center;
	bottom: 0;
	background-color: ${({theme}) => theme.colors.black50};
	display: flex;
	justify-content: center;
	left: 0;
	overflow-y: auto;
	position: fixed;
	right: 0;
	top: 0;
	height: ${({open}) => open ? 'auto' : 0};
	width: ${({open}) => open ? 'auto' : 0};
	opacity: ${({open}) => open ? 1 : 0};
	transition: all 0.3s;
`;

const ModalStyled = styled.div`
	background-color: ${({theme}) => theme.colors.white};
	border: 2px solid ${({theme}) => theme.colors.black};
	position: relative;
	z-index: 100;
`;

const ModalCloseBtn = styled.button`
	background: none;
	border: 0;
	color: ${({theme}) => theme.colors.grey700};
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 2.4rem;
	line-height: 1;
	height: 32px;
	position: absolute;
	right: 0;
	top: 0;
	width: 32px;

	&:hover {
		background-color: ${({theme}) => theme.colors.grey200};
	}

	&:focus {
		outline: 2px dotted ${({theme}) => theme.colors.grey700};
		outline-offset: 2px;
	}
`;

export const useModal = () => {
	// Local Modal state, default: false;`
	const [open, setOpen] = useState(false);
	const modalRef = useRef(null);

	// Api method to open Modal
	const openModal = () => setOpen(true);

	// Api method to close Modal
	const closeModal = () => setOpen(false);

	const onClickOutsideHandler = (event) => {
		if(open && !modalRef.current.contains(event.target)) {
			closeModal();
		}
	};

	const onPressEscHandler = (event) => {
		const {keyCode} = event;
		if(keyCode === 27 && open) {
			closeModal();
		}
	};


	const Modal = ({width, children, ...props}) => {
		useEffect(() => {
			if(isClient) {
				window.addEventListener('click', onClickOutsideHandler);
				window.addEventListener('keyup', onPressEscHandler);
				return () => {
					window.removeEventListener('click', onClickOutsideHandler);
					window.removeEventListener('keyup', onPressEscHandler);
				}
			}
		}, []);
		return (open &&
				<ModalOverlay open={open}>
					<ModalStyled
						ref={modalRef}
						{...props}
					>
						<ModalCloseBtn
							aria-label="Close modal button"
							onClick={closeModal}
						>
							×
						</ModalCloseBtn>
						{children}
					</ModalStyled>
				</ModalOverlay>
		)
	};
	return [
		Modal,
		openModal,
		closeModal
	]
};
