var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var articleSchema = new Schema({
    headline: {
        type: String,
        trim: true,
        required: "Headline is Required"
    },

    url: {
        type: String,
        trim: true,
        required: "url is Required"
    },
    comment: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }]
})

var article = mongoose.model("article", articleSchema);

module.exports = article;