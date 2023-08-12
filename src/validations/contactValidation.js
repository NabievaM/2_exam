const Joi = require("joi");
const contactValidation = (payload) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(256).required(),
        phoneNumber: Joi.string().required(),
        email: Joi.string().required(),
        message: Joi.required(),
    });
    const { error } = schema.validate(payload);

    if (error) return error;
    else return false;

};

module.exports = {
    contactValidation,
};