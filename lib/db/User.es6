import mongoose from './mongoose';

// define the schema for our user model
let userSchema = mongoose.Schema({
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    postData: {
        fullName: {type: String, default: "", required: true},
        address: {type: String, default: "", required: true}
    },
    about: {type: String, default: "", required: true}
});

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);