const Joi = require("joi");
const editFeedbackValidation = (payload) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(256).required(),
        profession: Joi.required(),
        description: Joi.string().min(20).max(1024).required(),
        file: Joi.required(),
    });
    const { error } = schema.validate(payload);

    if (error) return error;
    else return false;

};

module.exports = {
    editFeedbackValidation,
};