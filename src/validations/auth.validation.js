const Joi = require("joi");
const loginValidation = (payload) => {
    const schema = Joi.object({
        username: Joi.string().alphanum().required(),
        password: Joi.string().required(),
    });
    const { error } = schema.validate(payload);

    if (error) return error;
    else return false;

};

module.exports = {
    loginValidation,
};