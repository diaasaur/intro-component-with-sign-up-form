const form = document.querySelector(".form");

// password show/hide
const eye = document.querySelector(".eye");
eye.addEventListener("click", (e) => {
	const password = document.querySelector("#password");
	const type =
		password.getAttribute("type") === "password" ? "text" : "password";
	password.setAttribute("type", type);

	eye.classList.toggle("shown");
});

// utils for show/hide errors
const showError = (error, message) => {
	error.classList.remove("hide");
	error.classList.add("show");
	error.parentNode.classList.add("hasError");
	// show the first error
	if (!error.innerText.length) error.innerText = message;
};

const hideError = (error) => {
	error.classList.add("hide");
	error.classList.remove("show");
	error.parentNode.classList.remove("hasError");
	error.innerText = "";
};

const passwordErrors = (password) => {
	// Should contain at least a capital letter
	if (!/[A-Z]+/.test(password))
		return "Should contain at least a capital letter";

	// Should contain at least a small letter
	if (!/[a-z]+/.test(password)) return "Should contain at least a small letter";

	// Should contain at least a number
	if (!/[0-9]+/.test(password)) return "Should contain at least a number";

	// Should contain at least a special character
	if (!/[!@#$&*]+/.test(password))
		return "Should contain at least a special character";

	// And minimum length
	if (password.length < 8) return "Should have atleast 8 characters";

	return null;
};

const isValidEmail = (email) => {
	return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
};

form.addEventListener("submit", (e) => {
	e.preventDefault(); // prevent page from reloading

	const inputs = Object.keys({ ...form.elements }).reduce((acc, key) => {
		if (isNaN(key)) {
			const element = form.elements[key];
			const value = element.value?.trim();
			const error = element.parentNode.querySelector(".error");
			const placeholder = element.placeholder;
			acc[key] = { element, value, error, placeholder, hasError: false };
		}
		return acc;
	}, {});

	// check for empty values and set/remove error
	Object.keys(inputs).forEach((input) => {
		const { value, error, placeholder } = inputs[input];
		// reset error
		input.hasError = false;
		hideError(error);

		// show error
		if (!value || value.length === 0) {
			input.hasError = true;
			showError(error, `${placeholder} cannot be empty`);
		}
	});

	// if email is not valid
	if (!inputs.email.hasError && !isValidEmail(inputs.email.value))
		showError(inputs.email.error, "Looks like this is not an email");

	// password check
	const errorMsg = passwordErrors(inputs.password.value);
	if (!inputs.password.hasError && errorMsg)
		showError(inputs.password.error, errorMsg);
});
