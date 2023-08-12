const authRouter = require("./auth.routes");
const servicesRouter = require("./services.routes");
const feedbackRouter = require("./feedback.routes");
const contactRouter = require("./contact.routes");

module.exports = [
    authRouter,
    servicesRouter,
    feedbackRouter,
    contactRouter
];