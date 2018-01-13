var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var commentSchema = new Schema({
    userName: {
        type: String,
        trim: true,
        required: "Username is Required"
    },

    body: {
        type: String,
        trim: true,
        required: "Body is Required"
    },
})

var comment = mongoose.model("Comment", commentSchema);

module.exports = comment;