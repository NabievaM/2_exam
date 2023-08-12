const path = require("path");
const Io = require("../utils/Io");
const FeedBack = require("../models/feedback.model");
const {feedbackValidation } = require("../validations/Feedback.validation");
const { v4 } = require("uuid");
const { editFeedbackValidation } = require("../validations/editFeedback.validation");
const FeedBacks = new Io("./database/feedback.json");

const create = async (req, res) => {
    try {
        const { name, profession, description  } = req.body;
        const file = req.files?.photo;

        const error = feedbackValidation({ name, profession, description, file });
   
        if (error) return res.status(400).json({ message: error.message });

        const feedBacks = await FeedBacks.read();

        const id = (feedBacks[feedBacks.length - 1]?.id || 0) + 1;

        const photoName = v4() + path.extname(file.name);
        file.mv(process.cwd() + "/uploads/" + photoName);
    
        const feedback = new FeedBack(
            id,
            name,
            profession,
            description,
            photoName,
        );

        const data = feedBacks.length ? [...feedBacks, feedback] : [feedback];

        await FeedBacks.write(data);

        res.status(201).json({ message: "Success", data: feedback });
    } catch (error) {
        res.status(500).json({ message: "INTERNAL SERVER ERROR" });
        console.log(error);
    }
};

const getAll = async (req, res) => {
    try {
        const feedBacks = await FeedBacks.read();

        res.json({ data: feedBacks });
    } catch (error) {
        res.status(500).json({ message: "INTERNAL SERVER ERROR" });
    }
};

const edit = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, profession, description } = req.body;
        const file = req.files?.photo;
 
        const error = editFeedbackValidation({ name, profession, description, file });
        if (error) return res.status(400).json({ message: error.message });

        const feedBacks = await FeedBacks.read();

        const feedback = feedBacks.find((p) => p.id === +id);

        if (!feedback) return res.status(404).json({ message: "Feedback not found" });
      
        const photoName = v4() + path.extname(file.name);
        file.mv(process.cwd() + "/uploads/" + photoName);

        feedback.name = name;
        feedback.profession = profession;
        feedback.description = description;
        feedback.photo = photoName;

        await FeedBacks.write(feedBacks);

        res.json({ message: "Success", data: feedback });
    } catch (error) {
        res.status(500).json({ message: "INTERNAL SERVER ERROR" });
    }
};

const remove = async (req, res) => {
    const { id } = req.params;
    const feedBacks = await FeedBacks.read();

    const filter = feedBacks.filter((feedback) => feedback.id != id);

    await FeedBacks.write(filter);

    res.json({ message: "Deleted" });
};

module.exports = {
    create,
    getAll,
    edit,
    remove,
};
