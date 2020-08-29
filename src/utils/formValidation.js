const regex = {
	fullName: /^(([A-Za-z]+[-']?)*([A-Za-z]+)?\s)+([A-Za-z]+[-']?)*([A-Za-z]+)?$/,
	email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
};

export function validate(values) {
	let errors = {};

	if (!values.fullName) {
		errors.fullName = 'Full name is required';
	} else if (!regex.fullName.test(values.fullName)) {
		errors.fullName = 'Full name is invalid';
	} else delete errors.fullName;

	if (!values.email) {
		errors.email = 'Email address is required';
	} else if (!regex.email.test(values.email)) {
		errors.email = 'Email address is invalid';
	} else delete errors.email;

	if (!values.confirmEmail) {
		errors.confirmEmail = 'Confirmation email is required';
	} else if (values.confirmEmail !== values.email) {
		errors.confirmEmail = 'Email doesn\'t match';
	} else delete errors.confirmEmail;

	return errors;
};
