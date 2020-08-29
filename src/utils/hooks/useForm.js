import {useState, useEffect} from 'react';
import {requestInvitation } from '../';

export const useForm = (validate, onSuccess) => {

	const [values, setValues] = useState({});
	const [errors, setErrors] = useState({});
	const [isSubmitting, setIsSubmitting] = useState(false);

	useEffect(() => {
		if (Object.keys(errors).length === 0 && isSubmitting) {
			requestInvitation({
				name: values.fullName,
				email: values.email
			}, onSuccess, (error) => {
				setErrors({...errors, serverError: error});
				setIsSubmitting(false);
			})
		} else {
			setIsSubmitting(false);
		}
	}, [errors, values, isSubmitting, onSuccess]);

	const handleSubmit = (event) => {
		if (event) event.preventDefault();
		setErrors(validate(values));
		setIsSubmitting(true);
	};

	const handleChange = (event) => {
		event.persist();
		setValues(values => ({
			...values,
			[event.target.name]: event.target.value
		}));
	};

	return {
		handleChange,
		handleSubmit,
		values,
		errors,
		isSubmitting,
	}
};
