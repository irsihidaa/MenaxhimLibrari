const mongoose = require("mongoose");
const bookSchema = mongoose.Schema(
    {
        BookName: {
            type: String,
            required: [true, "Please add a book title"],   
        },

        Author: {
            type: String 
        },

        Genre: {
            type: String
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },

    },
    {
        timestamps: true,
    }
);
module.exports = mongoose.model("Book", bookSchema);