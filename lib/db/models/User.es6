import mongoose from '../mongoose.es6';

// define the schema for our user model
let userSchema = mongoose.Schema({
  google: {
    id: String,
    token: String,
    email: String,
    name: String
  },
  postData: {
    fullName: {type: String, default: ""},
    address: {type: String, default: ""}
  },
  about: {type: String, default: ""},
  telegramLogin: {type: String, default: ""}
});

userSchema.methods.canUseInPair = function canUseInPair() {
  return this.postData && this.postData.fullName !== '' && this.postData.address !== '';
};

userSchema.methods.profile = function profile() {
  return {about: this.about, postData: this.postData, telegramLogin: this.telegramLogin};
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);