const path = require("path");
const Io = require("../utils/Io");
const Service = require("../models/services.model");
const { serviceValidation } = require("../validations/Services.validation");
const { editValidation } = require("../validations/editValidate");
const { v4 } = require("uuid");
const Services = new Io("./database/services.json");

const create = async (req, res) => {
  try {
    const { title, description } = req.body; 
    const file = req.files?.photo;

    const error = serviceValidation({ title, description, file });
   
    if (error) return res.status(400).json({message: error.message});

    const services = await Services.read();

      const id = (services[services.length - 1]?.id || 0) + 1;

    const photoName = v4() + path.extname(file.name);
    file.mv(process.cwd() + "/uploads/" + photoName);
    
      const service = new Service(
          id,
          title,
          description,
          photoName,
    );

    const data = services.length ? [...services, service] : [service];

    await Services.write(data);

    res.status(201).json({message: "Success", data: service});
  } catch (error) {
    res.status(500).json({message: "INTERNAL SERVER ERROR"});
  }
};

const get = async (req, res) => {
  try {
    const services = await Services.read();

    res.json({data: services});
  } catch (error) {
    res.status(500).json({message: "INTERNAL SERVER ERROR"});
  }
};

const getAll = async (req, res) => {
  try {
    const {id} = req.params;
    const services = await Services.read();

    const service = services.find((p) => p.id === +id);

    res.json({data: service});
  } catch (error) {
    res.status(500).json({message: "INTERNAL SERVER ERROR"});
  }
};

const edit = async (req, res) => {
  try {
    const {id} = req.params;
    const { title, description } = req.body;
    const file = req.files?.photo;

    const error = editValidation({ title, description, file });

    if (error) return res.status(400).json({message: error.message});

    const services = await Services.read();

    const service = services.find((p) => p.id === +id);

    if (!service) return res.status(404).json({message: "Service not found"});

    const photoName = v4() + path.extname(file.name);
    file.mv(process.cwd() + "/uploads/" + photoName);
    
    service.title = title;
    service.description = description;
    service.photo = photoName;

    await Services.write(services);

    res.json({message: "Success", data: service});
  } catch (error) {
    res.status(500).json({message: "INTERNAL SERVER ERROR"});
  }
};

const remove = async (req, res) => {
  const {id} = req.params;
  const services = await Services.read();

  const filter = services.filter((service) => service.id != id);

  await Services.write(filter);

  res.json({message: "Deleted"});
};

module.exports = {
  create,
  get,
  getAll,
  edit,
  remove,
};
