"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var PostSchema = new mongoose_1.Schema({
    postName: {
        type: String,
        required: true
    },
    postDescription: {
        type: String,
        required: true
    },
    postingDate: {
        type: Number,
        default: Date.now()
    }
});
var PostModel = (0, mongoose_1.model)('Post', PostSchema);
exports.default = PostModel;
