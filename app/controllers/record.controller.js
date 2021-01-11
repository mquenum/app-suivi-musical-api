const db = require("../models");
const Record = db.record;

// Create and Save a new Record
exports.create = (req, res) => {
// Validate request
    console.log(Record);

    if (!req.body.artist) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a Record
    const record = new Record({
        recordCover: req.body.recordCover,
        releaseTypeKey: req.body.releaseTypeKey,
        artist: req.body.artist,
        release: req.body.release,
        labelInfo: req.body.labelInfo,
        releaseDate: req.body.releaseDate,
        country: req.body.country,
        genre: req.body.genre,
        description: req.body.description,
        highlights: {
            trackname: req.body.highlights.trackname
        },
        link: req.body.link,
        isFavorite: req.body.isFavorite,
        status: req.body.status
    });

    // Save Record in the database
    record
    .save(record)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the record."
        });
    });
};

// Retrieve all Records from the database.
exports.findAll = (req, res) => {
    const id = req.query.id;
    var condition = id ? { id: { $regex: new RegExp(id), $options: "i" } } : {};

    Record.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving records."
            });
        });
};

// Find a single Record with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Record.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Record with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Record with id=" + id });
        });
};

// Update a Record by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Record.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Record with id=${id}. Maybe Record was not found!`
                });
            } else res.send({ message: "Record was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Record with id=" + id
            });
        });
};

// Delete a Record with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Record.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Record with id=${id}. Maybe Record was not found!`
                });
            } else {
                res.send({
                    message: "Record was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Record with id=" + id
            });
        });
};

// Delete all Records from the database.
exports.deleteAll = (req, res) => {
    Record.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Records were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Records."
            });
        });
};

// Find all published Records
exports.findAllPublished = (req, res) => {
    Record.find({ published: true })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Record."
            });
        });
};