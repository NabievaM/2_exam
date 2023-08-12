const Joi = require("joi");
const editValidation = (payload) => {
    const schema = Joi.object({
        title: Joi.string().min(3).max(256).required(),
        description: Joi.string().min(64).max(1024).required(),
        file: Joi.required(),
    });
    const { error } = schema.validate(payload);

    if (error) return error;
    else return false;

};

module.exports = {
    editValidation,
};