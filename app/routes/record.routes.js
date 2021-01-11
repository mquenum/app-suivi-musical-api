module.exports = app => {
    const records = require("../controllers/record.controller.js");

    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/", records.create);

    // Retrieve all records
    router.get("/", records.findAll);

    // Retrieve all published records
    router.get("/published", records.findAllPublished);

    // Retrieve a single Tutorial with id
    router.get("/:id", records.findOne);

    // Update a Tutorial with id
    router.put("/:id", records.update);

    // Delete a Tutorial with id
    router.delete("/:id", records.delete);

    // Create a new Tutorial
    router.delete("/", records.deleteAll);

    app.use('/api/records', router);
};