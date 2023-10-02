export const ValidateLogin = (formData) => {
    const messages = {
        EMAIL_EMPTY: "Please enter your email address...",
        PASSWORD_EMPTY: "Please enter your password...",
        INVALID_CREDENTIALS: "Invalid email or password. Please try again.",
    };

    const output = {
        status: true,
        message: null,
    };

    if (!formData.email) {
        output.message = messages.EMAIL_EMPTY;
        output.status = false;
        return output;
    }

    if (!formData.password) {
        output.message = messages.PASSWORD_EMPTY;
        output.status = false;
        return output;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        output.message = "Please enter a valid email address...";
        output.status = false;
        return output;
    }

    if (formData.password.length < 8) {
        output.message = "Password must be at least 8 characters long...";
        output.status = false;
        return output;
    }

    return output;
};
