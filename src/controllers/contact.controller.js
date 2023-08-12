const Io = require("../utils/Io");
const Contact = require("../models/contact.model");
const { contactValidation } = require("../validations/contactValidation");
const Contacts = new Io("./database/contact.json");

const create = async (req, res) => {
    try {
        const { name, phoneNumber, email, message } = req.body;

        const error = contactValidation({ name, phoneNumber, email, message });
   
        if (error) return res.status(400).json({ message: error.message });

        const contacts = await Contacts.read();

        const id = (contacts[contacts.length - 1]?.id || 0) + 1;
    
        const contact = new Contact(
            id,
            name,
            phoneNumber,
            email,
            message,
        );

        const data = contacts.length ? [...contacts, contact] : [contact];

        await Contacts.write(data);

        res.status(201).json({ message: "Success", data: contact });
    } catch (error) {
        res.status(500).json({ message: "INTERNAL SERVER ERROR" });
    }
};

const getAll = async (req, res) => {
    try {
        const contacts = await Contacts.read();

        res.json({ data: contacts });
    } catch (error) {
        res.status(500).json({ message: "INTERNAL SERVER ERROR" });
    }
};

module.exports = {
    create,
    getAll,
};
