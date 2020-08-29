import 'whatwg-fetch';

const ENDPOINT = "https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth";

export const requestInvitation = (data, onSuccess, onError) => {

	let headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
		};

	return fetch(ENDPOINT, {
		method: 'post',
		headers: headers,
		body: JSON.stringify(data),
	})
	.then((response) => {
		if (response.status === 200) {
      onSuccess();
    }
		if (response.status === 400) {
			response.json().then((data) => {
				onError(data.errorMessage);
			});
		}
	})
	.catch(error => {
		onError(error.message);
	});
};
