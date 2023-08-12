const bcrypt = require("bcrypt");
const Io = require("../utils/Io");
const Auth = require("../models/auth.model");
const { loginValidation } = require("../validations/auth.validation");
const { generateToken } = require("../utils/jwt");
const Users = new Io("./database/user.json");

const login = async (req, res) => {
    const { username, password } = req.body;
    const error = loginValidation({username, password });

    if (error) return res.status(400).json({ message: error.message });
    
    const users = await Users.read();
    const findUser = users.find((user) => user.username === username);
    if (findUser) return res.status(403).json({ message: "Username already registered" });

    const hashedPass = await bcrypt.hash(password, 12);
    const newUser = new Auth(
        username,
        hashedPass,
    );

    const data = users.length ? [...users, newUser] : [newUser];

    await Users.write(data);
    const token = generateToken({ id: newUser.id });

    res.status(201).json({ message: "Success",  token });
};

module.exports = {
    login
};