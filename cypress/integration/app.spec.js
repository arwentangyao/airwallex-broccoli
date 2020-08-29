// End-to-end application tests

// Element selectors
const APP = '[class*="App__AppStyled-"]';
const HEADER = 'header';
const LOGO = '[class*="Header__HeaderLogo-"]';
const INVITE_PAGE = '[class*="InvitePage__InvitePageStyled-"]';
const HERO = '[class*="Hero__HeroStyled-"]';
const HERO_TITLE = '[class*="Hero__HeroTitle-"]';
const HERO_SUBTITLE = '[class*="Hero__HeroSubTitle-"]';
const REQUEST_INVITE_BTN = '[class*="Hero__HeroStyled-"] [class*="Button__ButtonStyled-"]';
const MODAL_OVERLAY = '[class*="useModal__ModalOverlay-"]';
const MODAL_CONTAINER = '[class*="useModal__ModalStyled-"]';
const MODAL_CLOSE = '[class*="useModal__ModalCloseBtn-"]';
const INVITATION_FORM = '[class*="InvitationForm__InvitationFormStyled-"]';
const INVITATION_FORM_TITLE = '[class*="InvitationForm__FormTitle-"]';
const FULL_NAME = 'Enter full name';
const EMAIL = 'Enter email address';
const CONFIRM_EMAIL = 'Confirm email address';
const SEND_BTN = 'button[type="submit"]';
const ERROR_CONTAINER = '[class*="InvitationForm__ErrorContainer-"]';
const INVITATION_SENT = '[class*="InvitationSent__InvitationSentStyled-"]';
const INVITATION_SENT_TITLE = '[class*="InvitationSent__Title-"]';
const INVITATION_SENT_MSG = '[class*="InvitationSent__MessageText-"]';
const INVITATION_SENT_BTN = '[class*="InvitationSent__InvitationSentStyled-"] [class*="Button__ButtonStyled-"]';


describe('App', () => {

	// Navigation to page
	before(() => cy
		.visit('/')
		.wait(500)
	);

	it('exists', () => {
		cy.get(APP)
			.should('exist');
	});

	it('takes full height of device', () => {
		cy.get(APP)
			.should('have.css', 'height', '720px')
	});

	// Header block
	describe('Header block', () => {
		it('renders a \'header\' element', () => {
			cy.get(HEADER)
				.should('exist')
		});
		it('renders with a height of 60px', () => {
			cy.get(HEADER)
				.should('have.css', 'height', '60px')
		});
	});

	// Invite page
	describe('Invite Page', () => {

		it('exists', () => {
			cy.get(INVITE_PAGE)
				.should('exist')
		});

		it('renders children absolutely centered', () => {
			cy.get(INVITE_PAGE)
				.should('have.css', 'display', 'flex')
				.should('have.css', 'align-items', 'center')
				.should('have.css', 'justify-content', 'center')
		});

		// Hero block
		describe('Hero Block', () => {

			it('renders Hero block', () => {
				cy.get(HERO)
					.should('exist')
			});

			it('renders title', () => {
				cy.get(HERO_TITLE)
					.should('exist')
					.should('contain', 'A better way\n to enjoy every day.')
			});

			it('renders sub title', () => {
				cy.get(HERO_SUBTITLE)
					.should('exist')
					.should('contain', 'Be the first to know when we launch.')
			});

			it('renders `Request invite` button', () => {
				cy.get(REQUEST_INVITE_BTN)
					.should('exist')
			});

			it('opens the Modal when `Request invite` button is clicked', () => {
				cy.get(REQUEST_INVITE_BTN)
					.click()
					.get(MODAL_OVERLAY)
					.should('exist');
			});

		});

		// Modal
		describe('Modal', () => {

			it('renders Modal overlay', () => {
				// Make sure Modal is open
				cy.get(MODAL_OVERLAY)
					.should('exist')
			});

			it('renders Modal container', () => {
				cy.get(MODAL_CONTAINER)
					.should('exist')
			});

			it('renders close modal button', () => {
				cy.get(MODAL_CLOSE)
					.should('exist')
			});

			it('should close the modal, when clicked on close modal button', () => {
				cy.get(MODAL_CLOSE)
					.click()
					.get(MODAL_CONTAINER)
					.should('not.exist')
			});

			it('should close the modal when clicked outside Modal container', () => {
				cy.get(REQUEST_INVITE_BTN)
					.click()
					.get(MODAL_OVERLAY)
					.click(50,50)
					.get(MODAL_CONTAINER)
					.should('not.exist')
			});

			it('should close the modal when pressed `ESC` key', () => {
				cy.get(REQUEST_INVITE_BTN)
					.click()
					.getByLabelText(FULL_NAME)
					.type('{esc}')
					.get(MODAL_CONTAINER)
					.should('not.exist')
			});

		});

		// InvitationForm block
		describe('InvitationForm block', () => {
			// Make sure Modal is open
			it('exists', () => {
				cy.get(REQUEST_INVITE_BTN)
					.click()
					.wait(500)
					.get(INVITATION_FORM)
					.should('exist')
			});

			it('renders title', () => {
				cy.get(INVITATION_FORM_TITLE)
					.should('exist')
					.should('contain', 'Request an invite')
			});

			it('renders full name field', () => {
				cy.getByLabelText(FULL_NAME)
					.should('exist')
			});

			it('renders email field', () => {
				cy.getByLabelText(EMAIL)
					.should('exist')
			});

			it('renders confirm email field', () => {
				cy.getByLabelText(CONFIRM_EMAIL)
					.should('exist')
			});

			it('renders send button', () => {
				cy.get(SEND_BTN)
					.should('exist')
			});

			it('displays red border on input fields on validation error', () => {
				cy.get(SEND_BTN)
					.click()
					.getByLabelText(FULL_NAME)
					.should('have.css', 'border-color', 'rgb(204, 0, 0)')
					.getByLabelText(EMAIL)
					.should('have.css', 'border-color', 'rgb(204, 0, 0)')
					.getByLabelText(CONFIRM_EMAIL)
					.should('have.css', 'border-color', 'rgb(204, 0, 0)');
			});

			it('displays error messages if input fields have no values on submission ', () => {
				cy.get(ERROR_CONTAINER)
					.should('contain', 'Full name is required')
					.get(ERROR_CONTAINER)
					.should('contain', 'Email address is required')
					.get(ERROR_CONTAINER)
					.should('contain', 'Confirmation email is required');
			});

			it('displays error messages if input fields have invalid values on submission ', () => {
				cy.getByLabelText(FULL_NAME)
					.type('john')
					.getByLabelText(EMAIL)
					.type('john@g.c')
					.getByLabelText(CONFIRM_EMAIL)
					.type('john')
					.get(SEND_BTN)
					.click()
					.get(ERROR_CONTAINER)
					.should('contain', 'Full name is invalid')
					.get(ERROR_CONTAINER)
					.should('contain', 'Email address is invalid')
					.get(ERROR_CONTAINER)
					.should('contain', 'Email doesn\'t match');
			});

			it('displays sending state on submission', () => {
				cy.get(MODAL_CLOSE)
					.click()
					.get(REQUEST_INVITE_BTN)
					.click()
					.getByLabelText(FULL_NAME)
					.type('john doe')
					.getByLabelText(EMAIL)
					.type( 'usedemail@airwallex.com')
					.getByLabelText(CONFIRM_EMAIL)
					.type('usedemail@airwallex.com')
					.get(SEND_BTN)
					.click()
					.get(SEND_BTN)
					.should('contain', 'Sending, please wait');
			});

			it('displays serve error message if email is already in use', () => {
				cy.get(MODAL_CLOSE)
					.click()
					.get(REQUEST_INVITE_BTN)
					.click()
					.getByLabelText(FULL_NAME)
					.type('john doe')
					.getByLabelText(EMAIL)
					.type( 'usedemail@airwallex.com')
					.getByLabelText(CONFIRM_EMAIL)
					.type('usedemail@airwallex.com')
					.get(SEND_BTN)
					.click()
					.get(ERROR_CONTAINER)
					.should('contain', 'Bad Request: Email is already in use');
			});

			it('displays InvitationSent block on successful submission', () => {
				cy.get(MODAL_CLOSE)
					.click()
					.get(REQUEST_INVITE_BTN)
					.click()
					.getByLabelText(FULL_NAME)
					.type('john doe')
					.getByLabelText(EMAIL)
					.type( 'johndoe@email.com')
					.getByLabelText(CONFIRM_EMAIL)
					.type('johndoe@email.com')
					.get(SEND_BTN)
					.click()
					.wait(500)
					.get(INVITATION_SENT)
					.should('exist');
			});

		});

		// InvitationSent block
		describe('InvitationSent block', () => {

			it('exists', () => {
				cy.get(INVITATION_SENT)
					.should('exist')
			});

			it('renders title', () => {
				cy.get(INVITATION_SENT_TITLE)
					.should('exist')
					.should('contain', 'All done!');
			});

			it('renders success message', () => {
				cy.get(INVITATION_SENT_MSG)
					.should('exist')
					.should('contain', 'You will be one of the first to experience Broccoli & Co. when we launch.');
			});

			it('renders `OK` button', () => {
				cy.get(INVITATION_SENT_BTN)
					.should('exist');
			});

			it('closes the modal when clicked on `OK` button', () => {
				cy.get(INVITATION_SENT_BTN)
					.click()
					.get(MODAL_CONTAINER)
					.should('not.exist');
			});

		});
	});

	// Footer block
	describe('Footer block', () => {
		it('renders a \'footer\' element', () => {
			cy.get('footer')
				.should('exist')
				.should('have.css', 'height', '64px')
		});
		it('renders a height of 64px', () => {
			cy.get('footer')
				.should('exist')
				.should('have.css', 'height', '64px')
		});
		it('renders footer text', () => {
			cy.get('[class*="Footer__FooterText-"]')
				.should('exist')
				.should('contain', 'Made with ❤ ️in Melbourne.')
		});
	});

});
