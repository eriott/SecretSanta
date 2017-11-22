import mongoose from './mongoose';
import {ObjectId} from './mongoose'

// define the schema for our user model
let eventSchema = mongoose.Schema({
    name: {type: String, default: "Secret Santa " + new Date().getFullYear()},
    startDate: Date,
    endDate: Date,
    members: [{type: ObjectId, ref: 'User'}],
    pairs: [{from: ObjectId, to: ObjectId}]
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Event', eventSchema);