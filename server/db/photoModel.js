const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    comment: { type: String, required: true }, // cmt của user 2 vào ảnh của user 1
    date_time: {type: Date, default: Date.now}, 
    user_id: mongoose.Schema.Types.ObjectId, // cmt cua user 2 
})

const photoSchema = new mongoose.Schema({
    file_name: {type: String},
    date_time: {type: Date, default: Date.now},
    user_id: mongoose.Schema.Types.ObjectId,
    comments: [commentSchema], // cmt cua user khac vao user 1
})

module.exports = mongoose.model.Photos || mongoose.model('Photos', photoSchema);