import mongoose, {ObjectId} from '../mongoose';

// define the schema for our user model
let eventSchema = mongoose.Schema({
    name: {type: String, default: "Secret Santa " + new Date().getFullYear()},
    startDate: Date,
    endDate: Date,
    members: [{type: ObjectId, ref: 'User'}],
    pairs: [{
        from: ObjectId,
        to: ObjectId,
        isGiftSent: {type: Boolean, default: false},
        isGiftReceived: {type: Boolean, default: false}
    }]
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Event', eventSchema);