export const ValidateSignUp = (formData) => {
    const messages = {
        FULL_NAME_EMPTY: "The name should be at least 3 letters...",
        EMAIL_EMPTY: "Email must contain @ and at least 3 characters before the prefix...",
        WEIGHT_EMPTY: "Enter a valid weight...",
        HEIGHT_EMPTY: "Enter a valid height...",
        MOBILE_NO_EMPTY: "Enter a valid mobile number...",
        DOB_EMPTY: "Date of Birth is empty...",
    };

    const output = {
        status: true,
        message: null,
    };

    if (formData.fullName.length <= 2) {
        output.message = messages.FULL_NAME_EMPTY;
        output.status = false;
        return output;
    }

    if (formData.email.length <= 2 || !formData.email.includes('@') || formData.email.indexOf('@') < 3) {
        output.message = messages.EMAIL_EMPTY;
        output.status = false;
        return output;
    }

    if (formData.mobileno.length < 10 || formData.mobileno.length > 12) {
        output.message = messages.MOBILE_NO_EMPTY;
        output.status = false;
        return output;
    }

    if (!formData.weight || isNaN(formData.weight) || formData.weight <= 0) {
        output.message = messages.WEIGHT_EMPTY;
        output.status = false;
        return output;
    }

    if (!formData.height || isNaN(formData.height) || formData.height <= 0) {
        output.message = messages.HEIGHT_EMPTY;
        output.status = false;
        return output;
    }

    if (!formData.dateOfBirth) {
        output.message = messages.DOB_EMPTY;
        output.status = false;
        return output;
    }

    // Add more validations here

    return output;
};
