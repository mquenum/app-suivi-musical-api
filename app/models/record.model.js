module.exports = mongoose => {
    var artistSchema = mongoose.Schema(
        [{ _id : false },
            { artistNameKey: String },
            { sortNameKey: String }
        ]

    );

    var labelInfoSchema = mongoose.Schema(
        { catalogNumber: String, label: String }
    );

    var statusSchema = mongoose.Schema(
        { isDlKey: Boolean },
        { isBoughtKey: Boolean }
    );

    var schema = mongoose.Schema(
        {
            cover_image: String,
            artists: Array,
            onlytitle: String,
            country: String,
            label: Array,
            catno: Array,
            year: Date,
            format: String,
            genre: Array,
            style: Array,
            url: String,
            description: String,
            highlights: {
                trackname: Array
            },
            isFavorite: Boolean,
            status: Array
        },
        { timestamps: true }
    );

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Record = mongoose.model("record", schema);

    return Record;
};