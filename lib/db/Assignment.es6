import mongoose from './mongoose';
import {ObjectId} from './mongoose'

// define the schema for our user model
let userSchema = mongoose.Schema({
    pairs: [{from: ObjectId, to: ObjectId}]
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Assignment', userSchema);